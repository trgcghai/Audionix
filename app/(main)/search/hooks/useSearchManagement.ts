import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { useGetAlbumsQuery } from "@/services/albums/albumApi";
import { useGetAllArtistsQuery } from "@/services/artists/artistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { useState } from "react";

interface props {
  searchTerm: string;
  type: string;
}

const useSearchManagement = ({ searchTerm, type }: props) => {
  const [currentTrack, setCurrentTrack] = useState(1);
  const [currentAlbum, setCurrentAlbum] = useState(1);
  const [currentArtist, setCurrentArtist] = useState(1);

  const {
    data: tracks,
    isLoading: isLoadingTracks,
    isError: isErrorTracks,
    error: errorTracks,
  } = useGetTracksQuery(
    {
      title: searchTerm,
      limit: 15,
      current: currentTrack,
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
      current: currentAlbum,
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
      current: currentArtist,
    },
    {
      skip: !searchTerm || type !== "artists",
    },
  );

  const isLoading = isLoadingTracks || isLoadingAlbums || isLoadingArtists;
  const isError = isErrorTracks || isErrorAlbums || isErrorArtists;
  const error = errorTracks || errorAlbums || errorArtists;

  return {
    // search results
    tracks,
    albums,
    artists,
    isLoading,
    isError,
    error,

    // pagination management
    currentTrack,
    setCurrentTrack,
    currentAlbum,
    setCurrentAlbum,
    currentArtist,
    setCurrentArtist,
  };
};
export default useSearchManagement;
