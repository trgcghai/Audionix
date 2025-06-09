"use client";

import { useMemo } from "react";
import { mockTracks } from "@/app/sampleData";
import TrackInfo from "../TrackInfo";
import RightControl from "./RightControl";
import MediaControl from "./MediaControl";

const Player = () => {
  const activeTrack = useMemo(() => mockTracks[0], []);

  return (
    <div className="py-2 px-6 border-t flex items-center justify-between bg-background">
      <div className="flex items-center gap-3 w-1/4">
        <TrackInfo track={activeTrack} />
      </div>

      <MediaControl track={activeTrack} />

      <RightControl />
    </div>
  );
};

export default Player;
