import { Volume } from "@/app/enums";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/redux";
import { useAudioPlayer } from "@/hooks/usePlayer";
import {
  toggleQueueDrawer,
  useQueueDrawer,
} from "@/store/slices/queueDrawerSlice";
import { List, Mic, Volume2, VolumeX } from "lucide-react";

const RightControl = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useQueueDrawer();
  const { muted, volume, handleToggleMute, handleVolumeChange } =
    useAudioPlayer();

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
              variant={isOpen ? "default" : "ghost"}
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
              onClick={handleToggleMute}
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
        defaultValue={[Volume.DEFAULT]}
        value={[muted ? 0 : isFinite(volume) ? volume : Volume.DEFAULT]}
        max={Volume.MAX}
        min={Volume.MIN}
        step={1}
        onValueChange={handleVolumeChange}
      />
    </div>
  );
};
export default RightControl;
