"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface CustomAccordionProps {
  items: { title: string; content: React.ReactNode }[];
}

export const CustomAccordion: React.FC<CustomAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {items.map((item, idx) => (
        <div key={item.title} className="mb-3 last:mb-0">
          <AccordionItem
            title={item.title}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.content}
          </AccordionItem>
        </div>
      ))}
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  onClick,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Styles for selected (open) FAQ
  const selectedFaqStyle: React.CSSProperties = {
    background:
      "radial-gradient(152.32% 683.53% at 108.86% 152.32%, #6395FF 0%, #F3F7FF 100%)",
    boxShadow:
      "0px 46px 18px rgba(0, 0, 0, 0.01), 0px 26px 15px rgba(0, 0, 0, 0.05), 0px 11px 11px rgba(0, 0, 0, 0.09), 0px 3px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    position: "relative",
    zIndex: 1,
  };

  // Styles for non-selected (closed) FAQ
  const defaultFaqStyle: React.CSSProperties = {
    background: "#FFFFFF",
    boxShadow:
      "0px 4px 1px rgba(0, 0, 0, 0.01), 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 2px 2.2px #FFFFFF",
    borderRadius: "16px",
  };

  return (
    <div
      className=" relative overflow-hidden px-5 py-1 transition-all duration-200 ease-out"
      style={isOpen ? selectedFaqStyle : defaultFaqStyle}
    >
      {isOpen && (
        <img
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-250 ease-out"
          src="/textures/box.png"
          alt=""
          aria-hidden="true"
          style={{
            borderRadius: "24px",
            opacity: 0.2,
            zIndex: 0,
          }}
        />
      )}
      <button
        className="w-full flex justify-between items-center py-4 text-sm font-medium text-left transition-colors relative z-10 cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="relative w-6 h-6 flex items-center justify-center">
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <path
              d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
              fill="#F5F5F5"
            />
            <motion.path
              d="M16.0833 11.416C16.4054 11.416 16.6666 11.6772 16.6666 11.9993C16.6666 12.3215 16.4054 12.5827 16.0833 12.5827H7.91659C7.59442 12.5827 7.33325 12.3215 7.33325 11.9993C7.33325 11.6772 7.59442 11.416 7.91659 11.416H16.0833Z"
              initial={false}
              animate={{ fill: isOpen ? "#7EA7FF" : "#000000" }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            />
            <motion.path
              d="M11.4167 16.084V7.91732C11.4167 7.59515 11.6779 7.33398 12.0001 7.33398C12.3222 7.33398 12.5834 7.59515 12.5834 7.91732V16.084C12.5834 16.4062 12.3222 16.6673 12.0001 16.6673C11.6779 16.6673 11.4167 16.4062 11.4167 16.084Z"
              initial={false}
              animate={{
                opacity: isOpen ? 0 : 1,
                fill: isOpen ? "#7EA7FF" : "#000000",
              }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            />
          </motion.svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height,opacity] duration-[220ms] ease-out relative z-10"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-4 pt-0 text-sm">{children}</div>
      </div>
    </div>
  );
};
