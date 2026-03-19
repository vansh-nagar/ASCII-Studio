"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Button } from "../ui/button";

const navLinks = [
  { name: "Products", href: "#" },
  { name: "Playground", href: "#" },
  { name: "Studio", href: "/studio" },
  { name: "About me", href: "#" },
];

export default function Navbar() {
  const buttonStyles =
    "w-10 h-10 bg-white border border-[#C5C5C5] rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.02),0px_2px_4px_rgba(0,0,0,0.08)] flex items-center justify-center p-0 hover:bg-slate-50 transition-all";

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[70vw] z-50 bg-white border border-[#C5C5C5] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.04),0px_4px_8px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all">
      <div className="container flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
          >
            <img
              src="/logo/logo.png"
              alt="Logo"
              className=" object-cover h-10 aspect-square rounded-full"
            />
            <span className="text-xl font-medium tracking-tight text-slate-900">
              Ascii Studio
            </span>
          </Link>

          <div className="hidden md:flex ml-1 items-center gap-0">
            <span className="text-primary font-mono text-sm opacity-50 mr-1 leading-1 tracking-tight ">
              //
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm text-[#757575] hover:text-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {/* <ThemeToggle customClass={buttonStyles} /> */}
          <Button variant="ghost" size="icon" className={buttonStyles}>
            <Github className="w-6 h-6 text-[#C5C5C5]" />
          </Button>
          <Button variant="ghost" size="icon" className={buttonStyles}>
            <Twitter className="w-6 h-6 text-[#C5C5C5]" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
