"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import NumberFlow from "@number-flow/react";
import StudioUiPreview from "@/components/studio-ui-preview";
import TextYAnimation4 from "@/components/pixel-perfect/text-y-animation4";

const HeroSection = () => {
  const [starsCount, setStarsCount] = React.useState(0);
  const [isVideosHovered, setIsVideosHovered] = React.useState(false);
  const [isAsciiHovered, setIsAsciiHovered] = React.useState(false);
  const [isIntoHovered, setIsIntoHovered] = React.useState(false);
  const [isFramesHovered, setIsFramesHovered] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setStarsCount(500);
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  const fastSpring = {
    type: "spring",
    stiffness: 520,
    damping: 24,
    mass: 0.45,
  } as const;

  const imageSpring = {
    type: "spring",
    stiffness: 420,
    damping: 24,
    mass: 0.55,
  } as const;

  const getImageTransition = (delay: number) => ({
    ...imageSpring,
    delay: isVideosHovered ? delay : 0,
  });

  return (
    <>
      {" "}
      <section className="z-10 flex flex-col w-full items-center justify-center text-center mt-[23vh]">
        <div className="z-40 flex flex-col justify-center items-center">
          <motion.div
            layout
            transition={{ layout: { duration: 0.35, ease: "easeOut" } }}
            className="border border-white p-0.5 rounded-full inline-flex justify-center items-center bg-[radial-gradient(circle_at_center,_rgba(121,164,255,0.35)_0%,_rgba(121,164,255,0.1)_50%,_rgba(121,164,255,0)_80%)]"
          >
            <button
              type="button"
              className=" px-4 py-1.5 text-[10px] text-white"
              style={{
                background:
                  "linear-gradient(137.68deg, #79A4FF 22.55%, #79A4FF 86.49%)",
                backgroundBlendMode: "plus-lighter, normal",
                boxShadow:
                  "0px 42px 107px rgba(87, 177, 255, 0.34), 0px 24.7206px 32.2574px rgba(87, 177, 255, 0.1867), 0px 10.2677px 13.3981px rgba(87, 177, 255, 0.22), 0px 3.71362px 4.84582px rgba(87, 177, 255, 0.153301), inset 0px 1px 18px 2px #D2EAFF, inset 0px 1px 4px 2px #D2EAFF",
                borderRadius: "100px",
              }}
            >
              <NumberFlow value={starsCount} />+ Stars Before Launch
            </button>
          </motion.div>
          <div className="mt-6 text-7xl relative cursor-default">
            Turn{" "}
            <motion.span
              className="relative inline-block align-baseline"
              onHoverStart={() => setIsVideosHovered(true)}
              onHoverEnd={() => setIsVideosHovered(false)}
            >
              <span
                className={`transition-all duration-200 ${
                  isVideosHovered ? "text-[#5B86E0] " : "text-black"
                }`}
              >
                Videos
              </span>
            </motion.span>{" "}
            <span className=" relative inline-block align-baseline">
              <motion.span
                className="inline-block hover:text-[#5B86E0] transition-all duration-200"
                onHoverStart={() => setIsIntoHovered(true)}
                onHoverEnd={() => setIsIntoHovered(false)}
              >
                into
              </motion.span>{" "}
              <motion.svg
                className=" absolute top-6 -right-24 pointer-events-none"
                width="454"
                height="229"
                viewBox="0 0 454 229"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={false}
                animate={{ opacity: isIntoHovered ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.path
                  d="M209.891 44.2159C249.758 25.8845 340.493 0.220581 384.488 44.2159C439.482 99.2101 397.564 231.119 314.495 208.045C231.427 184.97 159.896 97.287 227.581 118.823C295.266 140.36 319.879 224.197 209.891 224.197C121.9 224.197 37.3445 172.92 6.06567 147.282M6.06567 147.282L13.7573 172.664M6.06567 147.282H34.5244"
                  stroke="#D5E3FF"
                  strokeWidth="9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.9 }}
                  animate={{ pathLength: isIntoHovered ? 1 : 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
                <motion.path
                  d="M209.891 37.9425C249.758 19.6111 340.493 -6.05286 384.488 37.9425C439.482 92.9367 397.564 224.846 314.495 201.771C231.427 178.697 159.896 91.0136 227.581 112.55C295.266 134.086 319.879 217.924 209.891 217.924C121.9 217.924 37.3445 166.647 6.06567 141.008M6.06567 141.008L13.7573 166.39M6.06567 141.008H34.5244"
                  stroke="#79A4FF"
                  strokeWidth="9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.9 }}
                  animate={{ pathLength: isIntoHovered ? 1 : 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.06 }}
                />
                <line
                  x1="237.376"
                  y1="116.746"
                  x2="192.858"
                  y2="101.26"
                  stroke="#D5E3FF"
                />
                <path d="M286.42 134.198L236.127 116.061" stroke="#D5E3FF" />
                <circle
                  cx="237.54"
                  cy="116.273"
                  r="2.26455"
                  transform="rotate(-8.53737 237.54 116.273)"
                  fill="#D5E3FF"
                  stroke="white"
                />
                <circle
                  cx="192.723"
                  cy="100.833"
                  r="2.26455"
                  transform="rotate(-8.53737 192.723 100.833)"
                  fill="white"
                  stroke="#D5E3FF"
                />
                <circle
                  cx="286.619"
                  cy="134.169"
                  r="2.26455"
                  transform="rotate(-8.53737 286.619 134.169)"
                  fill="white"
                  stroke="#D5E3FF"
                />
                <line
                  x1="390.988"
                  y1="45.1993"
                  x2="357.021"
                  y2="4.50933"
                  stroke="#D5E3FF"
                />
                <path d="M429.804 91.2344L391.372 44.8788" stroke="#D5E3FF" />
                <circle
                  cx="391.372"
                  cy="44.8791"
                  r="2.60881"
                  transform="rotate(22.4287 391.372 44.8791)"
                  fill="#D5E3FF"
                  stroke="white"
                />
                <circle
                  cx="357.091"
                  cy="4.05975"
                  r="2.60881"
                  transform="rotate(22.4287 357.091 4.05975)"
                  fill="white"
                  stroke="#D5E3FF"
                />
                <circle
                  cx="429.35"
                  cy="90.2424"
                  r="2.60881"
                  transform="rotate(22.4287 429.35 90.2424)"
                  fill="white"
                  stroke="#D5E3FF"
                />
                <motion.path
                  d="M411.562 29.0403C412.087 28.2749 413.281 28.576 413.381 29.499L413.709 32.5439C413.74 32.8341 413.897 33.0961 414.137 33.2612L416.663 34.9941C417.428 35.5193 417.127 36.7133 416.204 36.8129L413.159 37.1411C412.869 37.1724 412.607 37.3289 412.442 37.5696L410.709 40.0948C410.184 40.8602 408.99 40.5591 408.89 39.6361L408.562 36.5912C408.53 36.301 408.374 36.039 408.133 35.8739L405.608 34.141C404.843 33.6158 405.144 32.4218 406.067 32.3222L409.112 31.994C409.402 31.9627 409.664 31.8062 409.829 31.5655L411.562 29.0403Z"
                  fill="#79A4FF"
                  initial={{ opacity: 0, scale: 0.3, x: -10, y: 10 }}
                  animate={
                    isIntoHovered
                      ? { opacity: 1, scale: 1, x: 0, y: 0 }
                      : { opacity: 0, scale: 0.3, x: -10, y: 10 }
                  }
                  transition={{ ...fastSpring, delay: 0.3 }}
                  style={{ transformOrigin: "411px 34px" }}
                />
                <motion.path
                  d="M240.622 92.1614C241.148 91.396 242.342 91.6971 242.441 92.62L242.769 95.665C242.801 95.9552 242.957 96.2172 243.198 96.3823L245.723 98.1152C246.489 98.6404 246.187 99.8344 245.264 99.9339L242.22 100.262C241.929 100.294 241.667 100.45 241.502 100.691L239.769 103.216C239.244 103.981 238.05 103.68 237.951 102.757L237.622 99.7123C237.591 99.4221 237.434 99.1601 237.194 98.995L234.669 97.2621C233.903 96.7369 234.204 95.5428 235.127 95.4433L238.172 95.1151C238.462 95.0838 238.724 94.9273 238.89 94.6866L240.622 92.1614Z"
                  fill="#79A4FF"
                  initial={{ opacity: 0, scale: 0.3, x: 14, y: 8 }}
                  animate={
                    isIntoHovered
                      ? { opacity: 1, scale: 1, x: 0, y: 0 }
                      : { opacity: 0, scale: 0.3, x: 14, y: 8 }
                  }
                  transition={{ ...fastSpring, delay: 0.34 }}
                  style={{ transformOrigin: "241px 97px" }}
                />
                <motion.path
                  d="M415.27 43.3068C415.532 42.9241 416.129 43.0747 416.179 43.5361L416.478 46.3104C416.494 46.4555 416.572 46.5865 416.692 46.6691L418.993 48.2479C419.376 48.5106 419.225 49.1076 418.764 49.1573L415.99 49.4564C415.845 49.4721 415.714 49.5503 415.631 49.6706L414.052 51.9714C413.789 52.3541 413.192 52.2036 413.143 51.7421L412.844 48.9678C412.828 48.8227 412.75 48.6917 412.629 48.6091L410.329 47.0303C409.946 46.7677 410.096 46.1707 410.558 46.1209L413.332 45.8218C413.477 45.8062 413.608 45.7279 413.691 45.6076L415.27 43.3068Z"
                  fill="#79A4FF"
                  initial={{ opacity: 0, scale: 0.3, x: -10, y: 8 }}
                  animate={
                    isIntoHovered
                      ? { opacity: 1, scale: 1, x: 0, y: 0 }
                      : { opacity: 0, scale: 0.3, x: -10, y: 8 }
                  }
                  transition={{ ...fastSpring, delay: 0.38 }}
                  style={{ transformOrigin: "415px 47px" }}
                />
                <motion.path
                  d="M249.829 105.121C250.092 104.739 250.689 104.889 250.739 105.351L251.038 108.125C251.053 108.27 251.132 108.401 251.252 108.484L253.553 110.062C253.935 110.325 253.785 110.922 253.323 110.972L250.549 111.271C250.404 111.287 250.273 111.365 250.191 111.485L248.612 113.786C248.349 114.169 247.752 114.018 247.702 113.557L247.403 110.782C247.388 110.637 247.309 110.506 247.189 110.424L244.888 108.845C244.506 108.582 244.656 107.985 245.118 107.935L247.892 107.636C248.037 107.621 248.168 107.542 248.251 107.422L249.829 105.121Z"
                  fill="#79A4FF"
                  initial={{ opacity: 0, scale: 0.3, x: 12, y: 8 }}
                  animate={
                    isIntoHovered
                      ? { opacity: 1, scale: 1, x: 0, y: 0 }
                      : { opacity: 0, scale: 0.3, x: 12, y: 8 }
                  }
                  transition={{ ...fastSpring, delay: 0.42 }}
                  style={{ transformOrigin: "249px 109px" }}
                />
                <motion.path
                  d="M252.058 95.6064C252.32 95.2237 252.917 95.3742 252.967 95.8357L253.108 97.1381C253.123 97.2832 253.202 97.4142 253.322 97.4967L254.402 98.2379C254.785 98.5005 254.634 99.0976 254.173 99.1473L252.87 99.2877C252.725 99.3034 252.594 99.3816 252.512 99.5019L251.77 100.582C251.508 100.965 250.911 100.814 250.861 100.353L250.721 99.0503C250.705 98.9052 250.627 98.7742 250.506 98.6917L249.426 97.9505C249.044 97.6879 249.194 97.0908 249.656 97.0411L250.958 96.9007C251.103 96.885 251.234 96.8068 251.317 96.6865L252.058 95.6064Z"
                  fill="#79A4FF"
                  initial={{ opacity: 0, scale: 0.3, x: 10, y: 6 }}
                  animate={
                    isIntoHovered
                      ? { opacity: 1, scale: 1, x: 0, y: 0 }
                      : { opacity: 0, scale: 0.3, x: 10, y: 6 }
                  }
                  transition={{ ...fastSpring, delay: 0.46 }}
                  style={{ transformOrigin: "252px 98px" }}
                />
              </motion.svg>
            </span>
            <br />
            <motion.span
              className="relative inline-block align-baseline"
              onHoverStart={() => setIsAsciiHovered(true)}
              onHoverEnd={() => setIsAsciiHovered(false)}
            >
              <span
                className={`transition-all duration-200 inline-block ${
                  isAsciiHovered ? "text-[#5B86E0] " : "text-black"
                }`}
              >
                <TextYAnimation4
                  text="ASCII"
                  secondText="ASCII"
                  isActive={isAsciiHovered}
                  className="leading-none"
                  firstClassName="uppercase"
                  secondClassName=" font-semibold  tracking-wide  [font-family:var(--font-geist-pixel-grid)]"
                />
              </span>
            </motion.span>{" "}
            <span
              className="relative"
              onMouseEnter={() => setIsFramesHovered(true)}
              onMouseLeave={() => setIsFramesHovered(false)}
            >
              <span
                className={`transition-colors duration-200 ${
                  isFramesHovered ? "text-[#79A4FF]" : "text-inherit"
                }`}
              >
                Frames
              </span>
              <motion.svg
                className="absolute -inset-x-4 -top-1"
                viewBox="0 0 73 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: isFramesHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <rect
                  x="1.72412"
                  y="1.52441"
                  width="68.5209"
                  height="19.8916"
                  stroke="#79A4FF"
                />
                <circle
                  cx="69.9624"
                  cy="2.11865"
                  r="1.61865"
                  fill="white"
                  stroke="#79A4FF"
                />
                <circle
                  cx="69.9624"
                  cy="21.1675"
                  r="1.61865"
                  fill="white"
                  stroke="#79A4FF"
                />
                <circle
                  cx="2.11865"
                  cy="21.1675"
                  r="1.61865"
                  fill="white"
                  stroke="#79A4FF"
                />
                <circle
                  cx="2.11865"
                  cy="2.11865"
                  r="1.61865"
                  fill="white"
                  stroke="#79A4FF"
                />
              </motion.svg>
            </span>
            <motion.img
              className="h-14 absolute top-0 -left-16 rotate-6 rounded-xl aspect-square object-cover pointer-events-none"
              src="https://i.pinimg.com/736x/13/5d/6c/135d6c81b4b03da679355d6120375c6f.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, x: 64, y: 12 }}
              animate={
                isVideosHovered
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0.5, x: 64, y: 12 }
              }
              transition={getImageTransition(0)}
            />
            <motion.img
              className="h-14 absolute top-0 -right-16 -rotate-6 rounded-xl aspect-square object-cover pointer-events-none"
              src="https://i.pinimg.com/1200x/c1/a4/5e/c1a45ed0afc3859009b99ad91fbb0f45.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, x: -64, y: 12 }}
              animate={
                isVideosHovered
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0.5, x: -64, y: 12 }
              }
              transition={getImageTransition(0.02)}
            />
            <motion.img
              className="h-14 absolute bottom-0 -left-16 rotate-[30deg] rounded-xl aspect-square object-cover pointer-events-none"
              src="https://i.pinimg.com/736x/13/5d/6c/135d6c81b4b03da679355d6120375c6f.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, x: 64, y: -12 }}
              animate={
                isVideosHovered
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0.5, x: 64, y: -12 }
              }
              transition={getImageTransition(0.04)}
            />
            <motion.img
              className="h-14 absolute bottom-0 -right-16 -rotate-[30deg] rounded-xl aspect-square object-cover pointer-events-none"
              src="https://i.pinimg.com/1200x/c1/a4/5e/c1a45ed0afc3859009b99ad91fbb0f45.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, x: -64, y: -12 }}
              animate={
                isVideosHovered
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0.5, x: -64, y: -12 }
              }
              transition={getImageTransition(0.06)}
            />
            <motion.img
              className="h-14 absolute bottom-1/2 translate-y-1/2 -left-40 -rotate-[24deg] rounded-xl aspect-square object-cover pointer-events-none"
              src="https://i.pinimg.com/736x/13/5d/6c/135d6c81b4b03da679355d6120375c6f.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, x: 96, y: 25 }}
              animate={
                isVideosHovered
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0.5, x: 96, y: 25 }
              }
              transition={getImageTransition(0.08)}
            />
            <motion.img
              className="h-14 absolute bottom-1/2 translate-y-1/2 -right-40 rotate-[24deg] rounded-xl aspect-square object-cover pointer-events-none"
              src="https://i.pinimg.com/1200x/c1/a4/5e/c1a45ed0afc3859009b99ad91fbb0f45.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, x: -96, y: 25 }}
              animate={
                isVideosHovered
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0.5, x: -96, y: 25 }
              }
              transition={getImageTransition(0.1)}
            />
          </div>
          <div
            style={{
              lineHeight: "120%",
            }}
            className="text-xl mt-5"
          >
            Convert video into character-based frames <br /> that run smoothly
            in sequence.
          </div>
          <section className="flex gap-2 mt-8">
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
          </section>
        </div>
        <div className="mt-12 relative z-40">
          <StudioUiPreview />
        </div>
      </section>
      <Image
        className=" absolute z-0 -bottom-[17%] w-full h-full object-cover pointer-events-none"
        src="/png/landing-bg.png"
        alt=""
        width={1920}
        height={1080}
        priority
      />
      <div className="h-screen absolute top-0 w-full">
        {" "}
        {/* <div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 60%, transparent 90%)",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 90%)",
          }}
          className=" absolute -bottom-[12%] pointer-events-none"
        >
          <Fire />
        </div> */}
      </div>{" "}
    </>
  );
};

export default HeroSection;
