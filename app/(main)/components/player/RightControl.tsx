import { useAppDispatch } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mic, VolumeX, Volume2, List } from "lucide-react";
import { useState } from "react";
import {
  toggleQueueDrawer,
  useQueueDrawer,
} from "@/store/slices/queueDrawerSlice";

const RightControl = () => {
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const dispatch = useAppDispatch();
  const { isOpen: isDrawerOpen } = useQueueDrawer();

  const handleOpenQueueDrawer = () => {
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
              onClick={handleOpenQueueDrawer}
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
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isMuted ? "Unmute" : "Mute"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Slider
        className="w-24"
        defaultValue={[70]}
        value={[isMuted ? 0 : volume]}
        max={100}
        step={1}
        onValueChange={(value) => {
          setVolume(value[0]);
          setIsMuted(value[0] === 0);
        }}
      />
    </div>
  );
};
export default RightControl;
