import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center pb-10 sm:pb-20">
      <div
        className="landing-content-width p-4 sm:p-8 flex flex-col gap-4 sm:gap-8"
        style={{
          background: "#FFFFFF",
          boxShadow:
            "0px 4px 1px rgba(0, 0, 0, 0.01), 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 2px 2.2px #FFFFFF",
          borderRadius: "20px",
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="text-xl sm:text-2xl md:text-4xl font-medium">
              Start creating ASCII
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">
              Turn your ideas into stunning ASCII art in seconds — no setup.
              Upload an image or start from text.
            </div>
          </div>
          <div className="flex flex-row sm:flex-col flex-wrap items-start sm:items-end gap-2">
            <Link href={"/studio"}>
              <Button
                className="group relative overflow-hidden transition-[padding] duration-200 hover:pr-10"
                variant="landingBlue"
                size="landing"
              >
                Launch Studio
                <ChevronRight className="w-4 absolute right-4 -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
              </Button>
            </Link>
            <div className="relative group/star flex items-center justify-center">
              <Button
                className="z-10 relative"
                variant="landing"
                size="landing"
              >
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
          </div>
        </div>
        <div
          className="p-4 sm:p-8 flex flex-col gap-3 sm:gap-4"
          style={{
            background: "#F5F5F5",
            border: "1px solid #E8E8E8",
            borderRadius: "12px",
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
          >
            <img
              src="/logo/logo.png"
              alt="Logo"
              className="object-cover  h-8 w-8 sm:h-12 lg:w-12 aspect-square rounded-full shrink-0"
              width={48}
              height={48}
            />
            <span className=" text-2xl whitespace-nowrap font-medium">
              Ascii Studio
            </span>
          </Link>
          <svg
            className="w-full my-2 sm:my-4"
            height="3"
            viewBox="0 0 834 3"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="834" y2="0.5" stroke="#DADADA" />
            <line y1="1.69531" x2="834" y2="1.69531" stroke="white" />
          </svg>
          <svg
            className="w-full h-auto"
            viewBox="0 0 822 107"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_di_569_467)">
              <path
                d="M49.9322 55.4801V38.8361H44.3841V22.1921H33.2881V38.8361H27.7402V55.4801H22.1922V61.0281H55.4802V55.4801H49.9322ZM0.000148803 105.412V88.7681H5.54815V72.1241H11.0961V55.4801H16.6441V38.8361H22.1922V22.1921H27.7402V11.0961H33.2881V0.000100255H44.3841V11.0961H49.9322V22.1921H55.4802V38.8361H61.0282V55.4801H66.5762V72.1241H72.1241V88.7681H77.6722V105.412H66.5762V88.7681H61.0282V72.1241H16.6441V88.7681H11.0961V105.412H0.000148803ZM87.3663 94.3161V83.2201H98.4623V88.7681H104.01V94.3161H137.298V77.6721H126.202V72.1241H104.01V66.5761H92.9143V55.4801H87.3663V44.3841H92.9143V33.2881H98.4623V27.7401H137.298V33.2881H142.846V38.8361H148.394V49.9321H137.298V38.8361H104.01V44.3841H98.4623V55.4801H104.01V61.0281H126.202V66.5761H142.846V72.1241H148.394V94.3161H142.846V99.8641H137.298V105.412H98.4623V99.8641H92.9143V94.3161H87.3663ZM163.599 94.3161V83.2201H158.051V49.9321H163.599V38.8361H169.147V33.2881H174.695V27.7401H207.983V33.2881H213.531V38.8361H219.079V44.3841H224.627V55.4801H213.531V49.9321H207.983V44.3841H202.435V38.8361H180.243V44.3841H174.695V49.9321H169.147V83.2201H174.695V88.7681H180.243V94.3161H202.435V88.7681H207.983V83.2201H213.531V77.6721H224.627V88.7681H219.079V94.3161H213.531V99.8641H207.983V105.412H174.695V99.8641H169.147V94.3161H163.599ZM250.94 16.6441V0.000100255H262.036V16.6441H250.94ZM234.296 105.412V94.3161H250.94V38.8361H234.296V27.7401H262.036V94.3161H278.68V105.412H234.296ZM304.943 16.6441V0.000100255H316.039V16.6441H304.943ZM288.299 105.412V94.3161H304.943V38.8361H288.299V27.7401H316.039V94.3161H332.683V105.412H288.299ZM407.401 99.8641V88.7681H401.853V72.1241H412.949V88.7681H418.497V94.3161H457.333V88.7681H462.881V66.5761H451.785V61.0281H435.141V55.4801H418.497V49.9321H407.401V44.3841H401.853V16.6441H407.401V5.54811H418.497V0.000100255H451.785V5.54811H462.881V11.0961H468.429V22.1921H473.977V33.2881H462.881V22.1921H457.333V16.6441H451.785V11.0961H418.497V16.6441H412.949V38.8361H418.497V44.3841H440.689V49.9321H457.333V55.4801H468.429V66.5761H473.977V88.7681H468.429V99.8641H457.333V105.412H418.497V99.8641H407.401ZM500.327 94.3161V38.8361H489.231V27.7401H500.327V11.0961H511.423V27.7401H533.615V38.8361H511.423V94.3161H533.615V105.412H511.423V99.8641H505.875V94.3161H500.327ZM548.782 94.3161V27.7401H559.878V88.7681H565.426V94.3161H587.618V99.8641H582.07V105.412H559.878V99.8641H554.33V94.3161H548.782ZM593.166 105.412V94.3161H587.618V88.7681H593.166V27.7401H604.262V105.412H593.166ZM669.411 94.3161V83.2201H674.959V49.9321H669.411V38.8361H674.959V0.000100255H686.055V105.412H674.959V94.3161H669.411ZM625.027 94.3161V83.2201H619.479V49.9321H625.027V38.8361H630.575V33.2881H636.123V27.7401H663.863V33.2881H669.411V38.8361H641.671V44.3841H636.123V49.9321H630.575V83.2201H636.123V88.7681H641.671V94.3161H669.411V99.8641H663.863V105.412H636.123V99.8641H630.575V94.3161H625.027ZM717.929 16.6441V0.000100255H729.025V16.6441H717.929ZM701.285 105.412V94.3161H717.929V38.8361H701.285V27.7401H729.025V94.3161H745.669V105.412H701.285ZM760.836 94.3161V83.2201H755.288V49.9321H760.836V38.8361H766.384V33.2881H771.932V27.7401H805.22V33.2881H810.768V38.8361H816.316V49.9321H821.864V83.2201H816.316V94.3161H810.768V99.8641H805.22V105.412H771.932V99.8641H766.384V94.3161H760.836ZM799.672 94.3161V88.7681H805.22V83.2201H810.768V49.9321H805.22V44.3841H799.672V38.8361H777.48V44.3841H771.932V49.9321H766.384V83.2201H771.932V88.7681H777.48V94.3161H799.672Z"
                fill="#79A4FF"
              />
            </g>
            <defs>
              <filter
                id="filter0_di_569_467"
                x="0"
                y="0"
                width="822.864"
                height="106.412"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_569_467"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_569_467"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_569_467"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Footer;
