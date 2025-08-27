import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/redux";
import {
  setMuted,
  setVolume,
  toggleQueueDrawer,
  useQueueDrawer,
} from "@/store/slices/queueDrawerSlice";
import { List, Mic, Volume2, VolumeX } from "lucide-react";

const RightControl = () => {
  const dispatch = useAppDispatch();
  const { isOpen: isDrawerOpen, volume, muted } = useQueueDrawer();

  const handleVolumeChange = (value: number[]) => {
    dispatch(setVolume(value[0]));

    // If volume is adjusted while muted, unmute
    if (muted && value[0] > 0) {
      dispatch(setMuted(false));
    }
  };

  const toggleMute = () => {
    dispatch(setMuted(!muted));
  };

  const handleToggleQueue = () => {
    dispatch(toggleQueueDrawer());
  };

  return (
    <div className="flex w-1/4 items-center justify-end gap-2">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Show lyrics</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isDrawerOpen ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={handleToggleQueue}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Show queue</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleMute}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {muted ? "Unmute" : "Mute"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Slider
        className="w-24"
        defaultValue={[70]}
        value={[muted ? 0 : isFinite(volume) ? volume : 100]}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
      />
    </div>
  );
};
export default RightControl;
