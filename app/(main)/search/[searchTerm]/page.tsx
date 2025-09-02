"use client";
import MediaList from "@/app/(main)/components/MediaList";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
import { useGetAlbumsQuery } from "@/services/albums/albumApi";
import { useGetAllArtistsQuery } from "@/services/artists/artistApi";
import { useGetPlaylistsQuery } from "@/services/playlists/playlistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const filterButtons = ["Tracks", "Artists", "Albums"];

  const {
    data: tracks,
    isLoading: isLoadingTracks,
    isSuccess: isSuccessTracks,
    isError: isErrorTracks,
    error: errorTracks,
  } = useGetTracksQuery(
    {
      title: searchTerm,
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
      status: ["published"],
    },
    {
      skip: !searchTerm,
    },
  );

  const {
    data: playlists,
    isLoading: isLoadingPlaylists,
    isSuccess: isSuccessPlaylists,
    isError: isErrorPlaylists,
    error: errorPlaylists,
  } = useGetPlaylistsQuery(
    {
      title: searchTerm,
      status: "public",
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
    },
    {
      skip: !searchTerm,
    },
  );

  const isLoading =
    isLoadingTracks ||
    isLoadingAlbums ||
    isLoadingPlaylists ||
    isLoadingArtists;
  const isSuccess =
    isSuccessTracks ||
    isSuccessAlbums ||
    isSuccessPlaylists ||
    isSuccessArtists;
  const isError =
    isErrorTracks || isErrorAlbums || isErrorPlaylists || isErrorArtists;
  const error = errorTracks || errorAlbums || errorPlaylists || errorArtists;

  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="default"
          className={`text-md w-24 rounded-full font-medium dark:text-white`}
        >
          <Link href={`/search/${searchTerm}`}>All</Link>
        </Button>
        {filterButtons.map((button) => (
          <Button
            key={button}
            variant="outline"
            className={`text-md w-24 rounded-full font-medium dark:text-white`}
          >
            <Link href={`/search/${searchTerm}/${button.toLowerCase()}`}>
              {button}
            </Link>
          </Button>
        ))}
      </div>

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
        <>
          <div className="mt-12 px-3">
            <p className="px-2 text-xl font-bold">Tracks</p>
            <SimpleTrackTable
              tracks={tracks?.data.items || []}
              showHeader={false}
              variant="addToPlaylist"
              className="mt-4"
            />
          </div>
          <div className="mt-12 px-3">
            <MediaList data={artists?.data.items || []} title="Artists" />
          </div>
          <div className="mt-12 px-3">
            <MediaList data={albums?.data.items || []} title="Albums" />
          </div>
          <div className="mt-12 px-3">
            <MediaList data={playlists?.data.items || []} title="Playlists" />
          </div>
        </>
      )}
    </div>
  );
};
export default Page;
