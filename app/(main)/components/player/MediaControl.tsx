import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cn } from "@/libs/utils";
import {
  cycleLoopMode,
  playNext,
  playPrevious,
  setIsPlaying,
  toggleShuffle,
} from "@/store/slices/queueDrawerSlice";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useEffect, useState } from "react";

interface MediaControlProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MediaControl = ({ audioRef }: MediaControlProps) => {
  const dispatch = useAppDispatch();
  const { currentTrack, loopMode, shuffle, isPlaying } = useAppSelector(
    (state) => state.queueDrawer,
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update time display and handle metadata
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime * 1000);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration * 1000);
    };

    const handleEnded = () => {
      if (loopMode === "one") {
        audioElement.currentTime = 0;
        audioElement.play().catch(console.error);
      } else {
        dispatch(playNext());
      }
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, dispatch, loopMode]);

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const seekTime = value[0];
    audioRef.current.currentTime = seekTime / 1000;
    setCurrentTime(seekTime);
  };

  const handleNextTrack = () => {
    dispatch(playNext());
  };

  const handlePreviousTrack = () => {
    // If we're more than 3 seconds into the track, restart it
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      dispatch(playPrevious());
    }
  };

  const handleCycleLoopMode = () => {
    dispatch(cycleLoopMode());
  };

  const handleToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  return (
    <div className="flex w-2/4 max-w-md flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!currentTrack}
                onClick={handleToggleShuffle}
              >
                <Shuffle
                  className={cn("h-4 w-4", shuffle ? "text-primary" : "")}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {shuffle ? "Disable shuffle" : "Enable shuffle"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="ghost"
          size="icon"
          disabled={!currentTrack}
          onClick={handlePreviousTrack}
        >
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="border-primary h-10 w-10 rounded-full"
          disabled={!currentTrack}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          disabled={!currentTrack}
          onClick={handleNextTrack}
        >
          <SkipForward className="h-5 w-5" />
        </Button>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!currentTrack}
                onClick={handleCycleLoopMode}
              >
                {loopMode === "one" ? (
                  <Repeat1 className="h-4 w-4 text-primary" />
                ) : (
                  <Repeat
                    className={cn(
                      "h-4 w-4",
                      loopMode === "all" ? "text-primary" : "",
                    )}
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {loopMode === "off"
                ? "Enable repeat all"
                : loopMode === "all"
                  ? "Enable repeat one"
                  : "Disable repeat"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Progress bar */}
      <div className="flex w-full items-center gap-2 mb-2">
        <span className="w-10 text-right text-xs">
          {currentTrack && formatTrackDuration(currentTime)}
        </span>
        <Slider
          className="w-full"
          value={[currentTime]}
          max={duration || currentTrack?.duration_ms}
          step={1000}
          onValueChange={handleSeek}
          disabled={!currentTrack}
        />
        <span className="w-10 text-xs">
          {currentTrack &&
            formatTrackDuration(duration || currentTrack.duration_ms)}
        </span>
      </div>
    </div>
  );
};
export default MediaControl;
