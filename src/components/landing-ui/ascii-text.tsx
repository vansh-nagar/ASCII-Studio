"use client";

import ASCIIAnimation from "@/components/ascii-animation";

const frames = [
  "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n▓▓▓▓▓▓▓▓▒::▒▓▓▓▓▓▓▓▓░:...::▒▓▓▓▓▓▓▒░:...:░▓▓▓▓▓░:▒▓▓▓::▓▓▓▓▓\n▓▓▓▓▓▓▓▒.::.▒▓▓▓▓▓▒.:▓▓▓▓▓▒.:▓▓▓▒..▒▓▓▓▓▓░..▓▓▓: ▒▓▓▓.:▓▓▓▓▓\n▓▓▓▓▓▓▒..▓▓:.▒▓▓▓▓▒..░▓▓▓▓▓▓▓▓▓▒..▓▓▓▓▓▓▓▓▓▓▓▓▓: ▒▓▓▓.:▓▓▓▓▓\n▓▓▓▓▓▒..▓▓▓▒:.▒▓▓▓▓▓▒░░:.  :▒▓▓░.:▓▓▓▓▓▓▓▓▓▓▓▓▓: ▒▓▓▓.:▓▓▓▓▓\n▓▓▓▓▓:.........▒▓▓░░▓▓▓▓▓▓▓░.░▓▒..▓▓▓▓▓▓▓▓░:▒▓▓: ▒▓▓▓.:▓▓▓▓▓\n▓▓▓▓:.▒▓▓▓▓▓▓▒..▓▓░.:▒▓▓▓▓▒..▒▓▓▒..░▓▓▓▓▒: :▓▓▓: ▒▓▓▓.:▓▓▓▓▓\n▓▓▓▒░▒▓▓▓▓▓▓▓▓▒░░▓▓▓▒░::::░▓▓▓▓▓▓▓▓▒░:::░▒▓▓▓▓▓▒░▓▓▓▓░░▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
];

export default function AsciiText() {
  return (
    <div
      style={{
        width: "80vw",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      className=" absolute top-0"
    >
      <ASCIIAnimation
        className="w-full h-full"
        frames={frames}
        fps={30}
        chars={" .:░▒▓█"}
        fitToContainer={true}
        appearance={{
          backgroundColor: "transparent",
          borderRadius: 0,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: 8,
          fontWeight: "normal",
          fontStyle: "normal",
          letterSpacing: 0,
          lineHeight: 0.78,
          showFrameCounter: false,
          textColor: "#79A4FF",
          textEffect: "none",
          useColors: false,
          textEffectThreshold: 0,
        }}
      />
    </div>
  );
}
