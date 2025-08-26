import { Play } from "lucide-react";

const PlayButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-primary hover:bg-primary/80 flex aspect-square h-14 w-14 scale-95 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-100"
  >
    <Play className="ml-1 block h-7 w-7" fill="currentColor" />
  </div>
);

interface BaseProps {
  onPlay: () => void;
  children: React.ReactNode;
}

const BaseControlSection = ({ onPlay, children }: BaseProps) => {
  return (
    <div className="my-4 flex items-center gap-4">
      <PlayButton onClick={onPlay} />

      {children}
    </div>
  );
};
export default BaseControlSection;
