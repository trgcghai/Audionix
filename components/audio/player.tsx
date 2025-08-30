"use client";
import { AudioControls } from "./elements/controls";
import { AudioFileInput } from "./elements/file-input";
import { AudioSeekBar } from "./elements/seek-bar";
import { AudioTrackInfo } from "./elements/track-info";
import { AudioVolume } from "./elements/volume";

export function AudioPlayer() {
  return (
    <section
      aria-label="Audio Player Container"
      className="flex flex-col border rounded-lg p-2 w-full bg-card gap-2"
    >
      <AudioFileInput />
      <AudioSeekBar className="mb-2" />
      <div className="flex items-center justify-between">
        <AudioTrackInfo />
        <AudioControls />
        <AudioVolume />
      </div>
    </section>
  );
}
