import React from "react";
import {
  Bold,
  Copy,
  FileCode2,
  Image as ImageIcon,
  Italic,
  RotateCcw,
  Search,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import BlueFire from "./blue-fire";

export default function StudioUiPreview() {
  return (
    <div
      className="mt-10 landing-content-width max-w-[1100px] border max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-3xl"
      style={{
        background: "#FFFFFF",
        border: "2px solid #F2F6FF",
        boxShadow: "0px 0px 0px 5px rgba(255, 255, 255, 0.6)",
      }}
    >
      <section className="w-full rounded-[32px] bg-white p-3 md:p-4">
        <div className="grid gap-3 lg:grid-cols-[230px_1fr]">
          <div className="space-y-3">
            <Panel title="Source Media">
              <button
                type="button"
                className="flex h-24 w-full items-center justify-center gap-2 rounded-md border border-dashed border-input bg-muted/40 text-xs text-muted-foreground"
              >
                <Upload className="h-3.5 w-3.5" />
                Drag and drop, click to upload
              </button>
              <div className="rounded-md border px-2 py-1.5 text-[10px] text-muted-foreground">
                demo-video.mp4 • 17.4 MB
              </div>
              <Button
                type="button"
                className="h-7 w-full text-[10px]"
                size="sm"
              >
                Convert to ASCII
              </Button>
            </Panel>

            <Panel title="Conversion">
              <div className="space-y-1">
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Quality
                </Label>
                <Select defaultValue="mid">
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Performance)</SelectItem>
                    <SelectItem value="mid">Mid (Balanced)</SelectItem>
                    <SelectItem value="high">High (Detail)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SliderField
                label="Columns"
                value={130}
                min={10}
                max={400}
                step={5}
              />
              <SliderField
                label="Threshold"
                value={30}
                min={0}
                max={200}
                step={5}
              />
              <div className="space-y-1">
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Charset
                </Label>
                <Input
                  className="h-7 font-mono text-[10px]"
                  value=" .,:;i1tfLCG08@"
                  readOnly
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="h-7 flex-1 text-[10px]"
                  size="sm"
                  variant="outline"
                >
                  Invert
                </Button>
                <Button
                  type="button"
                  className="h-7 text-[10px]"
                  size="sm"
                  variant="ghost"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </Panel>

            <Panel title="Appearance">
              <div className="space-y-1">
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Font Family
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  className="h-7 w-full justify-between px-3 text-xs font-normal"
                >
                  JetBrains Mono
                  <Search className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 flex-1 gap-1 text-[10px]"
                >
                  <Bold className="h-3 w-3" />
                  Bold
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 flex-1 gap-1 text-[10px]"
                >
                  <Italic className="h-3 w-3" />
                  Italic
                </Button>
              </div>
              <SliderField
                label="Font Size"
                value={10}
                min={0.5}
                max={24}
                step={0.1}
              />
              <SliderField
                label="Vertical Gap"
                value={0.95}
                min={0.6}
                max={1.6}
                step={0.01}
              />
              <SliderField
                label="Horizontal Gap"
                value={0.04}
                min={-0.5}
                max={1}
                step={0.01}
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex h-7 items-center gap-2 rounded-md border px-2 text-[10px]"
                >
                  <span className="size-3 rounded-sm bg-black" />
                  #000000
                </button>
                <button
                  type="button"
                  className="flex h-7 items-center gap-2 rounded-md border px-2 text-[10px]"
                >
                  <span className="size-3 rounded-sm bg-white border" />
                  #FFFFFF
                </button>
              </div>
            </Panel>

            <Panel title="Export">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Full React Component with Embedded ASCII Frames
              </Label>
              <textarea
                readOnly
                className="h-24 w-full rounded-md border bg-muted/20 p-2 font-mono text-[10px]"
                value={'<ASCIIAnimation frames={["..."]} />'}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 w-full gap-1 text-[10px]"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Full React Component
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-[10px]"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Image
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-[10px]"
                >
                  Video
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-[10px]"
                >
                  <FileCode2 className="h-3.5 w-3.5" />
                  Component
                </Button>
              </div>
            </Panel>
          </div>

          <div className="sticky top-3 md:top-4 h-fit">
            <div className="rounded-lg border">
              <div className="flex items-center justify-between border-b px-3 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Preview
                </span>
                <span className="text-[10px] text-muted-foreground">
                  240f · 130x72 (780x684px)
                </span>
              </div>

              <div className="overflow-auto p-3 ">
                <BlueFire />
              </div>

              <div className="border-t px-4 py-2 bg-muted/20">
                <div className="mb-1.5 flex items-center justify-between">
                  <Label className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    Timeline Scrubber
                  </Label>
                  <span className="text-[9px] tabular-nums font-mono text-muted-foreground">
                    00:12.4 / 00:34.8
                  </span>
                </div>
                <Slider defaultValue={[12.4]} max={34.8} min={0} step={0.1} />
              </div>

              <div className="grid grid-cols-3 border-t">
                <Stat label="Frames" value="240" />
                <Stat label="Grid" value="130x72" />
                <Stat label="Resolution" value="780x684px" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Panel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-lg border">
      <div className="border-b px-3 py-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="space-y-2 p-2.5">{children}</div>
    </div>
  );
}

function SliderField({
  label,
  max,
  min,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  step: number;
  value: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
        <span className="text-[10px] tabular-nums text-muted-foreground">
          {value}
        </span>
      </div>
      <Slider defaultValue={[value]} max={max} min={min} step={step} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      className="px-2 py-1.5 text-center hover:bg-muted/40 transition-colors"
    >
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-[11px] font-medium tabular-nums">{value}</div>
    </button>
  );
}
