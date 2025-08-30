import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { cn } from "@/libs/utils";
import { useCheckTracksInLikedQuery } from "@/services/playlists/playlistApi";
import {
  PlayingTrack,
  removeTrackFromQueue,
} from "@/store/slices/queueDrawerSlice";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TrackInfo = ({
  track,
  active,
  showRemove = false,
}: {
  track: PlayingTrack;
  active?: boolean;
  showRemove?: boolean;
}) => {
  const { data: likedData } = useCheckTracksInLikedQuery(
    track?._id ? [track._id] : [],
    {
      skip: !track || !track._id,
    },
  );
  const dispatch = useAppDispatch();

  const { handleAddTracksToLiked, handleRemoveTracksFromLiked } =
    usePlaylistAction();

  const isLiked = likedData?.data.results[0]?.inPlaylist || false;

  const handleLikeToggle = () => {
    if (isLiked) {
      handleRemoveTracksFromLiked([track._id]);
    } else {
      handleAddTracksToLiked([track._id]);
    }
  };

  const handleRemoveFromQueue = () => {
    dispatch(removeTrackFromQueue(track._id));
  };

  if (!track) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3",
        active && "text-primary",
      )}
    >
      <Link
        href={`/tracks/${track._id}`}
        className="cursor-pointer flex items-center gap-3"
      >
        <Image
          src={track.cover_images[0].url}
          alt={track.title}
          width={50}
          height={50}
          className="rounded shadow-sm aspect-square object-cover"
        />
        <div className="flex flex-col">
          <p className=" line-clamp-1">{track.title}</p>
          <p className="text-sm text-muted-foreground ">{track.artist.name}</p>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLikeToggle}
          className="ml-2"
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? "text-primary" : ""}`}
            fill={isLiked ? "var(--primary)" : "none"}
          />
        </Button>
        {showRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveFromQueue}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default TrackInfo;
