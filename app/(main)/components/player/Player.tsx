"use client";

import TrackInfo from "@/components/common/TrackInfo";
import { useAppDispatch } from "@/hooks/redux";
import { setIsPlaying, useQueueDrawer } from "@/store/slices/queueDrawerSlice";
import { useEffect, useRef } from "react";
import MediaControl from "./MediaControl";
import RightControl from "./RightControl";

const Player = () => {
  const { currentTrack, muted, volume, isPlaying } = useQueueDrawer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  // Handle audio events
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // Set initial volume
    const safeVolume =
      typeof volume === "number" && isFinite(volume) ? volume : 100;
    audioElement.volume = muted
      ? 0
      : Math.min(Math.max(safeVolume / 100, 0), 1);

    // Event handlers
    const handlePlay = () => dispatch(setIsPlaying(true));
    const handlePause = () => dispatch(setIsPlaying(false));
    const handleEnded = () => {
      // MediaControl will handle what happens next via Redux
    };

    // Add event listeners
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      // Clean up
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [dispatch, muted, volume]);

  // Handle track changes
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !currentTrack?.file?.url) return;

    // Audio will load but not play automatically when src changes
    if (isPlaying) {
      audioElement.play().catch((err) => {
        console.error("Failed to play:", err);
        dispatch(setIsPlaying(false));
      });
    }
  }, [currentTrack, isPlaying, dispatch]);

  // Handle play/pause state changes
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !currentTrack) return;

    if (isPlaying && audioElement.paused) {
      audioElement.play().catch((err) => {
        console.error("Failed to play:", err);
        dispatch(setIsPlaying(false));
      });
    } else if (!isPlaying && !audioElement.paused) {
      audioElement.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    const safeVolume =
      typeof volume === "number" && isFinite(volume) ? volume : 100;
    audioRef.current.volume = muted
      ? 0
      : Math.min(Math.max(safeVolume / 100, 0), 1);
  }, [volume, muted]);

  return (
    <div className="bg-background flex items-center justify-between border-t px-6 py-2">
      <div className="flex w-1/4 items-center gap-3">
        {currentTrack && <TrackInfo track={currentTrack} />}
      </div>

      <MediaControl audioRef={audioRef} />

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
