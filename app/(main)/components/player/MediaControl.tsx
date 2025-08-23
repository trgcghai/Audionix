import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/libs/utils";
import {
  Shuffle,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Repeat,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TrackItem } from "@/app/types/component";

const MediaControl = ({ track }: { track: TrackItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTime < track.duration_ms) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.duration_ms) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1000;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, track.duration_ms, currentTime]);

  return (
    <div className="flex w-2/4 max-w-md flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsShuffle(!isShuffle)}
              >
                <Shuffle
                  className={cn("h-4 w-4", isShuffle ? "text-primary" : "")}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isShuffle ? "Disable shuffle" : "Enable shuffle"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="ghost" size="icon">
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="border-primary h-10 w-10 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <SkipForward className="h-5 w-5" />
        </Button>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <Repeat
                  className={cn("h-4 w-4", isRepeat ? "text-primary" : "")}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isRepeat ? "Disable repeat" : "Enable repeat"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Progress bar */}
      <div className="flex w-full items-center gap-2">
        <span className="w-10 text-right text-xs">
          {formatTrackDuration(currentTime)}
        </span>
        <Slider
          className="w-full"
          defaultValue={[0]}
          value={[currentTime]}
          max={track.duration_ms}
          step={1000}
          onValueChange={(value) => setCurrentTime(value[0])}
        />
        <span className="w-10 text-xs">
          {formatTrackDuration(track.duration_ms)}
        </span>
      </div>
    </div>
  );
};
export default MediaControl;
