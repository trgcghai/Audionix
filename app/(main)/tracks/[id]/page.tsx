"use client";
import { TrackControlSection } from "@/app/(main)/components/controlSection";
import { TrackHeroSection } from "@/app/(main)/components/heroSection";
import MediaList from "@/app/(main)/components/MediaList";
import AddToPlaylistDialog from "@/app/(main)/tracks/components/AddToPlaylistDialog";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Separator } from "@/components/ui/separator";
import { usePlayer } from "@/hooks/usePlayer";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { useGetAlbumByArtistQuery } from "@/services/albums/albumApi";
import { useCheckTracksInLikedQuery } from "@/services/playlists/playlistApi";
import {
  useGetSimilarTrackQuery,
  useGetTrackByArtistQuery,
  useGetTrackByIdQuery,
} from "@/services/tracks/trackApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const DetailTrackPage = () => {
  const { playTrack } = usePlayer();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { handleAddTracksToLiked, handleRemoveTracksFromLiked } =
    usePlaylistAction();
  const { id } = useParams<{ id: string }>();
  const { data: likedData } = useCheckTracksInLikedQuery(
    [id, "68a8400db134bde81be84757"],
    {
      skip: !id,
    },
  );
  const {
    data: trackData,
    isError: isTrackError,
    isLoading: isTrackLoading,
    error: trackError,
  } = useGetTrackByIdQuery(id);
  const { data: similarTracksData } = useGetSimilarTrackQuery(id);

  const track = useMemo(() => {
    return trackData && trackData.data;
  }, [trackData]);

  const { data: albumData } = useGetAlbumByArtistQuery(
    track?.artist._id || "",
    { skip: !track?.artist._id },
  );
  const { data: artistTracksData } = useGetTrackByArtistQuery(
    track?.artist._id || "",
    { skip: !track?.artist._id },
  );

  if (isTrackLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (isTrackError || !track) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage
          message={
            (trackError as ApiErrorResponse)?.message ||
            "Failed to load track data"
          }
        />
      </div>
    );
  }

  return (
    <div>
      <TrackHeroSection track={track} />

      <Separator className="my-4" />

      <TrackControlSection
        onPlay={() => playTrack(track)}
        onAddToPlaylist={() => setDialogOpen(true)}
        isLiked={likedData?.data.results[0].inPlaylist || false}
        onLike={() => {
          if (likedData?.data.results[0].inPlaylist) {
            handleRemoveTracksFromLiked([id]);
          } else {
            handleAddTracksToLiked([id]);
          }
        }}
      />

      <div className="mt-8 flex items-center gap-2">
        <Image
          src={"/audionix_logo_short.png"}
          alt=""
          width={70}
          height={70}
          className={"rounded-full"}
        />
        <div className="">
          <p className="text-muted-foreground text-sm capitalize">Artist</p>
          <p className="text-base capitalize">{track?.artist.name || "-"}</p>
        </div>
      </div>

      <div className="mt-12">
        <p className="px-2 text-lg font-bold capitalize">
          Popular tracks by artist
        </p>
        <MediaList data={artistTracksData ? artistTracksData.data.items : []} />
      </div>

      <div className="mt-12">
        <p className="px-2 text-lg font-bold capitalize">
          Popular albums by artist
        </p>
        <MediaList data={albumData ? albumData.data.items : []} />
      </div>

      <div className="mt-12">
        <p className="px-2 text-lg font-bold capitalize">Fan also like</p>
        <MediaList
          data={similarTracksData ? similarTracksData.data.items : []}
        />
      </div>

      <AddToPlaylistDialog
        trackId={id}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};
export default DetailTrackPage;
