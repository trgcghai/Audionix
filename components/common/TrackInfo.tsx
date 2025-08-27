import { Button } from "@/components/ui/button";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { useCheckTracksInLikedQuery } from "@/services/playlists/playlistApi";
import { PlayingTrack } from "@/store/slices/queueDrawerSlice";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TrackInfo = ({ track }: { track: PlayingTrack; active?: boolean }) => {
  const { data: likedData } = useCheckTracksInLikedQuery([track._id], {
    skip: !track._id,
  });

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
    <div className="flex items-center gap-3">
      <Image
        src={track.cover_images[0].url}
        alt={track.title}
        width={50}
        height={50}
        className="rounded shadow-sm"
      />
      <div className="flex flex-col">
        <Link
          href={`/tracks/${track._id}`}
          className="hover:underline line-clamp-1"
        >
          {track.title}
        </Link>
        <Link
          href={`/artists/${track.artist._id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          {track.artist.name}
        </Link>
      </div>

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
