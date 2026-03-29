import { type ReactNode, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Cd from "../ascii/cd";
import HandFire from "../ascii/hand-fire";
import Pitstop from "../ascii/pitstop";
import RainbowFire from "../ascii/rainbow-fire";
import RedFire from "../ascii/red-fire";
import Star from "../ascii/star";
import CopyDropdown from "./copy-drop-down";
import { useSearch } from "./search-context";
import Lightning from "../ascii/lightning";
import Skull from "../ascii/skull";
import Balls from "../ascii/balls";

type AnimationCard = {
  name: string;
  description: string;
  registryName: string;
  landscape: boolean;
};

type AnimationItem = AnimationCard & {
  render: () => ReactNode;
};

type SpecialEffectItem = AnimationCard & {
  render: (isPlaying: boolean) => ReactNode;
};

const asciiAnimations: AnimationItem[] = [
  {
    name: "Lightning",
    description: "ASCII animation of a Formula 1 pitstop with cars and crew.",
    render: () => <Lightning />,
    registryName: "lightning",
    landscape: false,
  },
  {
    name: "Skull",
    description: "ASCII animation of a skull.",
    render: () => <Skull />,
    registryName: "skull",
    landscape: false,
  },
  {
    name: "Pitstop",
    description: "ASCII animation of a Formula 1 pitstop with cars and crew.",
    render: () => <Pitstop />,
    registryName: "pitstop",
    landscape: true,
  },
  {
    name: "Red Fire",
    description: "ASCII flame animation in a red terminal style.",
    render: () => <RedFire />,
    registryName: "red-fire",
    landscape: false,
  },
  {
    name: "CD Animation",
    description: "ASCII animation of a CD spinning.",
    render: () => <Cd />,
    registryName: "cd",
    landscape: false,
  },
];

const specialEffects: SpecialEffectItem[] = [
  {
    name: "Balls",
    description: "ASCII animation of bouncing balls.",
    render: (isPlaying) => <Balls isPlaying={isPlaying} />,
    registryName: "balls",
    landscape: true,
  },
  {
    name: "Star",
    description: "ASCII animation of a star.",
    render: (isPlaying) => <Star isPlaying={isPlaying} />,
    registryName: "star-animation",
    landscape: false,
  },
  {
    name: "Rainbow Fire",
    description: "ASCII rainbow fire animation.",
    render: (isPlaying) => <RainbowFire isPlaying={isPlaying} />,
    registryName: "rainbow-fire",
    landscape: false,
  },
  {
    name: "Hand Fire",
    description: "ASCII animation of a hand holding fire/flame.",
    render: (isPlaying) => <HandFire isPlaying={isPlaying} />,
    registryName: "hand-fire",
    landscape: true,
  },
];

export default function AsciiAnimationsTabs() {
  const [hoveredSpecial, setHoveredSpecial] = useState<string | null>(null);
  const { query } = useSearch();
  const normalizedQuery = query.trim().toLowerCase();

  const filterList = <T extends AnimationCard>(list: T[]) =>
    list.filter((item) => {
      if (!normalizedQuery) return true;
      return (
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.registryName.toLowerCase().includes(normalizedQuery)
      );
    });

  const filteredAnimations = filterList(asciiAnimations);
  const filteredSpecial = filterList(specialEffects);

  return (
    <Tabs defaultValue="regular" className="w-full ">
      <div className="flex justify-center">
        <TabsList className="flex rounded-full gap-4 overflow-x-auto w-[95vw] sm:w-[70vw] overflow-y-hidden dark:bg-black">
          <TabsTrigger
            value="regular"
            className="z-50 cursor-pointer group text-xs rounded-full"
          >
            Regular Ascci
          </TabsTrigger>
          <TabsTrigger
            value="special"
            className="z-50 cursor-pointer group text-xs rounded-full"
          >
            Special Ascci (hover to play)
          </TabsTrigger>
        </TabsList>{" "}
      </div>

      <TabsContent value="regular">
        <div className="grid grid-cols-1 pb-3 sm:grid-cols-2 gap-2 w-[95vw] sm:w-[70vw] mx-auto">
          {filteredAnimations.length === 0 && (
            <div className="text-center text-muted-foreground col-span-full">
              No results found.
            </div>
          )}
          {filteredAnimations.map((item, index) => (
            <div
              key={index}
              className={`relative border rounded-3xl aspect-square flex items-center justify-center overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${item.landscape ? "sm:col-span-2" : ""}`}
            >
              <div className="z-30">{item.render()}</div>
              <div className="leading-1 absolute left-4 bottom-4">
                <p className="text-xs font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className=" absolute top-2 right-2">
                <CopyDropdown registryName={item.registryName} />
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="special">
        <div className="grid grid-cols-1 pb-3 sm:grid-cols-2 gap-2 w-[95vw] sm:w-[70vw] mx-auto">
          {filteredSpecial.length === 0 && (
            <div className="text-center text-muted-foreground col-span-full">
              No results found.
            </div>
          )}
          {filteredSpecial.map((item, index) => (
            <div
              key={index}
              className={`relative border rounded-3xl aspect-square flex items-center justify-center overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${item.landscape ? "sm:col-span-2" : ""}`}
              onMouseEnter={() => setHoveredSpecial(item.registryName)}
              onMouseLeave={() =>
                setHoveredSpecial((current) =>
                  current === item.registryName ? null : current,
                )
              }
            >
              <div className="z-30">
                {item.render(hoveredSpecial === item.registryName)}
              </div>
              <div className="leading-1 absolute left-4 bottom-4">
                <p className="text-xs font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className=" absolute top-2 right-2">
                <CopyDropdown registryName={item.registryName} />
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
