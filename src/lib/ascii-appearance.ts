export type ASCIITextEffect =
  | "none"
  | "matrix"
  | "glitch"
  | "neon"
  | "video"
  | "gradient"
  | "burn"
  | "neural";

export type ASCIIAppearance = {
  backgroundColor: string;
  borderRadius: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  fontStyle: "normal" | "italic";
  letterSpacing: number;
  lineHeight: number;
  showFrameCounter: boolean;
  textColor: string;
  textEffect: ASCIITextEffect;
  useColors: boolean;
  textEffectThreshold: number;
};

export const ASCII_FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export const DEFAULT_ASCII_APPEARANCE: ASCIIAppearance = {
  backgroundColor: "#ffffff",
  borderRadius: 8,
  fontFamily: ASCII_FONT_FAMILY,
  fontSize: 8,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  lineHeight: 0.78,
  showFrameCounter: true,
  textColor: "#79A4FF",
  textEffect: "none",
  useColors: false,
  textEffectThreshold: 0,
};

export const ASCII_FONT_PRESETS = [
  { id: "system", label: "System Mono", value: ASCII_FONT_FAMILY },
  {
    id: "geist",
    label: "Geist Mono",
    value: "var(--font-geist-mono), ui-monospace",
  },
  {
    id: "courier",
    label: "Courier New",
    value: '"Courier New", Courier, monospace',
  },
  {
    id: "lucida",
    label: "Lucida Mono",
    value: '"Lucida Console", "Lucida Sans Typewriter", monospace',
  },
  { id: "roboto", label: "Roboto Mono", value: '"Roboto Mono", monospace' },
  { id: "fira-code", label: "Fira Code", value: '"Fira Code", monospace' },
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    value: '"JetBrains Mono", monospace',
  },
  {
    id: "inconsolata",
    label: "Inconsolata",
    value: '"Inconsolata", monospace',
  },
  {
    id: "source-code-pro",
    label: "Source Code Pro",
    value: '"Source Code Pro", monospace',
  },
  {
    id: "ibm-plex-mono",
    label: "IBM Plex Mono",
    value: '"IBM Plex Mono", monospace',
  },
  { id: "space-mono", label: "Space Mono", value: '"Space Mono", monospace' },
  { id: "vt323", label: "VT323", value: '"VT323", monospace' },
  {
    id: "share-tech-mono",
    label: "Share Tech Mono",
    value: '"Share Tech Mono", monospace',
  },
  {
    id: "press-start-2p",
    label: "Press Start 2P",
    value: '"Press Start 2P", display',
  },
  { id: "audiowide", label: "Audiowide", value: '"Audiowide", display' },
  { id: "orbitron", label: "Orbitron", value: '"Orbitron", sans-serif' },
  { id: "syne", label: "Syne", value: '"Syne", sans-serif' },
  { id: "inter", label: "Inter", value: '"Inter", sans-serif' },
  { id: "outfit", label: "Outfit", value: '"Outfit", sans-serif' },
  { id: "montserrat", label: "Montserrat", value: '"Montserrat", sans-serif' },
  {
    id: "playfair",
    label: "Playfair Display",
    value: '"Playfair Display", serif',
  },
  { id: "cinzel", label: "Cinzel", value: '"Cinzel", serif' },
  {
    id: "courier-prime",
    label: "Courier Prime",
    value: '"Courier Prime", monospace',
  },
  {
    id: "anonymous-pro",
    label: "Anonymous Pro",
    value: '"Anonymous Pro", monospace',
  },
  {
    id: "cutive-mono",
    label: "Cutive Mono",
    value: '"Cutive Mono", monospace',
  },
  { id: "fira-mono", label: "Fira Mono", value: '"Fira Mono", monospace' },
  {
    id: "overpass-mono",
    label: "Overpass Mono",
    value: '"Overpass Mono", monospace',
  },
  {
    id: "saira-stencil",
    label: "Saira Stencil One",
    value: '"Saira Stencil One", display',
  },
  { id: "silkscreen", label: "Silkscreen", value: '"Silkscreen", display' },
  { id: "bebas-neue", label: "Bebas Neue", value: '"Bebas Neue", display' },
  { id: "dm-mono", label: "DM Mono", value: '"DM Mono", monospace' },
  {
    id: "ubuntu-mono",
    label: "Ubuntu Mono",
    value: '"Ubuntu Mono", monospace',
  },
  {
    id: "dotgothic16",
    label: "DotGothic16",
    value: '"DotGothic16", sans-serif',
  },
  {
    id: "chakra-petch",
    label: "Chakra Petch",
    value: '"Chakra Petch", sans-serif',
  },
  { id: "teko", label: "Teko", value: '"Teko", sans-serif' },
  { id: "anton", label: "Anton", value: '"Anton", sans-serif' },
  {
    id: "josefin-sans",
    label: "Josefin Sans",
    value: '"Josefin Sans", sans-serif',
  },
  { id: "poppins", label: "Poppins", value: '"Poppins", sans-serif' },
];

export const ASCII_CHAR_PRESETS = [
  {
    chars:
      " .'`^,:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    id: "default",
    label: "Standard",
  },
  {
    chars:
      " .'`^\\\",:;Il!i~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    id: "cinematic",
    label: "Cinematic",
  },
  {
    chars: " .:-=+*#%@",
    id: "terminal",
    label: "Retro Terminal",
  },
  {
    chars: "·•●⬤",
    id: "circle",
    label: "Minimal Circles",
  },
  {
    chars: " ▫▪◽◾■",
    id: "ui_density",
    label: "UI Density",
  },
  {
    chars: " .:░▒▓█",
    id: "matrix",
    label: "Matrix",
  },
  {
    chars: " ░▒▓█▇▆▅▄▃▂▁",
    id: "pixel",
    label: "Pixel Blocks",
  },
  {
    chars: " ⠁⠃⠇⠧⠷⠿",
    id: "braille",
    label: "Braille",
  },
  {
    chars: " .:-=|/\\\\#",
    id: "scanlines",
    label: "CRT Scanlines",
  },
  {
    chars: " .:-=+*#%&@$!?",
    id: "glitch",
    label: "Glitch",
  },
  {
    chars:
      " .'`^\\\",:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    id: "dense",
    label: "Ultra Dense",
  },
  {
    chars: " .oO@",
    id: "clean",
    label: "Clean Minimal",
  },
  {
    chars: " ·○◉●",
    id: "circles",
    label: "Circles",
  },
  {
    chars: " .:-=+*#%@$█▓▒░",
    id: "cyberpunk",
    label: "Cyberpunk",
  },
  {
    chars: " .:-=+*#%@",
    id: "simple",
    label: "Simple",
  },
  {
    chars: " ░▒▓█",
    id: "blocks",
    label: "Blocks",
  },
  {
    chars: " ·•●█",
    id: "dots",
    label: "Dots",
  },
  {
    chars: " ☆★✩✪✫✬✭✮✯✧✦✹✸✷✶✵❖✺",
    id: "stars",
    label: "Stars & Sparkles",
  },
  {
    chars: " ⇠←⇦⇢→⇨➜➝➤➔➙➟↑↓↗↘↙↖",
    id: "arrows",
    label: "Arrows",
  },
  {
    chars: " ◌○◍◉●□▢▣■⚡⌘⌥⌃⇧⏎⌫⌦❯❮",
    id: "tech_ui",
    label: "Tech / UI",
  },
  {
    chars: " ─│┌┐└┘├┤┬┴┼═║╔╗╚╝╠╣╦╩╬",
    id: "boxes",
    label: "Box Layout",
  },
  {
    chars: " ◦▫◇▹▻•▪◆◈▸►✧✦✷✸",
    id: "bullets",
    label: "Fancy Bullets",
  },
  {
    chars: " 𓆩𓆪𓂀𓆣𓃠𓁹",
    id: "aesthetic",
    label: "Aesthetic",
  },
  {
    chars:
      " ぁあぃいぅうぇえぉおかがきぎくぐけげcoごさざしじすずせぜそぞただちぢっつづてでtoなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん",
    id: "hiragana",
    label: "Hiragana",
  },
  {
    chars:
      " ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼそぞタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ",
    id: "katakana",
    label: "Katakana",
  },
  {
    chars: " <>{}[]()#/*=!",
    id: "developer",
    label: "Developer",
  },
  {
    chars: " .oO0@#",
    id: "minimal",
    label: "Minimal",
  },
  {
    chars: " .xoXO",
    id: "xo",
    label: "XO Pattern",
  },
  {
    chars: " .+xX#",
    id: "cross",
    label: "Cross Hatch",
  },
  {
    chars: " .-~+=*#",
    id: "waves",
    label: "Waves",
  },
  {
    chars: " .·°oO@",
    id: "bubbles",
    label: "Bubbles",
  },
  {
    chars: " .:!lI|",
    id: "vertical",
    label: "Vertical Lines",
  },
  {
    chars: " ._/-\\|",
    id: "slashes",
    label: "Slash Pattern",
  },
  {
    chars: " .^*#%",
    id: "spark",
    label: "Spark",
  },
  {
    chars: " .-:=+*oO#",
    id: "soft_gradient",
    label: "Soft Gradient",
  },
  {
    chars: " .+*xX#%@",
    id: "sharp_gradient",
    label: "Sharp Gradient",
  },
  {
    chars: " .<>oxOX",
    id: "geometry",
    label: "Geometry",
  },
  {
    chars: " .□■▢▣",
    id: "squares",
    label: "Squares",
  },
  {
    chars: " .◇◆◈",
    id: "diamonds",
    label: "Diamonds",
  },
  {
    chars: " .○◔◑◕●",
    id: "circle_gradient",
    label: "Circle Gradient",
  },
  {
    chars: " .✦✧✶✷✸",
    id: "sparkles",
    label: "Sparkles",
  },
  {
    chars: " .01",
    id: "binary",
    label: "Binary",
  },
  {
    chars: " .abcdefghijklmnopqrstuvwxyz",
    id: "alphabet",
    label: "Alphabet",
  },
  {
    chars: " .ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    id: "caps",
    label: "Caps",
  },
  {
    chars: " .0123456789",
    id: "numbers",
    label: "Numbers",
  },
];

export function mergeASCIIAppearance(
  appearance?: Partial<ASCIIAppearance>,
): ASCIIAppearance {
  return {
    ...DEFAULT_ASCII_APPEARANCE,
    ...appearance,
  };
}

export function getASCIITextShadow(
  _textColor: string,
  _glowIntensity?: number,
) {
  void _textColor;
  void _glowIntensity;
  return undefined;
}

export function hexToRgba(hexColor: string, alpha: number) {
  const hex = hexColor.replace("#", "").trim();

  if (!(hex.length === 3 || hex.length === 6)) {
    return `rgba(255,255,255,${alpha})`;
  }

  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((value) => value + value)
          .join("")
      : hex;

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}
