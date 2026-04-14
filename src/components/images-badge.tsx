"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  /** Optional link URL */
  href?: string;
  /** Link target attribute (e.g., "_blank" for new tab) */
  target?: string;
  /** Folder dimensions { width, height } in pixels */
  folderSize?: { width: number; height: number };
  /** Image dimensions when teased (peeking) { width, height } in pixels */
  teaserImageSize?: { width: number; height: number };
  /** Image dimensions when hovered { width, height } in pixels */
  hoverImageSize?: { width: number; height: number };
  /** Optional per-image teaser widths, e.g. [110, 100, 120] */
  teaserImageWidths?: number[];
  /** Optional per-image hover widths, e.g. [256, 220, 280] */
  hoverImageWidths?: number[];
  /** How far images translate up on hover in pixels */
  hoverTranslateY?: number;
  /** How far images spread horizontally on hover in pixels */
  hoverSpread?: number;
  /** Rotation angle for fanned images on hover in degrees */
  hoverRotation?: number;
}

export function ImagesBadge({
  text,
  images,
  className,
  href,
  target,
  folderSize = { width: 196, height: 140 },
  teaserImageSize = { width: 110, height: 76 },
  hoverImageSize = { width: 256, height: 176 },
  teaserImageWidths,
  hoverImageWidths,
  hoverTranslateY = -182,
  hoverSpread = 86,
  hoverRotation = 14,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Limit to max 3 images
  const displayImages = images.slice(0, 3);

  // Calculate folder tab dimensions proportionally
  const tabWidth = folderSize.width * 0.375;
  const tabHeight = folderSize.height * 0.25;

  const Component = href ? "a" : "div";

  return (
    <Component
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex cursor-pointer h-full items-center gap-2 perspective-[1000px] transform-3d",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Folder Container */}
      <motion.div
        className="relative"
        style={{
          width: folderSize.width,
          height: folderSize.height,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Folder Back */}
        <div
          className="absolute inset-0"
          style={{
            background: "#6D94E6",
            boxShadow: "inset 0px 0px 4px 2px rgba(255, 255, 255, 0.31)",
            borderRadius: "14px",
          }}
        >
          {/* Folder Tab */}
        </div>

        {/* Images that pop out */}
        {displayImages.map((image, index) => {
          const totalImages = displayImages.length;

          // Calculate rotation based on index
          const baseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverRotation
                : (index - 1) * hoverRotation;

          // Hover positions - fan out
          const hoverY = hoverTranslateY - (totalImages - 1 - index) * 3;
          const hoverX =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverSpread
                : (index - 1) * hoverSpread;

          // Teaser positions - slight peek from folder
          const teaseY = -4 - (totalImages - 1 - index) * 1;
          const teaseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * 3
                : (index - 1) * 3;

          const teaserWidth =
            teaserImageWidths?.[index] ?? teaserImageSize.width;
          const hoveredWidth =
            hoverImageWidths?.[index] ?? hoverImageSize.width;

          return (
            <motion.img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className="absolute top-0.5 left-1/2 origin-bottom  object-contain"
              animate={{
                x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                y: isHovered ? hoverY : teaseY,
                rotate: isHovered ? baseRotation : teaseRotation,
                width: isHovered ? hoveredWidth : teaserWidth,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: index * 0.03,
              }}
              style={{
                zIndex: 10 + index,
                height: "auto",
              }}
            />
          );
        })}

        {/* Folder Front (flattens on hover) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[14px]"
          animate={{
            rotateX: isHovered ? -45 : -25,
            scaleY: isHovered ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          style={{
            background: "rgba(255, 255, 255, 0.48)",
            boxShadow:
              "-13px 43px 18px rgba(0, 0, 0, 0.01), -7px 24px 15px rgba(0, 0, 0, 0.04), -3px 11px 11px rgba(0, 0, 0, 0.07), -1px 3px 6px rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(12.5px)",
            WebkitBackdropFilter: "blur(12.5px)",
            transformStyle: "preserve-3d",
            zIndex: 20,
          }}
        >
          {/* Folder line detail */}
          <div className="absolute top-1  inset-x-3 h-px bg-[var(--color-blue-light)]/80" />
        </motion.div>
      </motion.div>
    </Component>
  );
}
