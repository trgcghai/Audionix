"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/libs/utils";
import { useAudio } from "@omi3/audio/react";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { useCallback } from "react";

type AudioVolumeProps = React.ComponentProps<typeof DropdownMenu> & {
  className?: string;
  triggerClassName?: string;
  sliderProps?: React.ComponentProps<typeof Slider>;
};

export const AudioVolume = ({
  className,
  triggerClassName,
  sliderProps,
}: AudioVolumeProps) => {
  const { volume, isMuted, isEngineInitialized, setVolume } = useAudio();

  const handleVolumeChange = useCallback(
    (value: number[]) => {
      const newVolume = value[0];
      if (isEngineInitialized && newVolume !== undefined) {
        setVolume(newVolume);
      }
    },
    [isEngineInitialized, setVolume],
  );

  const getVolumeIcon = useCallback(() => {
    if (!isEngineInitialized || isMuted || volume === 0) {
      return <VolumeX className="h-5 w-5" aria-hidden="true" />;
    }
    if (volume < 0.33) {
      return <Volume className="h-5 w-5" aria-hidden="true" />;
    }
    if (volume < 0.77) {
      return <Volume1 className="h-5 w-5" aria-hidden="true" />;
    }
    return <Volume2 className="h-5 w-5" aria-hidden="true" />;
  }, [isEngineInitialized, isMuted, volume]);

  const volumePercentage = Math.round((isMuted ? 0 : volume) * 100);
  const currentVolume = isMuted ? 0 : volume;
  const isDisabled = !isEngineInitialized;

  const toggleMuted = useCallback(() => {
    if (isEngineInitialized) {
      setVolume(isMuted ? currentVolume : 0);
    }
  }, [isEngineInitialized, isMuted, currentVolume, setVolume]);

  return (
    <div
      className="flex items-center space-x-2"
      data-state={isDisabled ? "disabled" : "enabled"}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn("hidden md:flex", triggerClassName)}
        disabled={isDisabled}
        onClick={toggleMuted}
        aria-label={`Volume Control: ${volumePercentage}%${isMuted ? " (Muted)" : ""}`}
        data-state={isMuted ? "muted" : volume === 0 ? "zero" : "active"}
      >
        {getVolumeIcon()}
      </Button>
      <div className={cn("flex items-center gap-2", className)}>
        <Slider
          value={[currentVolume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          disabled={isDisabled}
          className={cn("w-20", sliderProps?.className)}
          aria-label="Volume Control Slider"
          {...sliderProps}
        />
      </div>
    </div>
  );
};
