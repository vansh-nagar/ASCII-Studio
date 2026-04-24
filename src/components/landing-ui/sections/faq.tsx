import { CustomAccordion } from "@/components/custom-accordion";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import React from "react";

type FAQItem = {
  id: string;
  number: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    number: "01",
    question: "What formats are the icons available in?",
    answer:
      "All Rune Icons are available as optimized SVGs, React components, and Vue components. Each icon is tree-shakeable and can be imported individually to keep your bundle size minimal.",
  },
  {
    id: "item-2",
    number: "02",
    question: "Can I customize the icon size and color?",
    answer:
      "Absolutely! Every Rune Icon supports custom sizing, stroke width, and color via props or CSS. They inherit currentColor by default, so they naturally adapt to your design system.",
  },
  {
    id: "item-3",
    number: "03",
    question: "Is Rune Icons free to use commercially?",
    answer:
      "Yes! Rune Icons is open-source and licensed under the MIT License. You can use them in personal, commercial, and client projects without any attribution required.",
  },
  {
    id: "item-4",
    number: "04",
    question: "How do I request a new icon?",
    answer:
      "You can submit icon requests through our GitHub repository by opening an issue. Our team reviews requests weekly and we prioritize icons based on community votes and demand.",
  },
];

const Faq = () => {
  // No need for selectedFaq or style logic with custom accordion

  return (
    <div className="flex justify-center items-center">
      <div className="landing-content-width flex flex-col md:flex-row justify-center items-start gap-8 md:gap-14">
        <div>
          <div className=" flex flex-col gap-8">
            <div className="text-2xl md:text-4xl">
              Frequently asked <br /> questions
            </div>
            <svg
              className="w-full"
              height="3"
              viewBox="0 0 334 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <line y1="0.5" x2="333.115" y2="0.5" stroke="#DADADA" />
              <line y1="1.63086" x2="333.115" y2="1.63086" stroke="white" />
            </svg>

            <div>
              Can’t find the answer you’re looking for? I’m here to help.
            </div>
          </div>
          <Button className="mt-4" variant="landingBlue" size="landing">
            DM me on <MessageCircleMore />
          </Button>
        </div>
        <div className="flex-1 w-full">
          <CustomAccordion
            items={faqItems.map((item) => ({
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;
