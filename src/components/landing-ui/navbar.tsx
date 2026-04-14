"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart,
  ChevronRight,
  CodeIcon,
  FileText,
  GlobeIcon,
  Handshake,
  HelpCircle,
  LayersIcon,
  Leaf,
  PlugIcon,
  RotateCcw,
  Shield,
  Star,
  UserPlusIcon,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

const toolsLinks: LinkItem[] = [
  {
    title: "ASCII Studio",
    href: "/studio",
    icon: GlobeIcon,
    description: "Convert media into clean ASCII frames.",
  },
  {
    title: "ASCII Animation",
    href: "/ascii-animation",
    icon: LayersIcon,
    description: "Preview and export animated ASCII sequences.",
  },
  {
    title: "Team Collaboration",
    href: "/showcase",
    icon: UserPlusIcon,
    description: "Tools to help your teams work better together.",
  },
  {
    title: "Analytics",
    href: "/showcase",
    icon: BarChart,
    description: "Track and analyze your website traffic.",
  },
  {
    title: "Integrations",
    href: "/studio",
    icon: PlugIcon,
    description: "Connect your apps and services.",
  },
  {
    title: "API Routes",
    href: "/api/ascii",
    icon: CodeIcon,
    description: "Use server endpoints for conversion workflows.",
  },
];

const faqLinks: LinkItem[] = [
  {
    title: "About Us",
    href: "/faq",
    icon: Users,
    description: "Learn more about our story and team.",
  },
  {
    title: "Customer Stories",
    href: "/faq",
    icon: Star,
    description: "See how we have helped our clients succeed.",
  },
  {
    title: "Partnerships",
    href: "/faq",
    icon: Handshake,
    description: "Collaborate with us for mutual growth.",
  },
];

const faqLinks2: LinkItem[] = [
  {
    title: "Terms of Service",
    href: "/faq",
    icon: FileText,
    description: "",
  },
  {
    title: "Privacy Policy",
    href: "/faq",
    icon: Shield,
    description: "",
  },
  {
    title: "Refund Policy",
    href: "/faq",
    icon: RotateCcw,
    description: "",
  },
  {
    title: "Blog",
    href: "/showcase",
    icon: Leaf,
    description: "",
  },
  {
    title: "Help Center",
    href: "/faq",
    icon: HelpCircle,
    description: "",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`landing-navbar-scroll fixed top-6 flex justify-between items-center z-50 p-3 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-[#F2F6FF]/55 border-white/60 backdrop-blur-sm shadow-lg"
          : "bg-transparent border-transparent backdrop-blur-none shadow-none"
      }`}
    >
      <section className="flex justify-center items-center gap-x-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
        >
          <Image
            src="/logo/logo.png"
            alt="Logo"
            className="object-cover h-12 aspect-square rounded-full"
            width={48}
            height={48}
          />
          <span className="text-xl truncate font-medium tracking-tight">
            Ascii Studio
          </span>
        </Link>
        <NavigationMenu className="z-50">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm text-muted-foreground hover:text-black">
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-background p-1 pr-1.5">
                <ul className="bg-popover grid w-lg grid-cols-2 gap-2  rounded-2xl border p-2 shadow">
                  {toolsLinks.map((item, i) => (
                    <li key={i}>
                      <ListItem {...item} />
                    </li>
                  ))}
                </ul>
                <div className="p-2">
                  <p className="text-muted-foreground text-sm">
                    Need help?{" "}
                    <Link
                      href="/studio"
                      className="text-foreground font-medium hover:underline"
                    >
                      Open Studio
                    </Link>
                  </p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm text-muted-foreground hover:text-black">
                FAQs
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" p-1 pr-1.5 pb-1.5">
                <div className="grid w-lg grid-cols-2 gap-2">
                  <ul className="bg-popover space-y-2 rounded-2xl border p-2 shadow">
                    {faqLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 p-3">
                    {faqLinks2.map((item, i) => (
                      <li key={i}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                          >
                            <item.icon className="text-foreground size-4" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

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
      <section className="flex gap-2">
        {/* <Button variant="landing" size="landing">
          Follow On{" "}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 12.75L5.78227 7.71773M5.78227 7.71773L0.75 0.75H4.08333L7.71773 5.78227M5.78227 7.71773L9.41667 12.75H12.75L7.71773 5.78227M12.75 0.75L7.71773 5.78227"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button> */}
        <div className="relative group/star flex items-center justify-center">
          <Button className="z-10 relative" variant="landing" size="landing">
            Star On GitHub
          </Button>

          <svg
            className="absolute top-0 right-0  z-0 opacity-0 group-hover/star:opacity-100 group-hover/star:-translate-y-8 rotate-12 transition-all duration-300"
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
    </div>
  );
};

export default Navbar;

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        "w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2",
        className,
      )}
      {...props}
      asChild
    >
      <Link href={href} className="transition-colors">
        <div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm">
          <Icon className="text-foreground size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}
