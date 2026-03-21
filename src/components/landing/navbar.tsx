"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { StarsCount } from "./stars-count";
import { ModeToggle } from "./theme-toggle";

export default function Navbar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let previousScrollPos = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollDiff = Math.abs(currentScrollPos - previousScrollPos);
      
      // Only update if we've scrolled a decent amount (threshold of 5px) or are at the top
      if (currentScrollPos < 50) {
        setVisible(true);
        previousScrollPos = currentScrollPos;
      } else if (scrollDiff > 5) {
        if (previousScrollPos < currentScrollPos) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        previousScrollPos = currentScrollPos;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-6 flex justify-between gap-2 px-4 py-3 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[70vw] z-50 rounded-3xl bg-background/40 backdrop-blur-lg border transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
      }`}
    >
        {/* Logo left */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
          >
            <img
              src="/logo/logo.png"
              alt="Logo"
              className="object-cover h-10 aspect-square rounded-full"
            />
            <span className="text-xl truncate font-medium tracking-tight">
              Ascii Studio
            </span>
          </Link>
        </div>

        {/* Social buttons right */}
        <nav className="flex items-center gap-2 justify-end">
          <Link
            target="_blank"
            href={"https://github.com/vansh-nagar/ASCII-Studio"}
          >
            <Button variant="outline" className="text-xs border-red-500 dark:border-red-500">
              <Github className="w-6 h-6 " /> <StarsCount />
              /500{" "}
            </Button>
          </Link>
          <Link target="_blank" href={"https://x.com/vansh1029"}>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" />
              </svg>
            </Button>
          </Link>
          <ModeToggle />
        </nav>
    </header>
  );
}
