"use client";

import RightControl from "./RightControl";
import MediaControl from "./MediaControl";
import TrackInfo from "@/components/common/TrackInfo";
import { mockTracks } from "@/app/sampleData";

const Player = () => {
  return (
    <div className="bg-background flex items-center justify-between border-t px-6 py-2">
      <div className="flex w-1/4 items-center gap-3">
        <TrackInfo />
      </div>

      <MediaControl track={mockTracks[0]} />

      <RightControl />
    </div>
  );
};

export default Player;
