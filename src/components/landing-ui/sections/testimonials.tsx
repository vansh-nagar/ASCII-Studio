"use client";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Vansh Nagar",
      role: "Owner of Ascii Studio",
      avatarSrc:
        "https://i.pinimg.com/736x/95/87/10/9587104704d2d1c5d83a7dddafb4fa4d.jpg",
      content:
        "Ascii Studio saved us hours every week across every launch cycle. We now convert raw clips into clean ASCII sequences with consistent quality, fewer revisions, and almost no manual cleanup before publishing.",
    },
    {
      name: "Riya Sharma",
      role: "Creative Developer",
      avatarSrc:
        "https://i.pinimg.com/1200x/c1/a4/5e/c1a45ed0afc3859009b99ad91fbb0f45.jpg",
      content:
        "The controls feel very precise, especially the threshold preview and density tuning. I can shape the style in minutes and export frame sets that already look production-ready for client work.",
    },
    {
      name: "Arjun Patel",
      role: "Frontend Engineer",
      avatarSrc:
        "https://i.pinimg.com/736x/13/5d/6c/135d6c81b4b03da679355d6120375c6f.jpg",
      content:
        "Performance is honestly impressive, even on longer clips and heavier source files. Rendering stays smooth, and the output drops directly into our app pipeline without extra conversion steps.",
    },
    {
      name: "Neha Verma",
      role: "Design Lead",
      avatarSrc:
        "https://i.pinimg.com/736x/95/87/10/9587104704d2d1c5d83a7dddafb4fa4d.jpg",
      content:
        "We used to compare multiple tools before every release, which slowed down design reviews. Now this is our default because the visuals stay stable and every style is easy to customize quickly.",
    },
    {
      name: "Kabir Singh",
      role: "Content Creator",
      avatarSrc:
        "https://i.pinimg.com/1200x/c1/a4/5e/c1a45ed0afc3859009b99ad91fbb0f45.jpg",
      content:
        "The workflow is simple enough for quick social edits but still powerful for advanced shots. It gives me fine control when needed and genuinely makes ASCII creation fun and repeatable again.",
    },
    {
      name: "Aisha Khan",
      role: "Community Builder",
      avatarSrc:
        "https://i.pinimg.com/736x/13/5d/6c/135d6c81b4b03da679355d6120375c6f.jpg",
      content:
        "Our audience engagement improved after we switched to animated ASCII previews across campaigns. Export quality stayed crisp, turnaround got faster, and we could publish more experiments every week.",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(560);
  const cardGap = 24;
  const startOffsetPx = 0;

  React.useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(Math.round(window.innerWidth * 0.88));
      } else {
        setCardWidth(560);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="w-full flex flex-col text-center justify-center items-center">
      <div className="flex justify-center items-center gap-2 text-xs border-2 border-blue-light-active  px-2 py-1 rounded-full ">
        <Crown size={16} />
        Testimonials
      </div>
      <span className="text-5xl mt-2">
        Trusted by <br />
        <span
          style={
            {
              background: "linear-gradient(55.33deg, #023CC4 1%, #82AAFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
            } as React.CSSProperties
          }
        >
          Twitter Community
        </span>
      </span>
      <div className="mt-14 w-full flex justify-center ">
        <div className="w-[980px] max-w-[92vw]">
          <motion.div
            className="flex"
            style={{ gap: `${cardGap}px` }}
            animate={{
              x: startOffsetPx - activeIndex * (cardWidth + cardGap),
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
              mass: 0.6,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={`${testimonial.name}-${testimonial.role}`}
                className="shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <TestimonialCard {...testimonial} className="h-full" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-16 text-muted-foreground text-xs items-center">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className=" cursor-pointer"
        >
          <ChevronLeft className="hover:text-foreground transition-colors" />
        </button>
        {activeIndex + 1}/{testimonials.length}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className=" cursor-pointer"
        >
          <ChevronRight className="hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
