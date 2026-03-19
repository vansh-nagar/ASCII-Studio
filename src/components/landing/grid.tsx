"use client";

import Cd from "../ascii/cd";
import RedFire from "../ascii/red fire";
import CopyDropdown from "./copy-drop-down";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {asciiAnimations.map((item, index) => (
        <div
          key={index}
          className="relative  border border-dashed aspect-square flex items-center justify-center overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="z-30">{item.component}</div>

          <div className="leading-1 absolute left-1.5 bottom-1.5">
            <p className="text-xs">{item.name}</p>
            <p className="text-[8px] text-muted-foreground">
              {item.description}
            </p>
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
