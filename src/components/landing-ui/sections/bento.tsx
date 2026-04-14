"use client";
import { Atom, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ImagesBadgeDemoFour from "@/components/images-badge-demo-4";
import PortalMarqueeTransform from "@/components/portal-marquee-transform";
import MagnifiedBento from "@/components/magnified-bento";

const Bento = () => {
  return (
    <div className="flex flex-col text-center justify-center items-center">
      {" "}
      <div className="flex justify-center items-center gap-2 text-xs border-2 border-blue-light-active px-2 py-1 rounded-full ">
        <motion.span
          className="inline-flex"
          animate={{ rotate: [0, 90] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          <Atom size={16} />
        </motion.span>
        Key Features
      </div>
      <span className="text-5xl mt-2">
        Explore Our <br />
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
          Standout Features{" "}
        </span>
      </span>
      <div className="landing-content-width gap-4 mt-10 grid grid-rows-[8fr_6fr] h-[80vh] ">
        <div className=" grid grid-cols-2 gap-4 ">
          <div
            className=""
            style={{
              background:
                "radial-gradient(125.62% 138.22% at 1.66% 1.76%, #F3F7FF 0%, #6395FF 100%)",
              borderRadius: "16px",
            }}
          >
            <div
              className="flex justify-between flex-col h-full
            "
            >
              <div className=" h-full">
                <MagnifiedBento />
              </div>
              <div className="flex flex-col text-left items-start w-full">
                <span className="text-xl font-medium px-6">
                  Find the perfect characters{" "}
                </span>
                <span className="text-xs px-6 pb-6 font-medium text-muted-foreground">
                  Explore a curated collection and pick the best ASCII
                  characters for your design.
                </span>
              </div>
            </div>
          </div>
          <div
            className="relative p-6"
            style={{
              background:
                "radial-gradient(115.89% 115.89% at 106.5% -23.2%, #79A4FF 0%, #EAF1FF 100%)",
              borderRadius: "16px",
            }}
          >
            <div
              className="flex justify-between flex-col h-full
            "
            >
              <div className="h-full flex z-30 justify-center items-center">
                <ImagesBadgeDemoFour />
              </div>
              <div className="flex flex-col items-start text-left w-full">
                <span className="text-xl font-medium">Export with ease </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Export your ASCII creations instantly in clean, ready-to-use,
                  component, videos and more.
                </span>
              </div>
            </div>
            <img
              className="pointer-events-none opacity-20 z-0 absolute inset-0 h-full w-full object-cover"
              src="/textures/box.png"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
        <div className=" grid grid-cols-[1.1fr_0.9fr]  gap-4 ">
          <div
            className="relative"
            style={{
              background:
                "linear-gradient(to top, #AFC9FF 3.74%, #EAF1FF 82.46%)",
              borderRadius: "16px",
            }}
          >
            <div className="flex   flex-col h-full text-left items-start w-full">
              <span className="text-xl font-medium mt-6 px-6">
                Responsive ASCII output{" "}
              </span>
              <span className="text-xs font-medium text-muted-foreground px-6">
                Convert videos and images into dynamic ASCII visuals that adapt
                seamlessly across every screen.{" "}
              </span>{" "}
              <div className="h-full w-full z-30 flex justify-center items-center">
                <PortalMarqueeTransform className="h-full w-full" />
              </div>
            </div>{" "}
            <img
              className="pointer-events-none opacity-20 absolute inset-0 h-full w-full object-cover"
              src="/textures/box.png"
              alt=""
              aria-hidden="true"
            />
          </div>
          <div
            className="relative overflow-hidden p-6 flex justify-between flex-col"
            style={{
              background:
                "linear-gradient(to bottom right, #023CC4 1%, #82AAFF 100%)",
              borderRadius: "16px",
            }}
          >
            <div
              className="pointer-events-none opacity-20 z-0 absolute inset-0 bg-repeat"
              style={{
                backgroundImage: "url('/bento-pattern.png')",
                backgroundSize: "40px auto",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex justify-end gap-4">
              <div
                style={{
                  background:
                    "radial-gradient(115.89% 115.89% at 106.5% -23.2%, #79A4FF 0%, #EAF1FF 100%)",
                }}
                className="h-14 aspect-square w-14 rounded-full"
              ></div>
            </div>
            <div className="relative z-10 flex flex-col items-start w-full">
              <span className="text-3xl text-white">Create ASCII Now</span>
              <Link href={"/studio"}>
                <Button
                  className="group mt-2 relative overflow-hidden transition-[padding] duration-200 hover:pr-10"
                  variant="landing"
                  size="landing"
                >
                  Start Creating
                  <ChevronRight className="w-4 absolute right-4 -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bento;
