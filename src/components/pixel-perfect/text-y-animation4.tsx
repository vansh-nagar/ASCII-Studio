"use client";
import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(SplitText);

export type StaggerFrom = "start" | "center" | "edges" | "random" | "end";

interface TextYAnimationProps {
  staggerFrom?: StaggerFrom;
  text?: string;
  secondText?: string;
  isActive?: boolean;
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
  containerClassName?: string;
}

const TextYAnimation4 = ({
  staggerFrom = "start",
  text = "JUST GIVE IT A STAR",
  secondText,
  isActive = true,
  className,
  firstClassName,
  secondClassName,
  containerClassName,
}: TextYAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const split1Ref = useRef<SplitText | null>(null);
  const split2Ref = useRef<SplitText | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const returnToStartTweenRef = useRef<gsap.core.Tween | null>(null);

  const nextText = secondText ?? text;

  useGSAP(
    () => {
      if (!textRef1.current || !textRef2.current) return;

      const split1 = new SplitText(textRef1.current, { type: "chars" });
      const split2 = new SplitText(textRef2.current, { type: "chars" });

      split1Ref.current = split1;
      split2Ref.current = split2;

      gsap.set(split1.chars, {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transformOrigin: "50% 100%",
      });
      gsap.set(split2.chars, {
        y: "100%",
        opacity: 0,
        filter: "blur(4px)",
        transformOrigin: "50% 100%",
      });

      const timeline = gsap.timeline({
        paused: true,
      });

      timeline.to(
        split1.chars,
        {
          y: "-100%",
          opacity: 0,
          filter: "blur(4px)",
          ease: "none",
          stagger: {
            each: 0.2,
            from: staggerFrom,
          },
        },
        0,
      );

      timeline.to(
        split2.chars,
        {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: {
            each: 0.2,
            from: staggerFrom,
          },
        },
        0,
      );

      timelineRef.current = timeline;

      return () => {
        returnToStartTweenRef.current?.kill();
        returnToStartTweenRef.current = null;
        timelineRef.current?.kill();
        timelineRef.current = null;
        split1Ref.current = null;
        split2Ref.current = null;
        split1.revert();
        split2.revert();
      };
    },
    { scope: containerRef, dependencies: [staggerFrom, text, nextText] },
  );

  useEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) return;

    returnToStartTweenRef.current?.kill();
    returnToStartTweenRef.current = null;

    const targetTime = isActive ? timeline.duration() : 0;

    // Use one symmetric playhead tween so hover-in and hover-out feel identical.
    returnToStartTweenRef.current = timeline.tweenTo(targetTime, {
      duration: 0.5,
      ease: "sine.inOut",
      overwrite: true,
      onComplete: () => {
        timeline.pause(targetTime);
      },
    });

    if (isActive) {
      return;
    }
  }, [isActive]);

  return (
    <span
      ref={containerRef}
      className={`relative flex justify-center  items-center overflow-hidden ${containerClassName ?? ""}`}
    >
      <span
        ref={textRef1}
        className={`perspective-distant ${className ?? ""} ${
          firstClassName ?? ""
        }`}
      >
        {text}
      </span>

      <span
        ref={textRef2}
        className={`perspective-distant absolute top-0 left-0 ${
          className ?? ""
        } ${secondClassName ?? ""}`}
      >
        {nextText}
      </span>
    </span>
  );
};

export default TextYAnimation4;
