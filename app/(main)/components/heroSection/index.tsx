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
  const artistName = artist?.name || "";
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
        <h1
          className="text-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold capitalize line-clamp-2 break-words min-w-0"
          title={artistName}
        >
          {artistName}
        </h1>
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
  tracks,
}: {
  playlist: Playlist;
  disabledDialog: boolean;
  tracks: Playlist["tracks"];
}) => {
  const playlistTitle = playlist?.title || "";
  const playlistDescription = playlist?.description || "";

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
            <h1
              className="text-start text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold capitalize line-clamp-1 break-words"
              title={playlistTitle}
            >
              {playlistTitle}
            </h1>
            <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
              {playlistDescription && (
                <p
                  className="line-clamp-3 break-words max-w-lg"
                  title={playlistDescription}
                >
                  {playlistDescription}
                </p>
              )}
              <div className="flex items-center gap-2">
                <p>
                  {formatTotalTime(
                    tracks.reduce((prev, curr) => prev + curr.duration_ms, 0),
                  )}
                </p>
                <Dot />
                <p>{tracks.length} tracks</p>
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
  const trackTitle = track?.title || "";
  const artistName = track?.artist?.name || "";
  return (
    <BaseHeroSection
      title={trackTitle}
      coverUrl={track?.cover_images[0]?.url || ""}
      showCoverImage={!!track?.cover_images.length}
    >
      <div className="flex flex-col items-start justify-end gap-6">
        <p className="text-foreground text-sm font-semibold capitalize">
          Track
        </p>
        <h1
          className="text-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold capitalize line-clamp-1 break-words min-w-0"
          title={trackTitle}
        >
          {trackTitle}
        </h1>
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <p
              className="truncate max-w-[150px] sm:max-w-[200px]"
              title={artistName}
            >
              {artistName}
            </p>
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
  const albumTitle = album?.title || "";
  const artistName = album?.artist?.name || "";
  return (
    <BaseHeroSection
      title={albumTitle}
      coverUrl={album?.cover_images[0]?.url || ""}
      showCoverImage={!!album?.cover_images.length}
    >
      <div className="flex flex-col items-start justify-end gap-6">
        <p className="text-foreground text-sm font-semibold capitalize">
          Album
        </p>
        <h1
          className="text-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold capitalize line-clamp-1 break-words min-w-0"
          title={albumTitle}
        >
          {albumTitle}
        </h1>
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <p
              className="truncate max-w-[150px] sm:max-w-[200px]"
              title={artistName}
            >
              {artistName}
            </p>
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
