import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Heart, PlusCircle, Trash2 } from "lucide-react";
import BaseControlSection from "./BaseControlSection";

interface BaseProps {
  onPlay: () => void;
}

interface ActionMenuProps {
  variant: "playlist" | "track";
  onDelete?: () => void;
  onAddToPlaylist?: () => void;
}

const ActionMenu = ({
  variant,
  onDelete,
  onAddToPlaylist,
}: ActionMenuProps) => (
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

interface AlbumControlSectionProps extends BaseProps {
  onFollow: () => void;
  isFollowing: boolean;
}

const AlbumControlSection = ({
  onFollow,
  isFollowing,
  onPlay,
}: AlbumControlSectionProps) => {
  return (
    <BaseControlSection onPlay={onPlay}>
      <Button variant="outline" className="rounded-full" onClick={onFollow}>
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </BaseControlSection>
  );
};

interface TrackControlSectionProps extends BaseProps {
  onLike: () => void;
  isLiked: boolean;
  onAddToPlaylist: () => void;
}

const TrackControlSection = ({
  onLike,
  isLiked,
  onAddToPlaylist,
  onPlay,
}: TrackControlSectionProps) => {
  return (
    <BaseControlSection onPlay={onPlay}>
      <Button
        variant="outline"
        size="icon"
        onClick={onLike}
        className="h-10 w-10 scale-95 rounded-full transition-all duration-200 hover:scale-100"
      >
        <Heart
          className={`ml-0.5 h-7 w-7 ${isLiked && "text-primary"}`}
          fill={isLiked ? "var(--primary)" : "currentColor"}
        />
      </Button>
      <ActionMenu variant="track" onAddToPlaylist={onAddToPlaylist} />
    </BaseControlSection>
  );
};

interface PlaylistControlSectionProps extends BaseProps {
  onDelete: () => void;
}

const PlaylistControlSection = ({
  onDelete,
  onPlay,
}: PlaylistControlSectionProps) => {
  return (
    <BaseControlSection onPlay={onPlay}>
      <ActionMenu variant="playlist" onDelete={onDelete} />
    </BaseControlSection>
  );
};

export { AlbumControlSection, PlaylistControlSection, TrackControlSection };
