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
    className="h-14 w-14 aspect-square scale-95 hover:scale-100 rounded-full 
      transition-all duration-200 bg-primary flex items-center justify-center 
      cursor-pointer hover:bg-primary/80"
  >
    <Play className="h-7 w-7 ml-1 block" fill="currentColor" />
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
    <DropdownMenuTrigger>
      <Button
        variant="outline"
        className="rounded-full text-md font-semibold gap-1 h-10 w-10"
      >
        <Ellipsis className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" sideOffset={10}>
      {variant === "playlist" && onDelete && (
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      )}
      {variant === "track" && onAddToPlaylist && (
        <DropdownMenuItem variant="default" onClick={onAddToPlaylist}>
          <PlusCircle className="h-4 w-4 mr-2" />
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
    <div className="flex items-center gap-4">
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
            className="h-10 w-10 rounded-full scale-95 hover:scale-100 transition-all duration-200"
          >
            <Heart
              className={`h-7 w-7 ml-0.5 ${props.isLiked && "text-primary"}`}
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
