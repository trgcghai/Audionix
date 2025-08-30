import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/redux";
import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/libs/utils";
import {
  cycleLoopMode,
  playNext,
  playPrevious,
  setIsPlaying,
  toggleShuffle,
  useQueueDrawer,
} from "@/store/slices/queueDrawerSlice";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

const MediaControl = ({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) => {
  const dispatch = useAppDispatch();
  const { shuffle, isPlaying, loopMode } = useQueueDrawer();
  const { currentTrack, hasNext, hasPrevious, hasOneItem } = usePlayer();

  const handleToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handlePreviousTrack = () => {
    dispatch(playPrevious());
  };

  const handleNextTrack = () => {
    dispatch(playNext());
  };

  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };

  const handleCycleLoopMode = () => {
    dispatch(cycleLoopMode());
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
                disabled={!currentTrack || hasOneItem}
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
          disabled={!currentTrack || !hasPrevious}
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
          disabled={!currentTrack || !hasNext}
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
    </div>
  );
};
export default MediaControl;
