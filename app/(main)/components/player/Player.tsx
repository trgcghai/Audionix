"use client";

import TrackInfo from "@/components/common/TrackInfo";
import { useAudioPlayer } from "@/hooks/usePlayer";
import MediaControl from "./MediaControl";
import RightControl from "./RightControl";

const Player = () => {
  const { audioRef, currentTrack } = useAudioPlayer();

  return (
    <div className="bg-background flex items-center justify-between border-t px-6 py-2">
      <div className="flex w-1/4 items-center gap-3">
        {currentTrack && <TrackInfo track={currentTrack} />}
      </div>

      <MediaControl />

      <RightControl />

      <audio ref={audioRef}>
        <source
          src={currentTrack?.file.url}
          type={currentTrack?.file.mimetype}
        />
      </audio>
    </div>
  );
};

export default Player;
