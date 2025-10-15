"use client";
import MediaList from "@/app/(main)/components/mediaList/MediaList";
import FilterButtons from "@/app/(main)/search/components/FilterButtons";
import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { useGetAlbumsQuery } from "@/services/albums/albumApi";
import { useGetAllArtistsQuery } from "@/services/artists/artistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const {
    data: tracks,
    isLoading: isLoadingTracks,
    isSuccess: isSuccessTracks,
    isError: isErrorTracks,
    error: errorTracks,
  } = useGetTracksQuery(
    {
      title: searchTerm,
      limit: 10,
    },
    {
      skip: !searchTerm,
    },
  );

  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isSuccess: isSuccessAlbums,
    isError: isErrorAlbums,
    error: errorAlbums,
  } = useGetAlbumsQuery(
    {
      title: searchTerm,
      limit: ITEM_PER_MEDIA_ROW,
    },
    {
      skip: !searchTerm,
    },
  );

  const {
    data: artists,
    isLoading: isLoadingArtists,
    isSuccess: isSuccessArtists,
    isError: isErrorArtists,
    error: errorArtists,
  } = useGetAllArtistsQuery(
    {
      name: searchTerm,
      limit: ITEM_PER_MEDIA_ROW,
    },
    {
      skip: !searchTerm,
    },
  );

  const isLoading = isLoadingTracks || isLoadingAlbums || isLoadingArtists;
  const isSuccess = isSuccessTracks || isSuccessAlbums || isSuccessArtists;
  const isError = isErrorTracks || isErrorAlbums || isErrorArtists;
  const error = errorTracks || errorAlbums || errorArtists;

  return (
    <div>
      <FilterButtons />

      {isLoading && <LoaderSpin fullScreen />}
      {isError && (
        <ErrorMessage
          message={
            (error as ApiErrorResponse)?.data?.message ||
            "Unknown error occurred. Please try again later."
          }
        />
      )}

      {isSuccess && (
        <div className="space-y-12 mt-12 px-2">
          <div className="">
            <p className="text-xl font-bold">Tracks</p>
            <SimpleTrackTable
              tracks={tracks?.data.items || []}
              variant="searchResult"
              className="mt-4"
            />
          </div>
          <div className="">
            <MediaList data={artists?.data.items || []} title="Artists" />
          </div>
          <div className="">
            <MediaList data={albums?.data.items || []} title="Albums" />
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
