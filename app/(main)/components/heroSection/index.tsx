import BaseHeroSection from "@/app/(main)/components/heroSection/BaseHeroSection";
import { Album, Artist, EmbbedTrack, Track } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Playlist } from "@/app/types/model";
import formatTotalTime from "@/utils/formatTotalTime";
import EditPlaylistForm from "@/app/(main)/playlists/components/form/EditPlaylistForm";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { format } from "date-fns";

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
      <Button variant="default" className="rounded-full" onClick={onFollow}>
        {isFollowing ? "Following" : "Follow"}
      </Button>
      <Dot />
      <p>Artist total tracks</p>
      <Dot />
      <p>Artist total albums</p>
    </BaseHeroSection>
  );
};

const PlaylistHeroSection = ({ playlist }: { playlist: Playlist }) => {
  return (
    <Dialog>
      <DialogTrigger className="block">
        <BaseHeroSection
          title={playlist?.title || ""}
          coverUrl={playlist?.cover_images[0]?.url || ""}
          showCoverImage={!!playlist?.cover_images.length}
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
                      (prev, curr) => prev + parseInt(curr.duration_ms),
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
      <p>{track.artist.name}</p>
      <Dot />
      <p>{formatTrackDuration(track.duration_ms)}</p>
      <Dot />
      <p>{format(new Date(track.createdAt), "yyyy")}</p>
    </BaseHeroSection>
  );
};

const AlbumHeroSection = ({ album }: { album: Album }) => {
  return (
    <BaseHeroSection
      title={album?.title || ""}
      coverUrl={album?.cover_images[0]?.url || ""}
      showCoverImage={!!album?.cover_images.length}
    >
      <p>{album?.artist.name}</p>
      <Dot />
      <p>{album?.tracks.length} items</p>
      <Dot />
      <p>
        {formatTotalTime(
          album.tracks.reduce(
            (prev: number, curr: EmbbedTrack) =>
              prev + parseInt(curr.duration_ms),
            0,
          ),
        )}
      </p>
    </BaseHeroSection>
  );
};

export {
  ArtistHeroSection,
  PlaylistHeroSection,
  TrackHeroSection,
  AlbumHeroSection,
};
