"use client";

import { useMemo } from "react";
import { mockTracks } from "@/app/sampleData";
import TrackInfo from "../../../../components/common/TrackInfo";
import RightControl from "./RightControl";
import MediaControl from "./MediaControl";

const Player = () => {
  const activeTrack = useMemo(() => mockTracks[0], []);

  return (
    <div className="bg-background flex items-center justify-between border-t px-6 py-2">
      <div className="flex w-1/4 items-center gap-3">
        <TrackInfo track={activeTrack} />
      </div>

      <MediaControl track={activeTrack} />

      <RightControl />
    </div>
  );
};

export default Player;
