import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Play, Trash2 } from "lucide-react";

const PlayButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-primary hover:bg-primary/80 flex aspect-square h-14 w-14 scale-95 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-100"
  >
    <Play className="ml-1 block h-7 w-7" fill="currentColor" />
  </div>
);

interface ControlSectionProps {
  onPlay: () => void;
  onDelete?: () => void;
}

const ControlSection = ({ onPlay, onDelete }: ControlSectionProps) => {
  return (
    <div className="my-4 flex items-center gap-4">
      <PlayButton onClick={onPlay} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="text-md h-10 w-10 gap-1 rounded-full font-semibold"
          >
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={10}>
          <DropdownMenuItem variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ControlSection;
