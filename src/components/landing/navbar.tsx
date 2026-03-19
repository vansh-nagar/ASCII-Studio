"use client";

import React from "react";
import Link from "next/link";
import { Github, Search, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";

const navLinks = [
  { name: "Products", href: "#" },
  { name: "Playground", href: "#" },
  { name: "Studio", href: "/studio" },
  { name: "About me", href: "#" },
];

export default function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[70vw] z-50 rounded-3xl  bg-background/40 backdrop-blur-lg border-dashed border ">
      <div className="container flex w-full items-center px-4 py-3">
        {/* Logo left */}
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
          >
            <img
              src="/logo/logo.png"
              alt="Logo"
              className="object-cover h-10 aspect-square rounded-full"
            />
            <span className="text-xl font-medium tracking-tight text-slate-900">
              Ascii Studio
            </span>
          </Link>
        </div>

        {/* Social buttons right */}
        <nav className="flex flex-1 justify-end items-center gap-2 ">
          <ButtonGroup>
            <Button variant="outline">
              <Search />
            </Button>
            <Input placeholder="Search component..." className="w-40" />
          </ButtonGroup>
          {/* <ThemeToggle customClass={buttonStyles} /> */}
          <Button variant="outline" size="icon">
            <Github className="w-6 h-6 text-[#C5C5C5]" />
          </Button>
          <Button variant="outline" size="icon">
            <Twitter className="w-6 h-6 text-[#C5C5C5]" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
