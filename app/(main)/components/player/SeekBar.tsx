import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/usePlayer";
import { formatDuration, formatSecondsToISO8601 } from "@omi3/utils";
import { useEffect, useState } from "react";

const SeekBar = ({
  audioRef,
  currentTime,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
}) => {
  const { currentTrack } = usePlayer();
  const duration = currentTrack ? currentTrack?.duration_ms / 1000 : 0;

  const [isDragging, setIsDragging] = useState(false);
  const [internalTime, setInternalTime] = useState(currentTime);

  useEffect(() => {
    if (!isDragging) {
      setInternalTime(currentTime);
    }
  }, [isDragging, currentTime]);

  useEffect(() => {
    if (duration === 0 && internalTime !== 0) {
      setInternalTime(0);
    }
  }, [duration, internalTime]);

  const handleSeek = (value: number) => {
    setInternalTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const handleValueChange = (value: number[]) => {
    const newTime = value[0];
    if (newTime !== undefined) {
      setInternalTime(newTime);
      if (!isDragging) {
        setIsDragging(true);
      }
    }
  };

  const handlePointerDown = () => {
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleValueCommit = (value: number[]) => {
    const seekTime = value[0];
    if (isDragging && seekTime !== undefined) {
      handleSeek(seekTime);
    }
    setIsDragging(false);
  };

  const isDisabled = !Number.isFinite(duration) || duration <= 0;

  const displayTime = Number.isFinite(internalTime)
    ? isDragging
      ? internalTime
      : currentTime
    : 0;
  const maxDuration = Number.isFinite(duration) && duration > 0 ? duration : 1;
  const displayDuration = Number.isFinite(duration) ? duration : 0;

  const formattedCurrentTime = formatDuration(displayTime);
  const formattedRemainingTime = formatDuration(
    Math.max(0, displayDuration - displayTime),
  );

  const isoCurrentTime = formatSecondsToISO8601(displayTime);
  const isoRemainingTime = formatSecondsToISO8601(
    Math.max(0, displayDuration - displayTime),
  );

  return (
    <div className="flex w-full items-center gap-2 mb-2">
      <span className="w-10 text-right text-xs">
        <time dateTime={isoCurrentTime}>{formattedCurrentTime}</time>
      </span>
      <Slider
        value={[displayTime]}
        max={maxDuration}
        step={0.1}
        disabled={isDisabled}
        onValueChange={handleValueChange}
        onPointerDown={handlePointerDown}
        onValueCommit={handleValueCommit}
      />
      <span className="w-10 text-xs">
        <time dateTime={isoRemainingTime}>-{formattedRemainingTime}</time>
      </span>
    </div>
  );
};
export default SeekBar;
