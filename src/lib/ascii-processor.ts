"use client";

/**
 * Generates a single ASCII frame from a video file at a specific time.
 */
export async function generateSingleFrame(
	file: File,
	options: {
		chars: string;
		columns: number;
		invert: boolean;
		luminanceThreshold: number;
		time?: number;
	}
): Promise<{ frame: string; rows: number; columns: number; colorUrl?: string }> {
	const isImage = file.type.startsWith("image/");
	
	if (isImage) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			const objectUrl = URL.createObjectURL(file);
			
			img.onload = () => {
				try {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d", { willReadFrequently: true });
					if (!ctx) {
						reject(new Error("Failed to get canvas context"));
						return;
					}

					const { columns: outputColumns, luminanceThreshold, chars, invert } = options;
					const fontRatio = 0.44;

					const width = img.width;
					const height = img.height;
					
					const outputHeight = Math.max(1, Math.round(height * (outputColumns / width) * fontRatio));

					canvas.width = outputColumns;
					canvas.height = outputHeight;

					ctx.drawImage(img, 0, 0, outputColumns, outputHeight);
					const colorUrl = canvas.toDataURL("image/webp", 0.8);

					const imageData = ctx.getImageData(0, 0, outputColumns, outputHeight);
					const data = imageData.data;

					let activeChars = chars || " .'`^,:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
					if (invert) {
						activeChars = activeChars.split("").reverse().join("");
					}

					const luminanceRange = Math.max(1, 255 - luminanceThreshold);
					let frame = "";

					for (let y = 0; y < outputHeight; y++) {
						for (let x = 0; x < outputColumns; x++) {
							const i = (y * outputColumns + x) * 4;
							const pixelLum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

							if (pixelLum < luminanceThreshold) {
								frame += " ";
								continue;
							}

							const charIndex = Math.floor(
								((pixelLum - luminanceThreshold) * (activeChars.length - 1)) / luminanceRange
							);
							frame += activeChars[charIndex] || " ";
						}
						if (y < outputHeight - 1) {
							frame += "\n";
						}
					}

					resolve({
						frame,
						rows: outputHeight,
						columns: outputColumns,
						colorUrl,
					});
					URL.revokeObjectURL(objectUrl);
				} catch (err) {
					reject(err);
					URL.revokeObjectURL(objectUrl);
				}
			};

			img.onerror = (err) => {
				reject(err);
				URL.revokeObjectURL(objectUrl);
			};

			img.src = objectUrl;
		});
	}

	return new Promise((resolve, reject) => {
		const video = document.createElement("video");
		const objectUrl = URL.createObjectURL(file);
		
		video.muted = true;
		video.playsInline = true;
		video.preload = "auto";
		video.src = objectUrl;

		const cleanup = () => {
			URL.revokeObjectURL(objectUrl);
			video.onloadeddata = null;
			video.onseeked = null;
			video.onerror = null;
			video.remove();
		};

		const process = () => {
			try {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d", { willReadFrequently: true });
				if (!ctx) {
					reject(new Error("Failed to get canvas context"));
					cleanup();
					return;
				}

				const { columns: outputColumns, luminanceThreshold, chars, invert } = options;
				const fontRatio = 0.44; // Matches the PowerShell script

				const width = video.videoWidth;
				const height = video.videoHeight;
				
				if (!width || !height) {
					reject(new Error("Video dimensions are not available."));
					cleanup();
					return;
				}

				const outputHeight = Math.max(1, Math.round(height * (outputColumns / width) * fontRatio));

				canvas.width = outputColumns;
				canvas.height = outputHeight;

				// Draw and get grayscale data
				ctx.drawImage(video, 0, 0, outputColumns, outputHeight);
				
				// Capture the downsampled color image for color preservation
				const colorUrl = canvas.toDataURL("image/webp", 0.8);

				const imageData = ctx.getImageData(0, 0, outputColumns, outputHeight);
				const data = imageData.data;

				let activeChars = chars || " .'`^,:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
				if (invert) {
					activeChars = activeChars.split("").reverse().join("");
				}

				const luminanceRange = Math.max(1, 255 - luminanceThreshold);
				let frame = "";

				for (let y = 0; y < outputHeight; y++) {
					for (let x = 0; x < outputColumns; x++) {
						const i = (y * outputColumns + x) * 4;
						// Grayscale conversion: 0.299R + 0.587G + 0.114B
						const pixelLum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

						if (pixelLum < luminanceThreshold) {
							frame += " ";
							continue;
						}

						const charIndex = Math.floor(
							((pixelLum - luminanceThreshold) * (activeChars.length - 1)) / luminanceRange
						);
						frame += activeChars[charIndex] || " ";
					}
					// Add newline except for the very last character of the last row
					if (y < outputHeight - 1) {
						frame += "\n";
					}
				}

				resolve({
					frame,
					rows: outputHeight,
					columns: outputColumns,
					colorUrl,
				});
				cleanup();
			} catch (err) {
				reject(err);
				cleanup();
			}
		};

		video.onloadeddata = () => {
			const seekTime = options.time !== undefined ? options.time : Math.min(1.0, video.duration / 2);
			video.currentTime = seekTime;
		};

		video.onseeked = () => {
			process();
		};

		video.onerror = (err) => {
			reject(err);
			cleanup();
		};

		if (video.readyState >= 2) {
			const seekTime = options.time !== undefined ? options.time : Math.min(1.0, video.duration / 2);
			video.currentTime = seekTime;
		}
	});
}
