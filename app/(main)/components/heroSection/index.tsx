import BaseHeroSection from "@/app/(main)/components/heroSection/BaseHeroSection";
import EditPlaylistForm from "@/app/(main)/playlists/components/form/EditPlaylistForm";
import { Album, Artist, EmbbedTrack, Playlist, Track } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import formatTotalTime from "@/utils/formatTotalTime";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { format } from "date-fns";
import { Dot } from "lucide-react";

interface HeroSectionProps {
  artist: Artist;
  isFollowing: boolean;
  onFollow: () => void;
}

const ArtistHeroSection = ({
  artist,
  isFollowing,
  onFollow,
}: HeroSectionProps) => {
  return (
    <BaseHeroSection
      title={artist?.name || ""}
      coverUrl={artist?.cover_images[0]?.url || ""}
      showCoverImage={!!artist?.cover_images.length}
    >
      <div className="flex flex-col items-start justify-end gap-6">
        <p className="text-foreground text-sm font-semibold capitalize">
          Artist
        </p>
        <p className="text-start text-7xl font-bold capitalize">
          {artist?.name || ""}
        </p>
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Button
              variant={isFollowing ? "outline" : "default"}
              className="rounded-full"
              onClick={onFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Dot />
            <p>Artist total tracks</p>
            <Dot />
            <p>Artist total albums</p>
          </div>
        </div>
      </div>
    </BaseHeroSection>
  );
};

const PlaylistHeroSection = ({
  playlist,
  disabledDialog,
}: {
  playlist: Playlist;
  disabledDialog: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" disabled={disabledDialog}>
        <BaseHeroSection
          title={playlist?.title || ""}
          coverUrl={playlist?.cover_images[0]?.url || ""}
          showCoverImage={!!playlist?.cover_images.length}
          width={playlist?.cover_images[0]?.width}
          height={playlist?.cover_images[0]?.height}
        >
          <div className="flex flex-col items-start justify-end gap-6">
            <p className="text-foreground text-sm font-semibold capitalize">
              Playlist
            </p>
            <p className="text-start text-7xl font-bold capitalize">
              {playlist?.title || ""}
            </p>
            <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
              {playlist?.description && <p>{playlist?.description}</p>}
              <div className="flex items-center gap-2">
                <p>
                  {formatTotalTime(
                    playlist.tracks.reduce(
                      (prev, curr) => prev + curr.duration_ms,
                      0,
                    ),
                  )}
                </p>
                <Dot />
                <p>{playlist?.tracks.length} tracks</p>
              </div>
            </div>
          </div>
        </BaseHeroSection>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit detail</DialogTitle>
        </DialogHeader>
        <EditPlaylistForm data={playlist} />
      </DialogContent>
    </Dialog>
  );
};

const TrackHeroSection = ({ track }: { track: Track }) => {
  return (
    <BaseHeroSection
      title={track?.title || ""}
      coverUrl={track?.cover_images[0]?.url || ""}
      showCoverImage={!!track?.cover_images.length}
    >
      <div className="flex flex-col items-start justify-end gap-6">
        <p className="text-foreground text-sm font-semibold capitalize">
          Track
        </p>
        <p className="text-start text-7xl font-bold capitalize">
          {track?.title || ""}
        </p>
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <p>{track.artist.name}</p>
            <Dot />
            <p>{formatTrackDuration(track.duration_ms)}</p>
            <Dot />
            <p>{format(new Date(track.createdAt), "yyyy")}</p>
          </div>
        </div>
      </div>
    </BaseHeroSection>
  );
};

const AlbumHeroSection = ({
  album,
  tracks,
}: {
  album: Album;
  tracks: Album["tracks"];
}) => {
  return (
    <BaseHeroSection
      title={album?.title || ""}
      coverUrl={album?.cover_images[0]?.url || ""}
      showCoverImage={!!album?.cover_images.length}
    >
      <div className="flex flex-col items-start justify-end gap-6">
        <p className="text-foreground text-sm font-semibold capitalize">
          Album
        </p>
        <p className="text-start text-7xl font-bold capitalize">
          {album?.title || ""}
        </p>
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <p>{album?.artist.name}</p>
            <Dot />
            <p>{album?.tracks.length} items</p>
            <Dot />
            <p>
              {formatTotalTime(
                tracks.reduce(
                  (prev: number, curr: EmbbedTrack) => prev + curr.duration_ms,
                  0,
                ),
              )}
            </p>
          </div>
        </div>
      </div>
    </BaseHeroSection>
  );
};

export {
  AlbumHeroSection,
  ArtistHeroSection,
  PlaylistHeroSection,
  TrackHeroSection,
};
