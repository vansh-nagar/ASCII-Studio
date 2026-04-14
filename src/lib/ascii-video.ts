import { spawn } from "node:child_process";
import { mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = new Set([".mp4", ".mkv", ".mov", ".avi", ".gif"]);

export type AsciiConversionOptions = {
	/** ASCII character ramp (dark → bright). Empty string uses default. */
	chars?: string;
	/** Grid width in columns (20–300). Default 80. */
	columns?: number;
	/** Output frames-per-second (6–60). Default 30. */
	fps?: number;
	/** Reverse brightness mapping (swap dark/light). */
	invert?: boolean;
	/** Luminance threshold 0–255. Pixels below become spaces. Default 30. */
	luminanceThreshold?: number;
};

export type AsciiConversionResult = {
	columns: number;
	fileName: string;
	fileSize: number;
	fps: number;
	frameCount: number;
	frames: string[];
	rows: number;
	chars: string;
};

export class AsciiConversionError extends Error {
	status: number;

	constructor(message: string, status = 400) {
		super(message);
		this.name = "AsciiConversionError";
		this.status = status;
	}
}

export async function convertVideoFileToAscii(
	file: File,
	options?: AsciiConversionOptions,
): Promise<AsciiConversionResult> {
	const extension = extname(file.name).toLowerCase();

	if (!SUPPORTED_EXTENSIONS.has(extension)) {
		throw new AsciiConversionError(
			"Unsupported file format. Upload .mp4, .mkv, .mov, .avi, or .gif.",
		);
	}

	if (file.size === 0) {
		throw new AsciiConversionError("The selected file is empty.");
	}

	if (file.size > MAX_UPLOAD_SIZE_BYTES) {
		throw new AsciiConversionError(
			"Upload a smaller video. Files must be 50 MB or less.",
			413,
		);
	}

	const columns = Math.max(10, Math.min(500, options?.columns ?? 80));
	const fps = Math.max(6, Math.min(60, options?.fps ?? 30));
	const luminanceThreshold = Math.max(0, Math.min(255, options?.luminanceThreshold ?? 30));
	const chars = options?.chars ?? "";
	const invert = options?.invert ?? false;

	const workspace = await mkdtemp(join(tmpdir(), "ascii-upload-"));
	const inputPath = join(workspace, `source${extension}`);
	const outputRoot = join(workspace, "output");

	try {
		await writeFile(inputPath, Buffer.from(await file.arrayBuffer()));

		const frameDirectory = await runConverter(inputPath, outputRoot, {
			chars,
			columns,
			fps,
			invert,
			luminanceThreshold,
		});
		const frames = await readFrames(frameDirectory);

		if (frames.length === 0) {
			throw new AsciiConversionError(
				"The converter finished without producing any ASCII frames.",
				500,
			);
		}

		const { columns: measuredColumns, rows } = measureFrame(frames[0]);

		return {
			columns: measuredColumns,
			fileName: file.name,
			fileSize: file.size,
			fps,
			frameCount: frames.length,
			frames,
			rows,
			chars,
		};
	} finally {
		await rm(workspace, { force: true, recursive: true });
	}
}

async function runConverter(
	inputPath: string,
	outputRoot: string,
	options: {
		chars: string;
		columns: number;
		fps: number;
		invert: boolean;
		luminanceThreshold: number;
	},
) {
	const scriptPath = join(process.cwd(), "scripts", "video-to-ascii.ps1");
	const executable = process.platform === "win32" ? "powershell" : "pwsh";

	const baseArgs =
		process.platform === "win32"
			? ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", scriptPath]
			: ["-NoProfile", "-File", scriptPath];

	const scriptArgs = [
		"-VideoPath",
		inputPath,
		"-OutputRoot",
		outputRoot,
		"-Columns",
		String(options.columns),
		"-Fps",
		String(options.fps),
		"-LumThreshold",
		String(options.luminanceThreshold),
	];

	if (options.chars) {
		scriptArgs.push("-Chars", options.chars);
	}

	if (options.invert) {
		scriptArgs.push("-Invert");
	}

	await spawnProcess(executable, [...baseArgs, ...scriptArgs]);

	const outputEntries = await readdir(outputRoot, { withFileTypes: true }).catch(
		() => [],
	);
	const workingDirectory = outputEntries.find((entry) => entry.isDirectory());

	if (!workingDirectory) {
		throw new AsciiConversionError(
			"The converter did not create an output directory.",
			500,
		);
	}

	const frameDirectory = join(outputRoot, workingDirectory.name, "frame_images");
	const frameDirectoryStats = await stat(frameDirectory).catch(() => null);

	if (!frameDirectoryStats?.isDirectory()) {
		throw new AsciiConversionError(
			"The ASCII frame directory is missing from the converter output.",
			500,
		);
	}

	return frameDirectory;
}

async function readFrames(frameDirectory: string) {
	const files = (await readdir(frameDirectory))
		.filter((name) => name.endsWith(".txt"))
		.sort((left, right) => left.localeCompare(right));

	const frames = await Promise.all(
		files.map(async (name) => {
			const framePath = join(frameDirectory, name);
			return readFile(framePath, "utf8");
		}),
	);

	return frames;
}

function measureFrame(frame: string) {
	const normalized = frame.replace(/\r/g, "").replace(/\n$/, "");

	if (normalized.length === 0) {
		return { columns: 0, rows: 0 };
	}

	const frameRows = normalized.split("\n");

	return {
		columns: frameRows.reduce(
			(maxWidth, row) => Math.max(maxWidth, row.length),
			0,
		),
		rows: frameRows.length,
	};
}

function spawnProcess(command: string, args: string[]) {
	return new Promise<void>((resolve, reject) => {
		const child = spawn(command, args, {
			cwd: process.cwd(),
			stdio: ["ignore", "pipe", "pipe"],
		});

		let stderr = "";

		child.stderr.on("data", (chunk) => {
			stderr += chunk.toString();
		});

		child.on("error", (error) => {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				reject(
					new AsciiConversionError(
						"Missing tooling. Install PowerShell, ffmpeg, and ffprobe, then retry.",
						500,
					),
				);
				return;
			}

			reject(
				new AsciiConversionError(
					`Failed to start the converter: ${error.message}`,
					500,
				),
			);
		});

		child.on("close", (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(
				new AsciiConversionError(
					cleanErrorMessage(stderr) ??
						"The converter exited before generating ASCII frames.",
					500,
				),
			);
		});
	});
}

function cleanErrorMessage(stderr: string) {
	const normalized = stderr
		.replace(/\r/g, "")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	if (normalized.length === 0) {
		return null;
	}

	return normalized[normalized.length - 1];
}
