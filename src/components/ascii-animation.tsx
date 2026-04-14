"use client";

import { useEffect, useRef, useState } from "react";

import {
  type ASCIIAppearance,
  mergeASCIIAppearance,
} from "@/lib/ascii-appearance";
import { Spinner } from "./ui/spinner";

class AnimationManager {
  private _animation: number | null = null;
  private callback: () => void;
  private lastFrame = -1;
  private frameTime = 1000 / 30;

  constructor(callback: () => void, fps = 30) {
    this.callback = callback;
    this.frameTime = 1000 / fps;
  }

  updateFPS(fps: number) {
    this.frameTime = 1000 / fps;
  }

  start() {
    if (this._animation != null) return;
    this._animation = requestAnimationFrame(this.update);
  }

  pause() {
    if (this._animation == null) return;
    this.lastFrame = -1;
    cancelAnimationFrame(this._animation);
    this._animation = null;
  }

  private update = (time: number) => {
    const { lastFrame } = this;
    let delta = time - lastFrame;
    if (this.lastFrame === -1) {
      this.lastFrame = time;
    } else {
      while (delta >= this.frameTime) {
        this.callback();
        delta -= this.frameTime;
        this.lastFrame += this.frameTime;
      }
    }
    this._animation = requestAnimationFrame(this.update);
  };
}

interface ASCIIAnimationProps {
  appearance?: Partial<ASCIIAppearance>;
  frames?: string[];
  className?: string;
  fps?: number;
  frameCount?: number;
  frameFolder?: string;
  fitToContainer?: boolean;
  colorUrl?: string;
  chars?: string;
  isPlaying?: boolean;
}

export default function ASCIIAnimation({
  appearance,
  frames: providedFrames,
  className = "",
  fps = 24,
  frameCount = 60,
  frameFolder = "frames",
  fitToContainer = false,
  colorUrl,
  chars = "@%#*+=-:. ", // Provide a default if missing
  isPlaying = true,
}: ASCIIAnimationProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<string[]>([]);
  const resolvedAppearance = mergeASCIIAppearance(appearance);

  const [animationManager] = useState(
    () =>
      new AnimationManager(() => {
        setCurrentFrame((current) => {
          if (framesRef.current.length === 0) return current;
          return (current + 1) % framesRef.current.length;
        });
      }, fps),
  );

  useEffect(() => {
    let isCancelled = false;

    const loadFrames = async () => {
      setIsLoading(true);

      if (providedFrames) {
        if (!isCancelled) {
          setFrames(providedFrames);
          framesRef.current = providedFrames;
          setCurrentFrame(0);
          setIsLoading(false);
        }
        return;
      }

      try {
        const frameFiles = Array.from(
          { length: frameCount },
          (_, i) => `frame_${String(i + 1).padStart(4, "0")}.txt`,
        );

        const framePromises = frameFiles.map(async (filename) => {
          const response = await fetch(`/${frameFolder}/${filename}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${filename}: ${response.status}`);
          }
          return await response.text();
        });

        const loadedFrames = await Promise.all(framePromises);
        console.log(`Loaded ${loadedFrames.length} frames`);
        if (!isCancelled) {
          setFrames(loadedFrames);
          framesRef.current = loadedFrames;
          setCurrentFrame(0);
        }
      } catch (error) {
        console.error("Failed to load ASCII frames:", error);
        if (!isCancelled) {
          setFrames([]);
          framesRef.current = [];
          setCurrentFrame(0);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadFrames();

    return () => {
      isCancelled = true;
    };
  }, [providedFrames, frameCount, frameFolder]);

  useEffect(() => {
    animationManager.updateFPS(fps);
  }, [fps, animationManager]);

  useEffect(() => {
    if (frames.length === 0) return;

    const reducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (reducedMotion || !isPlaying) {
      animationManager.pause();
      return;
    }

    const handleFocus = () => {
      if (isPlaying) {
        animationManager.start();
      }
    };
    const handleBlur = () => animationManager.pause();

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    if (document.visibilityState === "visible") {
      animationManager.start();
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      animationManager.pause();
    };
  }, [animationManager, frames.length, isPlaying]);

  useEffect(() => {
    if (!fitToContainer) {
      setScale(1);
      return;
    }

    const measure = () => {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!container || !content) {
        return;
      }

      const availableWidth = container.clientWidth;
      const availableHeight = container.clientHeight;
      const naturalWidth = content.scrollWidth;
      const naturalHeight = content.scrollHeight;

      if (
        availableWidth <= 0 ||
        availableHeight <= 0 ||
        naturalWidth <= 0 ||
        naturalHeight <= 0
      ) {
        return;
      }

      const nextScale = Math.min(
        availableWidth / naturalWidth,
        availableHeight / naturalHeight,
      );

      setScale(Number(nextScale.toFixed(4)));
    };

    measure();

    const observer = new ResizeObserver(() => {
      measure();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    fitToContainer,
    currentFrame,
    frames.length,
    resolvedAppearance.borderRadius,
    resolvedAppearance.fontSize,
    resolvedAppearance.lineHeight,
    resolvedAppearance.showFrameCounter,
  ]);

  if (isLoading) {
    return (
      <div
        className={`${className} flex justify-center items-center min-h-40`}
        style={{
          backgroundColor: resolvedAppearance.backgroundColor,
          borderRadius: resolvedAppearance.borderRadius,
          color: resolvedAppearance.textColor,
          fontFamily: resolvedAppearance.fontFamily,
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!frames.length) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: resolvedAppearance.backgroundColor,
          borderRadius: resolvedAppearance.borderRadius,
          color: resolvedAppearance.textColor,
          fontFamily: resolvedAppearance.fontFamily,
        }}
      >
        No frames loaded
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className} p-4`}
      style={{
        backgroundColor: resolvedAppearance.backgroundColor,
        borderRadius: resolvedAppearance.borderRadius,
        color: resolvedAppearance.textColor,
        fontFamily: resolvedAppearance.fontFamily,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className={fitToContainer ? "absolute inset-0" : undefined}
        style={
          fitToContainer
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }
            : undefined
        }
      >
        <div
          ref={contentRef}
          style={
            fitToContainer
              ? {
                  display: "inline-block",
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                }
              : undefined
          }
        >
          {resolvedAppearance.showFrameCounter ? (
            <div
              className="text-xs"
              style={{
                marginBottom: resolvedAppearance.fontSize,
                opacity: 0.78,
              }}
            >
              Frame: {currentFrame + 1} /{" "}
              <span className="text-main">{frames.length}</span>
            </div>
          ) : null}
          <pre
            style={{
              fontFamily: "inherit",
              fontSize: `${resolvedAppearance.fontSize}px`,
              fontWeight: resolvedAppearance.fontWeight,
              fontStyle: resolvedAppearance.fontStyle,
              lineHeight: resolvedAppearance.lineHeight,
              letterSpacing: `${resolvedAppearance.letterSpacing}em`,
              margin: 0,
              whiteSpace: "pre",
              ...(resolvedAppearance.useColors && colorUrl
                ? {
                    backgroundImage: `url(${colorUrl})`,
                    backgroundSize: "100% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    textShadow: "none",
                  }
                : resolvedAppearance.textEffect === "matrix" &&
                    resolvedAppearance.textEffectThreshold <= 0
                  ? {
                      color: "#00ff00",
                      textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00",
                    }
                  : resolvedAppearance.textEffect === "neon" &&
                      resolvedAppearance.textEffectThreshold <= 0
                    ? {
                        color: "#ff00ff",
                        textShadow:
                          "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff",
                      }
                    : resolvedAppearance.textEffect === "glitch" &&
                        resolvedAppearance.textEffectThreshold <= 0
                      ? {
                          textShadow: "2px 0 0 red, -2px 0 0 blue",
                        }
                      : {}),
            }}
          >
            {(() => {
              const text = frames[currentFrame];
              const effect = resolvedAppearance.textEffect;
              const threshold = resolvedAppearance.textEffectThreshold;

              if (!text || effect === "none" || threshold <= 0 || !chars) {
                return (
                  <span
                    className={
                      effect === "video"
                        ? "text-effect-video"
                        : effect === "gradient"
                          ? "text-effect-gradient"
                          : effect === "burn"
                            ? "text-effect-burn"
                            : effect === "neural"
                              ? "text-effect-neural"
                              : effect === "none"
                                ? ""
                                : `text-effect-${effect}`
                    }
                  >
                    {text}
                  </span>
                );
              }

              const thresholdIndex = Math.floor(chars.length * threshold);
              const affectedChars = new Set(
                chars.slice(thresholdIndex).split(""),
              );
              const effectClass =
                effect === "video"
                  ? "text-effect-video"
                  : effect === "gradient"
                    ? "text-effect-gradient"
                    : effect === "burn"
                      ? "text-effect-burn"
                      : effect === "neural"
                        ? "text-effect-neural"
                        : `text-effect-${effect}`;

              const effectStyle =
                effect === "matrix"
                  ? {
                      color: "#00ff00",
                      textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00",
                    }
                  : effect === "neon"
                    ? {
                        color: "#ff00ff",
                        textShadow:
                          "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff",
                      }
                    : effect === "glitch"
                      ? {
                          textShadow: "2px 0 0 red, -2px 0 0 blue",
                        }
                      : {};

              const result: React.ReactNode[] = [];
              let currentBatch = "";
              let isBatchAffected = false;

              for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const isAffected = affectedChars.has(char);

                if (isAffected !== isBatchAffected && currentBatch !== "") {
                  result.push(
                    isBatchAffected ? (
                      <span key={i} className={effectClass} style={effectStyle}>
                        {currentBatch}
                      </span>
                    ) : (
                      currentBatch
                    ),
                  );
                  currentBatch = "";
                }

                currentBatch += char;
                isBatchAffected = isAffected;
              }

              if (currentBatch !== "") {
                result.push(
                  isBatchAffected ? (
                    <span
                      key="final"
                      className={effectClass}
                      style={effectStyle}
                    >
                      {currentBatch}
                    </span>
                  ) : (
                    currentBatch
                  ),
                );
              }

              return result;
            })()}
          </pre>
        </div>
      </div>
    </div>
  );
}
