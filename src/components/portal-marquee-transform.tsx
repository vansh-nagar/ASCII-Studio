"use client";

import React from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface PortalMarqueeTransformProps {
  className?: string;
}

interface MarqueeMediaItem {
  src: string;
  type: "image" | "video";
}

const SOURCE_MEDIA: MarqueeMediaItem[] = [
  { src: "/portal-marquee-video/hand.mp4", type: "video" },
  { src: "/portal-marquee-video/fire-cd.mp4", type: "video" },
  { src: "/portal-marquee-video/fire-sparkle.mp4", type: "video" },
  { src: "/portal-marquee-video/skull-stroke.mp4", type: "video" },
];

const TRANSFORMED_MEDIA: MarqueeMediaItem[] = [
  { src: "/portal-marquee-video/below-video/fire.mp4", type: "video" },
  { src: "/portal-marquee-video/below-video/cd.mp4", type: "video" },
  { src: "/portal-marquee-video/below-video/skull.gif", type: "image" },
  { src: "/portal-marquee-video/below-video/stroke.gif", type: "image" },
];

function MarqueeStrip({
  media,
  isActive,
  transformed = false,
}: {
  media: MarqueeMediaItem[];
  isActive: boolean;
  transformed?: boolean;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = React.useState(0);
  const loopMedia = [...media, ...media];

  React.useEffect(() => {
    const updateLoopWidth = () => {
      if (!trackRef.current) {
        return;
      }

      setLoopWidth(trackRef.current.scrollWidth / 2);
    };

    updateLoopWidth();
    window.addEventListener("resize", updateLoopWidth);

    return () => {
      window.removeEventListener("resize", updateLoopWidth);
    };
  }, [media]);

  useAnimationFrame((_, delta) => {
    if (!isActive || loopWidth <= 0) {
      return;
    }

    const speed = 30; // pixels per second
    const nextX = x.get() - (delta / 1000) * speed;

    if (nextX <= -loopWidth) {
      x.set(nextX + loopWidth);
      return;
    }

    x.set(nextX);
  });

  return (
    <motion.div
      ref={trackRef}
      className="absolute top-1/2 left-0 flex w-max -translate-y-1/2 items-center gap-5 pr-5"
      style={{ x }}
    >
      {loopMedia.map((item, index) => (
        <div
          key={`${item.src}-${index}-${transformed ? "transformed" : "source"}`}
          className={cn(
            "relative h-[138px] w-[210px] shrink-0 overflow-hidden rounded-2xl",
            transformed
              ? "shadow-[0_12px_26px_rgba(2,60,196,0.24)]"
              : "shadow-[0_12px_26px_rgba(2,60,196,0.24)]",
          )}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              className="h-full w-full object-cover"
              style={
                transformed
                  ? {
                      filter:
                        "grayscale(0.2) contrast(1.2) saturate(1.15) brightness(0.92)",
                    }
                  : undefined
              }
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Moving preview"
            />
          ) : (
            <img
              src={item.src}
              alt="Moving preview"
              className="h-full w-full object-cover"
              style={
                transformed
                  ? {
                      filter:
                        "grayscale(0.2) contrast(1.2) saturate(1.15) brightness(0.92)",
                    }
                  : undefined
              }
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default function PortalMarqueeTransform({
  className,
}: PortalMarqueeTransformProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={cn(
        "relative h-full w-full min-h-[190px] overflow-hidden rounded-xl",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <MarqueeStrip media={SOURCE_MEDIA} isActive={isHovered} />
      </div>

      <div
        className="absolute inset-0"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        <MarqueeStrip
          media={TRANSFORMED_MEDIA}
          isActive={isHovered}
          transformed
        />
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[170px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#023cc4]"></div>
    </div>
  );
}
