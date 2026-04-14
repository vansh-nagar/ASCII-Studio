"use client";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import FireBall from "../fireball";
import BlueFirePricing from "../blue-fire-pricing";

const Pricing = () => {
  const sideColumnWidthPx = 260;
  const [isPricingPanelHovered, setIsPricingPanelHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: {
        duration: 0.18,
        ease: "easeIn",
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.14, ease: "easeIn" },
    },
  };

  const pointsContainerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.04,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const pointVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.18, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.12, ease: "easeIn" },
    },
  };
  const monthlyPoints = [
    "Generate basic ASCII art",
    "Limited exports (PNG / TXT)",
    "In sunt proident voluptate.",
    "Ea nisi in excepteur laboris et proident nostrud qui ad.",
    "Pariatur nulla esse do qui eiusmod tempor tempor fugiat elit.",
    "Id velit sit excepteur voluptate veniam.",
    "Watermarked outputs",
  ];
  const yearlyPoints = [
    "All monthly features",
    "Unlimited exports (PNG / TXT)",
    "No watermark on outputs",
    "Priority support",
    "Access to premium ASCII styles",
    "Early access to new features",
    "Best value (save 20%)",
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="flex  p-1.5 justify-center items-center relative"
        style={{
          background: "#79A4FF",
          boxShadow:
            "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08), inset 2px 3px 3.5px rgba(255, 255, 255, 0.25)",
          borderRadius: "99px",
        }}
      >
        <button
          className="relative px-4 py-3 flex justify-center items-center font-medium"
          style={{ borderRadius: "99px", zIndex: 1 }}
          onClick={() => setActiveTab("monthly")}
        >
          {activeTab === "monthly" && (
            <motion.div
              layoutId="pricing-tab-pill"
              className="absolute inset-0"
              style={{
                background: "#F5F5F5",
                boxShadow:
                  "0px 4px 1px rgba(0, 0, 0, 0.01), 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 2px 2.2px #FFFFFF",
                borderRadius: "99px",
                zIndex: 0,
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              initial={false}
            />
          )}
          <span
            className="relative z-10"
            style={{ color: activeTab === "monthly" ? "#222" : "#fff" }}
          >
            Monthly
          </span>
        </button>
        <button
          className="relative px-4 py-3 flex justify-center items-center font-medium"
          style={{ borderRadius: "99px", zIndex: 1 }}
          onClick={() => setActiveTab("yearly")}
        >
          {activeTab === "yearly" && (
            <motion.div
              layoutId="pricing-tab-pill"
              className="absolute inset-0"
              style={{
                background: "#F5F5F5",
                boxShadow:
                  "0px 4px 1px rgba(0, 0, 0, 0.01), 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 2px 2.2px #FFFFFF",
                borderRadius: "99px",
                zIndex: 0,
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              initial={false}
            />
          )}
          <span
            className="relative z-10"
            style={{ color: activeTab === "yearly" ? "#222" : "#fff" }}
          >
            Yearly (Save 20%)
          </span>
        </button>
      </div>
      <div
        className="landing-content-width border mt-10 relative overflow-hidden"
        onMouseEnter={() => setIsPricingPanelHovered(true)}
        onMouseLeave={() => setIsPricingPanelHovered(false)}
        style={{
          background: "#F3F3F3",
          boxShadow:
            "0px 1px 0px rgba(255, 255, 255, 0.25), inset 0px 1px 2px 1px rgba(0, 0, 0, 0.15)",
          borderRadius: "32px",
        }}
      >
        <video
          className="pointer-events-none absolute object-cover transition-opacity duration-300"
          src="/pricing-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            opacity: isPricingPanelHovered ? 1 : 0,
            height: "100%",
            width: "105%",
            objectFit: "cover",
          }}
        />
        <div
          className="relative z-10 grid gap-4 p-4 grid-cols-1 items-stretch md:[grid-template-columns:1fr_var(--pricing-side-col)]"
          style={
            {
              "--pricing-side-col": `${sideColumnWidthPx}px`,
            } as React.CSSProperties
          }
        >
          <motion.div
            layout="position"
            className="px-8 py-7"
            style={{
              background: "#FFFFFF",
              boxShadow:
                "0px 15px 6px rgba(0, 0, 0, 0.01), 0px 4px 4px rgba(0, 0, 0, 0.09), 0px 1px 2px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <motion.div
                    className="flex gap-2 items-center"
                    variants={sectionVariants}
                  >
                    <span className=" font-medium text-2xl">
                      {activeTab === "monthly" ? "Pay Monthly" : "Pay Yearly"}
                    </span>{" "}
                    <span className="text-xs border-2 border-primary py-0.5 mt-0.5 px-1.5 rounded-lg">
                      {activeTab === "monthly" ? "$0 / month" : "$96 / year"}
                    </span>
                  </motion.div>
                  <motion.div
                    style={{ lineHeight: "120%" }}
                    className="text-lg mt-3"
                    variants={sectionVariants}
                  >
                    {activeTab === "monthly"
                      ? "Perfect for exploring ASCII Studio, creating your first pieces, and getting a feel for what’s possible with text-based art."
                      : "Best for power users and creative professionals who want unlimited access, premium features, and the best value for their investment."}
                  </motion.div>
                  <motion.div
                    className="mt-6 flex flex-col gap-4"
                    variants={pointsContainerVariants}
                  >
                    {(activeTab === "monthly"
                      ? monthlyPoints
                      : yearlyPoints
                    ).map((point) => (
                      <motion.div
                        key={point}
                        className="flex gap-1.5"
                        variants={pointVariants}
                      >
                        <Check className="text-muted-foreground" />
                        <span className="text">{point}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div
            className="h-full"
            style={{
              background: "#FFFFFF",
              boxShadow:
                "0px 15px 6px rgba(0, 0, 0, 0.01), 0px 4px 4px rgba(0, 0, 0, 0.09), 0px 1px 2px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <div className="p-3 flex gap-3 flex-col h-full">
              <div
                className="h-full flex-1 border rounded-xl"
                style={{
                  background: "#F5F5F5",
                  boxShadow:
                    "0px 1px 0px rgba(255, 255, 255, 0.25), inset 0px 1px 2px rgba(0, 0, 0, 0.15)",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        delay: 0.38,
                        duration: 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.05, ease: "linear" },
                    }}
                  >
                    {activeTab === "monthly" ? (
                      <FireBall />
                    ) : (
                      <BlueFirePricing />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <Button
                className="w-full rounded-xl"
                variant="landingBlue"
                size="landing"
              >
                DM me on{" "}
                <svg
                  className="text-white"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 12.75L5.78227 7.71773M5.78227 7.71773L0.75 0.75H4.08333L7.71773 5.78227M5.78227 7.71773L9.41667 12.75H12.75L7.71773 5.78227M12.75 0.75L7.71773 5.78227"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
