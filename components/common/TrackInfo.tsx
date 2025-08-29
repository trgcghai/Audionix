import { Button } from "@/components/ui/button";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { cn } from "@/libs/utils";
import { useCheckTracksInLikedQuery } from "@/services/playlists/playlistApi";
import { PlayingTrack } from "@/store/slices/queueDrawerSlice";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TrackInfo = ({
  track,
  active,
}: {
  track: PlayingTrack;
  active?: boolean;
}) => {
  const { data: likedData } = useCheckTracksInLikedQuery(
    track?._id ? [track._id] : [],
    {
      skip: !track || !track._id,
    },
  );

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
    </div>
  );
};
export default TrackInfo;
