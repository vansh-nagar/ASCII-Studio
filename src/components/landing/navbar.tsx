"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { StarsCount } from "./stars-count";
import { ModeToggle } from "./theme-toggle";

import { useSearch } from "./search-context";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const { query, setQuery } = useSearch();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

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
      className={`fixed top-6 flex z-[200] justify-between gap-2 px-4 py-3 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[70vw] rounded-3xl bg-background/40 backdrop-blur-lg border transition-all duration-300 ease-in-out ${
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

      {/* Social buttons and search right */}
      <nav className="flex items-center gap-2 justify-end">
        {/* Search button/input */}

        <Link
          target="_blank"
          href={"https://github.com/vansh-nagar/ASCII-Studio"}
        >
          <Button
            variant="outline"
            className="text-xs border-red-500 dark:border-red-500"
          >
            <Github className="w-6 h-6 " /> <StarsCount />
          </Button>
        </Link>
        <div className="relative flex items-center max-sm:hidden  ">
          {!searchOpen ? (
            <Button
              variant="outline"
              size="icon"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
          ) : (
            <div className="flex items-center gap-2 transition-all">
              <Input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setSearchOpen(false)}
                placeholder="Search components by name..."
                style={{ minWidth: 0 }}
              />
            </div>
          )}
        </div>
        {/* <Link target="_blank" href={"https://x.com/vansh1029"}>
            <Button variant="outline" size="icon">
              <svg ... />
            </Button>
          </Link> */}
        <ModeToggle />
      </nav>
    </header>
  );
}
