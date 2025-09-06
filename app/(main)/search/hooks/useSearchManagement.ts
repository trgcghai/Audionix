import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { useGetAlbumsQuery } from "@/services/albums/albumApi";
import { useGetAllArtistsQuery } from "@/services/artists/artistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { useEffect, useMemo, useState } from "react";

interface props {
  searchTerm: string;
  type: string;
}

const useSearchManagement = ({ searchTerm, type }: props) => {
  const [current, setCurrent] = useState(1);
  const {
    data: tracks,
    isLoading: isLoadingTracks,
    isError: isErrorTracks,
    error: errorTracks,
  } = useGetTracksQuery(
    {
      title: searchTerm,
      limit: 15,
      current,
    },
    {
      skip: !searchTerm || type !== "tracks",
    },
  );

  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isError: isErrorAlbums,
    error: errorAlbums,
  } = useGetAlbumsQuery(
    {
      title: searchTerm,
      limit: 4 * ITEM_PER_MEDIA_ROW,
      current,
    },
    {
      skip: !searchTerm || type !== "albums",
    },
  );

  const {
    data: artists,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
    error: errorArtists,
  } = useGetAllArtistsQuery(
    {
      name: searchTerm,
      limit: 4 * ITEM_PER_MEDIA_ROW,
      current,
    },
    {
      skip: !searchTerm || type !== "artists",
    },
  );

  const isLoading = isLoadingTracks || isLoadingAlbums || isLoadingArtists;
  const isError = isErrorTracks || isErrorAlbums || isErrorArtists;
  const error = errorTracks || errorAlbums || errorArtists;

  const totalPages = useMemo(() => {
    if (type === "tracks") return tracks?.data?.totalPages || 0;
    if (type === "albums") return albums?.data?.totalPages || 0;
    if (type === "artists") return artists?.data?.totalPages || 0;
    return 0;
  }, [tracks, albums, artists, type]);

  useEffect(() => {
    setCurrent(1);
  }, [type, searchTerm]);

  return {
    // search results
    tracks,
    albums,
    artists,
    isLoading,
    isError,
    error,

    // pagination management
    current,
    setCurrent,
    totalPages,
  };
};
export default useSearchManagement;
