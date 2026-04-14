import { type ASCIIAppearance } from "@/lib/ascii-appearance";

type ASCIIExportParams = {
  appearance: ASCIIAppearance;
  fileName: string;
  fps: number;
  frames: string[];
  chars: string;
};

type ASCIIRenderMetrics = {
  charWidth: number;
  counterHeight: number;
  font: string;
  height: number;
  lineHeightPx: number;
  width: number;
};

export async function exportASCIIAnimationAsVideo({
  appearance,
  fileName,
  fps,
  frames,
  chars,
}: ASCIIExportParams) {
  if (frames.length === 0) {
    throw new Error("Convert a video first so there are frames to export.");
  }

  if (typeof MediaRecorder === "undefined") {
    throw new Error(
      "This browser does not support MediaRecorder video export.",
    );
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("The browser could not create a 2D canvas context.");
  }

  const metrics = measureFrames(context, frames, appearance);
  const scale = metrics.width <= 720 ? 2 : 1;
  canvas.width = Math.ceil(metrics.width * scale);
  canvas.height = Math.ceil(metrics.height * scale);

  const stream = canvas.captureStream(fps);
  const mimeType = getSupportedVideoMimeType();

  if (!mimeType) {
    throw new Error("This browser cannot record canvas output as WebM.");
  }

  const chunks: BlobPart[] = [];
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 6_000_000,
  });

  const blobPromise = new Promise<Blob>((resolve, reject) => {
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onerror = () => {
      reject(
        new Error("Video export failed while recording the canvas stream."),
      );
    };

    recorder.onstop = () => {
      resolve(new Blob(chunks, { type: mimeType }));
    };
  });

  recorder.start();

  try {
    const frameDuration = 1000 / fps;

    for (let frameIndex = 0; frameIndex < frames.length; frameIndex += 1) {
      drawFrame({
        appearance,
        canvas,
        context,
        frame: frames[frameIndex],
        frameIndex,
        metrics,
        scale,
        totalFrames: frames.length,
        chars,
      });

      await wait(frameDuration);
    }

    await wait(frameDuration);
    recorder.stop();
    const blob = await blobPromise;
    downloadBlob(blob, `${sanitizeFileStem(fileName)}.webm`);
  } finally {
    stream.getTracks().forEach((track) => track.stop());
  }
}

export function exportASCIIAnimationAsReactComponent({
  appearance,
  fileName,
  fps,
  frames,
  chars,
}: ASCIIExportParams) {
  if (frames.length === 0) {
    throw new Error("Convert a video first so there are frames to export.");
  }

  const stem = sanitizeFileStem(fileName);
  const componentName = toPascalCase(stem);
  const source = buildASCIIAnimationReactComponentSource({
    appearance,
    componentName,
    fps,
    frames,
    chars,
  });

  downloadTextFile(source, `${stem}.tsx`);
}

export async function exportASCIIAsImage({
  appearance,
  fileName,
  frame,
  chars,
  quality = 2,
}: {
  appearance: ASCIIAppearance;
  fileName: string;
  frame: string;
  chars: string;
  quality?: number;
}) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("The browser could not create a 2D canvas context.");
  }

  const metrics = measureFrames(context, [frame], appearance);

  const scale = quality;
  canvas.width = Math.ceil(metrics.width * scale);
  canvas.height = Math.ceil(metrics.height * scale);

  drawFrame({
    appearance,
    canvas,
    context,
    frame,
    frameIndex: 0,
    metrics,
    scale,
    totalFrames: 1,
    chars,
  });

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/png");
  });

  if (!blob) {
    throw new Error("Failed to generate image blob.");
  }

  downloadBlob(blob, `${sanitizeFileStem(fileName)}.png`);
}

export function buildASCIIAnimationReactComponentSource({
  appearance,
  componentName,
  fps,
  frames,
  chars,
}: {
  appearance: ASCIIAppearance;
  componentName: string;
  fps: number;
  frames: string[];
  chars: string;
}) {
  const framesJson = JSON.stringify(frames, null, "\t");
  const appearanceJson = JSON.stringify(appearance, null, "\t");

  return [
    '"use client";',
    "",
    'import React, { useEffect, useRef, useState } from "react";',
    "",
    `const FPS = ${fps};`,
    `const FRAMES = ${framesJson};`,
    `const APPEARANCE = ${appearanceJson};`,
    `const CHARS = ${JSON.stringify(chars)};`,
    "",
    `export default function ${componentName}() {`,
    "	const [currentFrame, setCurrentFrame] = useState(0);",
    "	const [scale, setScale] = useState(1);",
    "	const containerRef = useRef<HTMLDivElement>(null);",
    "	const contentRef = useRef<HTMLPreElement>(null);",
    "",
    "	useEffect(() => {",
    "		let animationId: number;",
    "		let lastTime = 0;",
    "		const frameDuration = 1000 / FPS;",
    "",
    "		const animate = (time: number) => {",
    "			if (!lastTime) lastTime = time;",
    "			const delta = time - lastTime;",
    "",
    "			if (delta >= frameDuration) {",
    "				setCurrentFrame((current: number) => (current + 1) % FRAMES.length);",
    "				lastTime = time - (delta % frameDuration);",
    "			}",
    "",
    "			animationId = requestAnimationFrame(animate);",
    "		};",
    "",
    "		animationId = requestAnimationFrame(animate);",
    "		return () => cancelAnimationFrame(animationId);",
    "	}, []);",
    "",
    "	useEffect(() => {",
    "		const measure = () => {",
    "			const container = containerRef.current;",
    "			const content = contentRef.current;",
    "			if (!container || !content) return;",
    "",
    "			const availableWidth = container.clientWidth;",
    "			const naturalWidth = content.scrollWidth;",
    "",
    "			if (availableWidth > 0 && naturalWidth > 0 && naturalWidth > availableWidth) {",
    "				setScale(availableWidth / naturalWidth);",
    "			} else {",
    "				setScale(1);",
    "			}",
    "		};",
    "",
    "		measure();",
    "		const observer = new ResizeObserver(measure);",
    "		if (containerRef.current) observer.observe(containerRef.current);",
    "		return () => observer.disconnect();",
    "	}, []);",
    "",
    "	const effect = APPEARANCE.textEffect;",
    '	const needsStyles = effect !== "none";',
    "",
    "	return (",
    "		<div",
    "			ref={containerRef}",
    "			style={{",
    "				backgroundColor: APPEARANCE.backgroundColor,",
    "				borderRadius: `${APPEARANCE.borderRadius}px`,",
    "				color: APPEARANCE.textColor,",
    '				display: "flex",',
    '				flexDirection: "column",',
    "				fontFamily: APPEARANCE.fontFamily,",
    '				overflow: "hidden",',
    '				position: "relative",',
    '				width: "100%",',
    "			}}",
    "		>",
    "			{needsStyles && (",
    "				<style dangerouslySetInnerHTML={{ __html: `",
    "					@keyframes ascii-rainbow { 0% { background-position: 0%; } 100% { background-position: 200%; } }",
    "					@keyframes ascii-burn-neon { 0%, 100% { color: #ff3300; text-shadow: 0 0 20px #ff0000, 0 0 40px #ff3300; } 50% { color: #ffffff; text-shadow: 0 0 10px #ffffff, 0 0 20px #ffaa00; } }",
    "					@keyframes ascii-neural-pulse { 0% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(180deg); } 100% { filter: hue-rotate(360deg); } }",
    "					.ascii-effect-video { background-image: url('https://i.pinimg.com/originals/80/b7/5e/80b75eb774b647c67b2efa531b57ba13.gif'); background-size: cover; background-clip: text; -webkit-background-clip: text; color: transparent !important; }",
    "					.ascii-effect-gradient { background-image: linear-gradient(45deg, #ff4c4c, #b3ff4c, #4c99ff, #4cc3ff, #b34cff); background-size: 200%; background-clip: text; -webkit-background-clip: text; color: transparent !important; animation: ascii-rainbow 5s linear infinite; }",
    "					.ascii-effect-burn { animation: ascii-burn-neon 1.5s alternate infinite ease-in-out; }",
    "					.ascii-effect-neural { animation: ascii-neural-pulse 3s linear infinite; text-shadow: 0 0 10px rgba(0, 100, 255, 0.5), 0 0 20px rgba(0, 50, 255, 0.3); }",
    "				` }} />",
    "			)}",
    "",
    '			<div style={{ transform: `scale(${scale})`, transformOrigin: "left top" }}>',
    "				{APPEARANCE.showFrameCounter && (",
    '					<div style={{ opacity: 0.5, fontSize: "10px", marginBottom: "8px" }}>',
    "						Frame: {currentFrame + 1}/{FRAMES.length}",
    "					</div>",
    "				)}",
    "				<pre",
    "					ref={contentRef}",
    "					style={{",
    '						fontFamily: "inherit",',
    "						fontSize: `${APPEARANCE.fontSize}px`,",
    "						lineHeight: APPEARANCE.lineHeight,",
    "						margin: 0,",
    '						whiteSpace: "pre",',
    '						...(effect === "matrix" && APPEARANCE.textEffectThreshold <= 0 ? {',
    '							color: "#00ff00",',
    '							textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00",',
    '						} : effect === "neon" && APPEARANCE.textEffectThreshold <= 0 ? {',
    '							color: "#ff00ff",',
    '							textShadow: "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff",',
    '						} : effect === "glitch" && APPEARANCE.textEffectThreshold <= 0 ? {',
    '							textShadow: "2px 0 0 red, -2px 0 0 blue",',
    "						} : {}),",
    "					}}",
    "				>",
    "					{(() => {",
    "						const text = FRAMES[currentFrame];",
    "						const threshold = APPEARANCE.textEffectThreshold;",
    "",
    '						if (!text || effect === "none" || threshold <= 0 || !CHARS) {',
    "							return (",
    '								<span className={effect === "none" ? "" : `ascii-effect-${effect}`}>',
    "									{text}",
    "								</span>",
    "							);",
    "						}",
    "",
    "						const thresholdIndex = Math.floor(CHARS.length * threshold);",
    "						const affectedChars = CHARS.slice(thresholdIndex);",
    "						const effectClass = `ascii-effect-${effect}`;",
    "",
    "						const effectStyle = ",
    '							effect === "matrix" ? { color: "#00ff00", textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00" } :',
    '							effect === "neon" ? { color: "#ff00ff", textShadow: "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff" } :',
    '							effect === "glitch" ? { textShadow: "2px 0 0 red, -2px 0 0 blue" } :',
    "							{};",
    "",
    "						const result = [];",
    '						let currentBatch = "";',
    "						let isBatchAffected = false;",
    "",
    "						for (let i = 0; i < text.length; i++) {",
    "							const char = text[i];",
    "							const isAffected = affectedChars.includes(char);",
    "",
    '							if (isAffected !== isBatchAffected && currentBatch !== "") {',
    "								result.push(isBatchAffected ? ",
    "									<span key={i} className={effectClass} style={effectStyle}>{currentBatch}</span> : ",
    "									currentBatch",
    "								);",
    '								currentBatch = "";',
    "							}",
    "							currentBatch += char;",
    "							isBatchAffected = isAffected;",
    "						}",
    "",
    '						if (currentBatch !== "") {',
    "							result.push(isBatchAffected ? ",
    '								<span key="final" className={effectClass} style={effectStyle}>{currentBatch}</span> : ',
    "								currentBatch",
    "							);",
    "						}",
    "",
    "						return result;",
    "					})()}",
    "				</pre>",
    "			</div>",
    "		</div>",
    "	);",
    "}",
  ].join("\n");
}

function measureFrames(
  context: CanvasRenderingContext2D,
  frames: string[],
  appearance: ASCIIAppearance,
): ASCIIRenderMetrics {
  const normalizedFrames = frames.map(normalizeFrame);
  const maxColumns = normalizedFrames.reduce(
    (maxWidth, frame) =>
      Math.max(
        maxWidth,
        frame.reduce((rowWidth, row) => Math.max(rowWidth, row.length), 0),
      ),
    0,
  );
  const maxRows = normalizedFrames.reduce(
    (maxHeight, frame) => Math.max(maxHeight, frame.length),
    0,
  );
  const font = `${appearance.fontSize}px ${appearance.fontFamily}`;
  context.font = font;

  const charWidth = Math.max(1, context.measureText("M").width);
  const lineHeightPx = Math.max(1, appearance.fontSize * appearance.lineHeight);
  const counterHeight = appearance.showFrameCounter
    ? appearance.fontSize * 2
    : 0;
  const width = Math.max(360, Math.ceil(maxColumns * charWidth));
  const height = Math.max(
    240,
    Math.ceil(counterHeight + maxRows * lineHeightPx),
  );

  return {
    charWidth,
    counterHeight,
    font,
    height,
    lineHeightPx,
    width,
  };
}

function drawFrame({
  appearance,
  canvas,
  context,
  frame,
  frameIndex,
  metrics,
  scale,
  totalFrames,
  chars,
}: {
  appearance: ASCIIAppearance;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  frame: string;
  frameIndex: number;
  metrics: ASCIIRenderMetrics;
  scale: number;
  totalFrames: number;
  chars: string;
}) {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.scale(scale, scale);
  context.fillStyle = appearance.backgroundColor;
  context.fillRect(0, 0, metrics.width, metrics.height);
  context.font = metrics.font;
  context.textBaseline = "top";

  let renderFillStyle: string | CanvasGradient = appearance.textColor;
  const isMatrix = appearance.textEffect === "matrix";
  const isNeon = appearance.textEffect === "neon";
  const isGlitch = appearance.textEffect === "glitch";
  const isGradient = appearance.textEffect === "gradient";
  const isBurn = appearance.textEffect === "burn";
  const isNeural = appearance.textEffect === "neural";
  const isVideo = appearance.textEffect === "video";

  if (isMatrix) {
    renderFillStyle = "#00ff00";
    context.shadowColor = "#00ff00";
    context.shadowBlur = 10;
  } else if (isNeon) {
    renderFillStyle = "#ff00ff";
    context.shadowColor = "#ff00ff";
    context.shadowBlur = 20;
  } else if (isBurn) {
    const t = (Math.sin(frameIndex * 0.5) + 1) / 2;
    renderFillStyle = t > 0.5 ? "#ffffff" : "#ff3300";
    context.shadowColor = renderFillStyle as string;
    context.shadowBlur = t > 0.5 ? 10 : 20;
  } else if (isGradient) {
    const gradient = context.createLinearGradient(
      0,
      0,
      metrics.width,
      metrics.height,
    );
    gradient.addColorStop(0, "#ff4c4c");
    gradient.addColorStop(0.2, "#b3ff4c");
    gradient.addColorStop(0.4, "#4c99ff");
    gradient.addColorStop(0.6, "#4cc3ff");
    gradient.addColorStop(0.8, "#b34cff");
    gradient.addColorStop(1, "#ff4c4c");
    renderFillStyle = gradient;
  } else if (isNeural) {
    const shift = (frameIndex * 10) % metrics.width;
    const gradient = context.createLinearGradient(
      -metrics.width + shift,
      0,
      metrics.width + shift,
      0,
    );

    const colors = [
      "#ff00cc",
      "#3333ff",
      "#00ffcc",
      "#ffff00",
      "#ff6600",
      "#ff00cc",
      "#3333ff",
      "#00ffcc",
      "#ffff00",
      "#ff6600",
      "#ff00cc",
    ];
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });

    renderFillStyle = gradient;

    const pulse = (Math.sin(frameIndex * 0.2) + 1) / 2;
    context.shadowBlur = 10 + pulse * 10;
    context.shadowColor = "rgba(0, 100, 255, 0.4)";
  } else if (isVideo) {
    renderFillStyle = "#00ff00";
  }

  context.fillStyle = renderFillStyle;

  let y = 0;

  if (appearance.showFrameCounter) {
    context.globalAlpha = 0.78;
    context.fillText(`Frame: ${frameIndex + 1}/${totalFrames}`, 0, y);
    context.globalAlpha = 1;
    y += metrics.counterHeight;
  }

  const rows = normalizeFrame(frame);
  const { textEffectThreshold } = appearance;
  const thresholdIndex =
    textEffectThreshold > 0 && chars
      ? Math.floor(chars.length * textEffectThreshold)
      : -1;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];

    if (thresholdIndex > -1) {
      context.fillStyle = appearance.textColor;
      context.shadowBlur = 0;
      context.fillText(row, 0, y);
    }

    if (isGlitch) {
      context.fillStyle = "red";
      context.fillText(row, 2, y);
      context.fillStyle = "blue";
      context.fillText(row, -2, y);
      context.fillStyle = renderFillStyle;
    }

    context.fillStyle = renderFillStyle;
    if (isMatrix) {
      context.shadowColor = "#00ff00";
      context.shadowBlur = 10;
    } else if (isNeon) {
      context.shadowColor = "#ff00ff";
      context.shadowBlur = 20;
    } else if (isBurn) {
      const t = (Math.sin(frameIndex * 0.5) + 1) / 2;
      context.shadowColor = t > 0.5 ? "#ffffff" : "#ff3300";
      context.shadowBlur = t > 0.5 ? 10 : 20;
    } else if (isNeural) {
      const pulse = (Math.sin(frameIndex * 0.2) + 1) / 2;
      context.shadowBlur = 10 + pulse * 10;
      context.shadowColor = "rgba(0, 100, 255, 0.4)";
    }

    if (thresholdIndex > -1) {
      for (let charIndex = 0; charIndex < row.length; charIndex++) {
        const char = row[charIndex];
        if (chars.indexOf(char) >= thresholdIndex) {
          context.fillText(char, charIndex * metrics.charWidth, y);
        }
      }
    } else {
      context.fillText(row, 0, y);
    }

    y += metrics.lineHeightPx;
  }

  context.shadowBlur = 0;
  context.shadowColor = "transparent";
}

function normalizeFrame(frame: string) {
  return frame.replace(/\r/g, "").replace(/\n$/, "").split("\n");
}

function getSupportedVideoMimeType() {
  const candidates = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];

  return candidates.find((mimeType) => MediaRecorder.isTypeSupported(mimeType));
}

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
}

function downloadTextFile(content: string, fileName: string) {
  downloadBlob(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
    fileName,
  );
}

function sanitizeFileStem(fileName: string) {
  const stem = fileName.replace(/\.[^.]+$/, "");
  return (
    stem
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "ascii-animation"
  );
}

function toPascalCase(value: string) {
  const normalized = value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1));

  const joined = normalized.join("");

  return /^[A-Z]/.test(joined) ? joined : `Ascii${joined}`;
}

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}
