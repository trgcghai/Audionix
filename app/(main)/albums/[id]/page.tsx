"use client";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { useMemo, useState } from "react";
import MediaList from "@/components/common/MediaList";
import HeroSection from "@/components/common/HeroSection";
import ControlSection from "@/components/common/ControlSection";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { useParams } from "next/navigation";
import { useGetAlbumByIdQuery } from "@/services/albums/albumApi";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import formatTotalTime from "@/utils/formatTotalTime";
import { EmbbedTrack } from "@/app/types/model";

const DetailAlbumPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const {
    data: albumData,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    error: albumError,
  } = useGetAlbumByIdQuery(id, { skip: !id });

  const album = useMemo(() => {
    return albumData && albumData.data;
  }, [albumData]);

  if (isAlbumLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (isAlbumError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage
          message={
            (albumError as ApiErrorResponse)?.message ||
            "Failed to load album data"
          }
        />
      </div>
    );
  }

  return (
    <div>
      {album && (
        <HeroSection
          data={album}
          extraInfo={
            <>
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
            </>
          }
        />
      )}

      <Separator className="my-4" />

      <ControlSection
        onPlay={() => console.log("Play album")}
        onFollow={() => setIsFollowing(!isFollowing)}
        variant="album"
        isFollowing={isFollowing}
      />

      <SimpleTrackTable tracks={[]} />

      <MediaList
        className="mt-12"
        data={[]}
        title={`More from ${album?.artist.name}`}
      />
    </div>
  );
};
export default DetailAlbumPage;
