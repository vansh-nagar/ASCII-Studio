"use client";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "./testimonial-card";

// ─── Add your tweet URLs here ────────────────────────────────────────────────
const TWEET_URLS = [
  "https://x.com/dingyi/status/2036119033859469529?s=20",
  "https://x.com/Abhinavstwt/status/2047571951229759620?s=20",
  "https://x.com/DanielWhit21874/status/2036378043443290286?s=20",
  "https://x.com/designerdaniyel/status/2036113395200762333?s=20",
  "https://x.com/TrippleOh7/status/2036868244317827084?s=20",
  "https://x.com/0xceneor/status/2037010338286362852?s=20",
  "https://x.com/unrootdesign/status/2043836140700963168?s=20",
  "https://x.com/bedesqui/status/2036164749113586083?s=20",
  "https://x.com/AfolabiDewale/status/2043400330835079347?s=20",
  "https://x.com/MfowlerMfowler/status/2043455016053215382?s=20",
  "https://x.com/PietroMontaldo/status/2043667114477998299?s=20",
];
// ─────────────────────────────────────────────────────────────────────────────

interface TweetData {
  author_name: string;
  handle: string;
  text: string;
  avatarUrl: string;
  tweetUrl: string;
}

const CardSkeleton = () => (
  <div
    className="relative p-5 w-full flex flex-col gap-5 animate-pulse"
    style={{
      background:
        "radial-gradient(152.32% 683.53% at 108.86% 152.32%, #6395FF 0%, #F3F7FF 100%)",
      borderRadius: "24px",
    }}
  >
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-full bg-white/40 shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3.5 w-32 rounded bg-white/40" />
        <div className="h-3 w-20 rounded bg-white/30" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full rounded bg-white/30" />
      <div className="h-3 w-5/6 rounded bg-white/30" />
      <div className="h-3 w-4/6 rounded bg-white/30" />
    </div>
  </div>
);

const TweetCard = ({ tweetUrl }: { tweetUrl: string }) => {
  const [data, setData] = useState<TweetData | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ok">("loading");

  useEffect(() => {
    fetch(`/api/tweet?url=${encodeURIComponent(tweetUrl)}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((d: TweetData) => {
        setData(d);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, [tweetUrl]);

  if (status === "loading") return <CardSkeleton />;

  if (status === "error" || !data) {
    return (
      <div
        className="relative p-5 w-full flex items-center justify-center text-sm text-muted-foreground h-40"
        style={{
          background:
            "radial-gradient(152.32% 683.53% at 108.86% 152.32%, #6395FF 0%, #F3F7FF 100%)",
          borderRadius: "24px",
        }}
      >
        Could not load tweet.
      </div>
    );
  }

  return (
    <TestimonialCard
      name={data.author_name}
      role={`@${data.handle}`}
      avatarSrc={data.avatarUrl}
      content={data.text}
      tweetUrl={data.tweetUrl}
      className="h-full"
    />
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(560);
  const cardGap = 24;

  React.useEffect(() => {
    const update = () => {
      setCardWidth(
        window.innerWidth < 640 ? Math.round(window.innerWidth * 0.88) : 560,
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNext = () => setActiveIndex((p) => (p + 1) % TWEET_URLS.length);
  const handlePrev = () =>
    setActiveIndex((p) => (p - 1 + TWEET_URLS.length) % TWEET_URLS.length);

  return (
    <div className="w-full flex flex-col max-w-[100vw] overflow-hidden text-center justify-center items-center">
      <div className="flex justify-center items-center gap-2 text-xs border-2 border-blue-light-active px-2 py-1 rounded-full">
        <Crown size={16} />
        Testimonials
      </div>
      <span className="text-3xl sm:text-4xl md:text-5xl mt-2">
        Trusted by <br />
        <span
          style={
            {
              background: "linear-gradient(55.33deg, #023CC4 1%, #82AAFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            } as React.CSSProperties
          }
        >
          Twitter Community
        </span>
      </span>

      <div className="mt-14 w-full flex justify-center">
        <div className="w-245 max-w-[92vw]">
          <motion.div
            className="flex"
            style={{ gap: `${cardGap}px` }}
            animate={{ x: -activeIndex * (cardWidth + cardGap) }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
              mass: 0.6,
            }}
          >
            {TWEET_URLS.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <TweetCard tweetUrl={url} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10 text-muted-foreground text-xs items-center">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous"
          className="cursor-pointer"
        >
          <ChevronLeft className="hover:text-foreground transition-colors" />
        </button>
        {activeIndex + 1} / {TWEET_URLS.length}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next"
          className="cursor-pointer"
        >
          <ChevronRight className="hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
