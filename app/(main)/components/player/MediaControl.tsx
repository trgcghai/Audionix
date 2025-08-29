import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAudioPlayer } from "@/hooks/usePlayer";
import { cn } from "@/libs/utils";
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

const MediaControl = () => {
  const {
    currentTrack,
    isPlaying,
    loopMode,
    shuffle,
    currentTime,
    duration,
    togglePlay,
    handleSeek,
    handleNextTrack,
    handlePreviousTrack,
    handleToggleShuffle,
    handleCycleLoopMode,
  } = useAudioPlayer();

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
