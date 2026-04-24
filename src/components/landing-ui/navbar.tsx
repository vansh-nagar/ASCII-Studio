"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const starSvg = (
    <svg
      className="absolute top-0 right-0 z-0 opacity-0 group-hover/star:opacity-100 group-hover/star:-translate-y-8 rotate-12 transition-all duration-300"
      width="40"
      height="40"
      viewBox="0 0 60 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6063 3.69575C26.2235 -1.23192 33.2845 -1.23191 35.9016 3.69575L40.7423 12.8097C41.3204 13.8983 42.3681 14.6595 43.5821 14.873L53.7464 16.6606C59.2413 17.6273 61.423 24.3418 57.5455 28.3535L50.3735 35.7735C49.5169 36.6597 49.1167 37.8913 49.2887 39.1117L50.7291 49.3312C51.5081 54.856 45.7961 59.0062 40.7824 56.558L31.5092 52.0296C30.4016 51.4887 29.1064 51.4887 27.9988 52.0296L18.7256 56.558C13.7119 59.0062 7.9999 54.856 8.77886 49.3312L10.2193 39.1117C10.3913 37.8913 9.9911 36.6597 9.13451 35.7735L1.96248 28.3535C-1.91505 24.3418 0.266688 17.6273 5.76154 16.6606L15.9259 14.873C17.1398 14.6595 18.1875 13.8983 18.7657 12.8097L23.6063 3.69575Z"
        fill="white"
      />
      <path
        d="M26.2213 4.82419C27.7252 1.99254 31.7826 1.99254 33.2866 4.82419L38.9897 15.5622C39.5679 16.6508 40.6156 17.412 41.8296 17.6255L53.8044 19.7313C56.9623 20.2866 58.2161 24.1454 55.9877 26.4508L47.5377 35.1931C46.681 36.0793 46.2808 37.311 46.4529 38.5316L48.1506 50.571C48.5983 53.7459 45.3158 56.1308 42.4347 54.7239L31.509 49.3889C30.4015 48.8481 29.1064 48.8481 27.9988 49.3889L17.0732 54.7239C14.192 56.1308 10.9095 53.7459 11.3572 50.571L13.0549 38.5316C13.227 37.311 12.8268 36.0793 11.9702 35.1931L3.52007 26.4508C1.29175 24.1454 2.54556 20.2866 5.70337 19.7313L17.6782 17.6255C18.8922 17.412 19.9399 16.6508 20.5181 15.5622L26.2213 4.82419Z"
        fill="#FF9D00"
      />
      <path
        d="M20.6807 33.8859C24.0832 36.8475 31.7642 38.331 38.5054 33.8857"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="33.8863"
        cy="26.175"
        rx="2.36283"
        ry="3.02069"
        fill="white"
      />
      <ellipse
        cx="25.4693"
        cy="26.175"
        rx="2.36283"
        ry="3.02069"
        fill="white"
      />
    </svg>
  );

  return (
    <div className="landing-navbar-scroll fixed top-6 z-50">
      {/* Main navbar bar */}
      <div
        className={`flex justify-between items-center p-3 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-[#F2F6FF]/55 border-white/60 backdrop-blur-sm shadow-lg"
            : "bg-transparent border-transparent backdrop-blur-none shadow-none"
        }`}
      >
        <section className="flex justify-center items-center gap-x-6">
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 transition-all duration-300 hover:opacity-80"
          >
            <img
              src="/logo/logo.png"
              alt="Logo"
              className="object-cover w-10 h-10 lg:h-12 lg:w-12  aspect-square rounded-full"
              width={48}
              height={48}
            />
            <span className="text-base lg:text-xl whitespace-nowrap font-medium tracking-tight">
              Ascii Studio
            </span>
          </Link>
          <NavigationMenu className="z-50 hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4" asChild>
                  <Link
                    href="/pricing"
                    className="text-sm hover:text-black text-muted-foreground transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="px-4" asChild>
                  <Link
                    href="/showcase"
                    className="text-sm hover:text-black text-muted-foreground transition-colors duration-300"
                  >
                    Showcase
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </section>

        {/* Desktop buttons */}
        <section className="hidden lg:flex gap-2">
          <div className="relative group/star flex items-center justify-center">
            <Button className="z-10 relative" variant="landing" size="landing">
              Star On GitHub
            </Button>
            {starSvg}
          </div>
          <Button
            className="group relative overflow-hidden transition-[padding] duration-200 hover:pr-10"
            variant="landingBlue"
            size="landing"
          >
            Launch Studio
            <ChevronRight className="w-4 absolute right-4 -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
          </Button>
        </section>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg p-4 flex flex-col gap-1">
          <Link
            href="/studio"
            className="py-2.5 px-3 rounded-xl hover:bg-accent text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tools
          </Link>
          <Link
            href="/faq"
            className="py-2.5 px-3 rounded-xl hover:bg-accent text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQs
          </Link>
          <Link
            href="/pricing"
            className="py-2.5 px-3 rounded-xl hover:bg-accent text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/showcase"
            className="py-2.5 px-3 rounded-xl hover:bg-accent text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Showcase
          </Link>
          <div className="flex gap-2 pt-2 border-t border-border mt-1">
            <div className="relative group/star flex-1 flex items-center justify-center">
              <Button
                className="z-10 relative w-full"
                variant="landing"
                size="landing"
              >
                Star On GitHub
              </Button>
              {starSvg}
            </div>
            <Button
              className="flex-1 group relative overflow-hidden transition-[padding] duration-200 hover:pr-10"
              variant="landingBlue"
              size="landing"
            >
              Launch Studio
              <ChevronRight className="w-4 absolute right-4 -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
