import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";

export const formatTrackDuration = (ms: number | string): string => {
  if (typeof ms === "string") {
    ms = parseInt(ms, 10);
  }
  const minutes = millisecondsToMinutes(ms);
  const seconds = millisecondsToSeconds(ms % 60000);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
