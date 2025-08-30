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
import {
  toggleQueueDrawer,
  useQueueDrawer,
} from "@/store/slices/queueDrawerSlice";
import { List, Mic, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const RightControl = ({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useQueueDrawer();
  const [volumeValue, setVolumeValue] = useState<number>(Volume.DEFAULT);

  const muted = audioRef.current?.muted;
  const volume = audioRef.current?.volume || Volume.DEFAULT;

  const handleToggleQueue = () => {
    dispatch(toggleQueueDrawer());
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolumeValue(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0];
    }
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
              {audioRef.current?.muted ? (
                <VolumeX className="h-4 w-4" />
              ) : volume > 0.5 ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <Volume1 className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <Slider
            className="w-24"
            defaultValue={[volumeValue]}
            value={[muted ? Volume.MIN : volumeValue]}
            max={Volume.MAX}
            min={Volume.MIN}
            step={0.001}
            onValueChange={handleVolumeChange}
          />
          <TooltipContent side="top">
            {muted ? "Unmute" : "Mute"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
export default RightControl;
