import { formatDuration, intervalToDuration } from "date-fns";

const formatTotalTime = (ms: number) => {
  if (ms == 0) return "0 seconds";

  const duration = intervalToDuration({ start: 0, end: ms });
  return formatDuration(duration, { format: ["hours", "minutes", "seconds"] });
};

export default formatTotalTime;
