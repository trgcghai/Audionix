import { Ellipsis, Heart, Play, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PlayButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-primary hover:bg-primary/80 flex aspect-square h-14 w-14 scale-95 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-100"
  >
    <Play className="ml-1 block h-7 w-7" fill="currentColor" />
  </div>
);

const ActionMenu = ({
  variant,
  onDelete,
  onAddToPlaylist,
}: {
  variant: "playlist" | "track";
  onDelete?: () => void;
  onAddToPlaylist?: () => void;
}) => (
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
      {variant === "playlist" && onDelete && (
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      )}
      {variant === "track" && onAddToPlaylist && (
        <DropdownMenuItem variant="default" onClick={onAddToPlaylist}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add to Playlist
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

type BaseProps = {
  onPlay: () => void;
};

type PlaylistProps = BaseProps & {
  variant: "playlist";
  playable?: boolean;
  onDelete?: () => void;
};

type AlbumProps = BaseProps & {
  variant: "album";
  onFollow?: () => void;
  isFollowing?: boolean;
};

type TrackProps = BaseProps & {
  variant: "track";
  onLike?: () => void;
  onAddToPlaylist?: () => void;
  isLiked?: boolean;
};

type ControlSectionProps = PlaylistProps | AlbumProps | TrackProps;

const ControlSection = (props: ControlSectionProps) => {
  const { variant, onPlay } = props;

  return (
    <div className="my-4 flex items-center gap-4">
      <PlayButton onClick={onPlay} />

      {variant === "album" && (
        <Button
          variant="outline"
          className="rounded-full"
          onClick={props.onFollow}
        >
          {props.isFollowing ? "Following" : "Follow"}
        </Button>
      )}

      {variant === "track" && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={props.onLike}
            className="h-10 w-10 scale-95 rounded-full transition-all duration-200 hover:scale-100"
          >
            <Heart
              className={`ml-0.5 h-7 w-7 ${props.isLiked && "text-primary"}`}
              fill={props.isLiked ? "var(--primary)" : "currentColor"}
            />
          </Button>
          <ActionMenu variant="track" onAddToPlaylist={props.onAddToPlaylist} />
        </>
      )}

      {variant === "playlist" && (
        <ActionMenu variant="playlist" onDelete={props.onDelete} />
      )}
    </div>
  );
};

export default ControlSection;
