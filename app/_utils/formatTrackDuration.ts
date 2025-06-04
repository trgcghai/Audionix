import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";

export const formatTrackDuration = (ms: number): string => {
  const minutes = millisecondsToMinutes(ms);
  const seconds = millisecondsToSeconds(ms % 60000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
