"use client";
import { TrackControlSection } from "@/app/(main)/components/controlSection";
import { TrackHeroSection } from "@/app/(main)/components/heroSection";
import MediaList from "@/app/(main)/components/MediaList";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Separator } from "@/components/ui/separator";
import { useGetAlbumByArtistQuery } from "@/services/albums/albumApi";
import {
  useGetSimilarTrackQuery,
  useGetTrackByArtistQuery,
  useGetTrackByIdQuery,
} from "@/services/tracks/trackApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const DetailTrackPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams<{ id: string }>();
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

  if (isTrackError) {
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
      {track && <TrackHeroSection track={track} />}

      <Separator className="my-4" />

      <TrackControlSection
        onPlay={() => console.log("Play track")}
        onAddToPlaylist={() => console.log("Add to playlist")}
        onLike={() => setIsLiked(!isLiked)}
        isLiked={isLiked}
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
    </div>
  );
};
export default DetailTrackPage;
