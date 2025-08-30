"use client";

import SeekBar from "@/app/(main)/components/player/SeekBar";
import { Volume } from "@/app/enums";
import TrackInfo from "@/components/common/TrackInfo";
import { useAppDispatch } from "@/hooks/redux";
import { usePlayer } from "@/hooks/usePlayer";
import { playNext, useQueueDrawer } from "@/store/slices/queueDrawerSlice";
import { useEffect, useRef, useState } from "react";
import MediaControl from "./MediaControl";
import RightControl from "./RightControl";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, loopMode } = useQueueDrawer();
  const { currentTrack, hasOneItem } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioRef.current && currentTrack && currentTrack.file.url) {
      // Set default volume and track info
      audioRef.current.volume = Volume.DEFAULT;
      audioRef.current.src = currentTrack.file.url;

      // if the status is already playing, play the track immediately
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // Handle play/pause status separately
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
        // NOT reset currentTime = 0 here
      }
    }
  }, [isPlaying, currentTrack]);

  // Update currentTime state on time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle audio ended event
  const handleEnded = () => {
    if (audioRef.current) {
      // check if replay is needed (need to replay when the loop mode is "one" or "all" with one item)
      const isPlayAgainNeeded =
        loopMode === "one" || (loopMode === "all" && hasOneItem);

      // If need to replay the audio, reset currentTime of audioRef
      if (isPlayAgainNeeded) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Error replaying audio:", error);
        });
      } else {
        dispatch(playNext());
      }
    }
  };

  return (
    <div className="bg-background border-t px-6 py-2">
      <SeekBar audioRef={audioRef} currentTime={currentTime} />

      <div className="flex items-center justify-between mt-2">
        <div className="flex w-1/4 items-center gap-3">
          <TrackInfo track={currentTrack} />
        </div>

        <MediaControl audioRef={audioRef} />

        <RightControl audioRef={audioRef} />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source
          src={currentTrack?.file.url}
          type={currentTrack?.file.mimetype}
        />
      </audio>
    </div>
  );
};

export default Player;
