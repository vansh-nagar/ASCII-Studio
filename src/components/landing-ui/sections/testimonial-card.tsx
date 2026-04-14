import { ArrowUpRight } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type TestimonialCardProps = {
  name: string;
  role: string;
  avatarSrc: string;
  content: string;
  className?: string;
};

const TestimonialCard = ({
  name,
  role,
  avatarSrc,
  content,
  className,
}: TestimonialCardProps) => {
  const [isCardHovered, setIsCardHovered] = React.useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = React.useState(false);

  const fastSpring = {
    type: "spring",
    stiffness: 760,
    damping: 20,
    mass: 0.32,
  } as const;

  return (
    <div
      className={`relative p-5 w-full flex flex-col gap-5 justify-between items-center ${className ?? ""}`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{
        background:
          "radial-gradient(152.32% 683.53% at 108.86% 152.32%, #6395FF 0%, #F3F7FF 100%)",
        boxShadow:
          "0px 46px 18px rgba(0, 0, 0, 0.01), 0px 26px 15px rgba(0, 0, 0, 0.05), 0px 11px 11px rgba(0, 0, 0, 0.09), 0px 3px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "24px",
      }}
    >
      <motion.svg
        className="absolute -top-10 -right-6"
        width="30"
        height="49"
        viewBox="0 0 30 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={false}
      >
        <motion.path
          d="M15.6581 0.435235C16.1833 -0.330189 17.3774 -0.0291073 17.4769 0.893855L18.442 9.84602C18.4733 10.1362 18.6298 10.3982 18.8705 10.5634L26.2946 15.658C27.06 16.1832 26.7589 17.3772 25.836 17.4767L16.8838 18.4419C16.5936 18.4732 16.3316 18.6297 16.1665 18.8703L11.0719 26.2945C10.5466 27.0599 9.3526 26.7588 9.25309 25.8359L8.28792 16.8837C8.25664 16.5935 8.10014 16.3315 7.8595 16.1663L0.435363 11.0717C-0.330061 10.5465 -0.0289796 9.35247 0.893983 9.25297L9.84615 8.2878C10.1363 8.25651 10.3984 8.10002 10.5635 7.85937L15.6581 0.435235Z"
          fill="#79A4FF"
          initial={{ opacity: 0, scale: 0.3, x: -8, y: 8 }}
          animate={
            isCardHovered
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : { opacity: 0, scale: 0.3, x: -8, y: 8 }
          }
          transition={{ ...fastSpring, delay: 0.02 }}
          style={{ transformOrigin: "16px 14px" }}
        />
        <motion.path
          d="M22.1752 29.3784C22.4379 28.9957 23.0349 29.1462 23.0846 29.6077L23.831 36.5305C23.8466 36.6755 23.9249 36.8066 24.0452 36.8891L29.7863 40.8288C30.169 41.0914 30.0185 41.6884 29.557 41.7382L22.6343 42.4845C22.4892 42.5002 22.3582 42.5784 22.2756 42.6988L18.3359 48.4399C18.0733 48.8226 17.4763 48.672 17.4265 48.2106L16.6802 41.2878C16.6645 41.1427 16.5863 41.0117 16.466 40.9292L10.7249 36.9895C10.3421 36.7269 10.4927 36.1298 10.9542 36.0801L17.8769 35.3337C18.022 35.3181 18.153 35.2398 18.2356 35.1195L22.1752 29.3784Z"
          fill="#79A4FF"
          initial={{ opacity: 0, scale: 0.3, x: 8, y: 8 }}
          animate={
            isCardHovered
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : { opacity: 0, scale: 0.3, x: 8, y: 8 }
          }
          transition={{ ...fastSpring, delay: 0.06 }}
          style={{ transformOrigin: "22px 39px" }}
        />
      </motion.svg>

      <img
        className="pointer-events-none opacity-20 absolute inset-0 h-full w-full object-cover"
        src="/textures/box.png"
        alt=""
        aria-hidden="true"
      />

      <div className="relative z-10 flex justify-between w-full items-center">
        <div className="flex items-center gap-4 text-left flex-1">
          <img
            className="h-14 aspect-square object-cover rounded-full"
            src={avatarSrc}
            alt=""
          />
          <div>
            <div className="text-xl font-medium">{name}</div>
            <div className="text-xs font-medium text-muted-foreground">
              {role}
            </div>
          </div>
        </div>

        <motion.button
          type="button"
          className="flex h-9 items-center justify-center gap-1 rounded-full px-1"
          onHoverStart={() => setIsTwitterHovered(true)}
          onHoverEnd={() => setIsTwitterHovered(false)}
          aria-label="Open Twitter"
        >
          <div className="flex h-4 w-4 items-center cursor-pointer justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {isTwitterHovered ? (
                <motion.div
                  key="twitter-1"
                  initial={{
                    filter: "blur(1px)",
                    opacity: 0,
                    rotate: -45,
                  }}
                  animate={{ filter: "blur(0px)", opacity: 1, rotate: 0 }}
                  exit={{ filter: "blur(1px)", opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.1 }}
                >
                  <svg
                    width="20"
                    height="20"
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
                </motion.div>
              ) : (
                <motion.div
                  key="arrow-2"
                  initial={{
                    filter: "blur(1px)",
                    opacity: 0,
                    rotate: -45,
                  }}
                  animate={{ filter: "blur(0px)", opacity: 1, rotate: 0 }}
                  exit={{ filter: "blur(1px)", opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.1 }}
                >
                  <ArrowUpRight strokeWidth={1.8} size={35} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      <div
        className="relative z-10 text-left text-sm"
        style={{ lineHeight: "150%" }}
      >
        {content}
      </div>
    </div>
  );
};

export default TestimonialCard;
