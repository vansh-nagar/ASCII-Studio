"use client";

import Cd from "../ascii/cd";
import RedFire from "../ascii/red fire";
import CopyDropdown from "./copy-drop-down";
import { useSearch } from "./search-context";

const asciiAnimations = [
  {
    name: "Red Fire",
    description: "ASCII flame animation in a red terminal style.",
    component: <RedFire />,
    registryName: "red-fire",
  },
  {
    name: "CD Animation",
    description: "ASCII animation of a CD spinning.",
    component: <Cd />,
    registryName: "cd",
  },
];

const AsciiAnimationsGrid = () => {
  const { query } = useSearch();
  const normalizedQuery = query.trim().toLowerCase();
  const filteredAnimations = asciiAnimations.filter((item) => {
    if (!normalizedQuery) return true;

    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.registryName.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[70vw] mx-auto">
      {filteredAnimations.map((item, index) => (
        <div
          key={index}
          className="relative  border border-dashed rounded-3xl aspect-square flex items-center justify-center overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="z-30">{item.component}</div>

          <div className="leading-1 absolute left-4 bottom-4">
            <p className="text-xs font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>

          <div className=" absolute top-2 right-2">
            <CopyDropdown registryName={item.registryName} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AsciiAnimationsGrid;
