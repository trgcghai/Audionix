"use client";
import { PlaylistControlSection } from "@/app/(main)/components/controlSection";
import { PlaylistHeroSection } from "@/app/(main)/components/heroSection";
import SearchTrack from "@/app/(main)/playlists/components/SearchTrack";
import TracksList from "@/app/(main)/playlists/components/TracksList";
import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { ApiErrorResponse } from "@/app/types/api";
import { Playlist, Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Separator } from "@/components/ui/separator";
import { useDebounce } from "@/hooks/useDebounce";
import { usePlayer } from "@/hooks/usePlayer";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import {
  useGetPlaylistByIdQuery,
  useGetTracksInLikedSongsQuery,
  useGetTracksInPlaylistQuery,
} from "@/services/playlists/playlistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { useUserSlice } from "@/store/slices/userSlice";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const DetailPlaylistPage = () => {
  const { playTracks } = usePlayer();
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { user } = useUserSlice();
  const { handleDeletePlaylist } = usePlaylistAction();

  const isLikedSongs = user?.liked_songs === id;

  console.log(isLikedSongs);

  const {
    data: playlistData,
    isLoading: playlistLoading,
    isError: playlistError,
  } = useGetPlaylistByIdQuery(id, { skip: !id });

  const playlist = useMemo(() => {
    return playlistData && playlistData.data;
  }, [playlistData]);

  const { data: tracksData } = useGetTracksInPlaylistQuery(id, {
    skip: !id || isLikedSongs,
  });

  const { data: likedTracksData } = useGetTracksInLikedSongsQuery(undefined, {
    skip: !isLikedSongs,
  });

  const {
    data: recommendTrackData,
    isLoading: recommendLoading,
    isError: recommendError,
    error: recommendErrorData,
  } = useGetTracksQuery(
    {
      limit: ITEM_PER_MEDIA_ROW,
      title: debouncedSearchTerm,
    },
    {
      skip: playlist?.tracks.length !== 0,
    },
  );

  const tracks: Playlist["tracks"] = useMemo(() => {
    if (isLikedSongs && likedTracksData?.data?.results) {
      return likedTracksData.data.results.map(
        (item: { _id: Track; time_added: string }) => ({
          ...item._id,
          time_added: item.time_added,
        }),
      );
    }

    if (tracksData?.data?.results) {
      return tracksData.data.results.map(
        (item: { _id: Track; time_added: string }) => ({
          ...item._id,
          time_added: item.time_added,
        }),
      );
    }

    return [];
  }, [tracksData, likedTracksData, isLikedSongs]);

  if (playlistLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (playlistError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage message="Failed to load playlist data" />
      </div>
    );
  }

  return (
    <div>
      {playlist && (
        <PlaylistHeroSection
          playlist={playlist}
          disabledDialog={isLikedSongs}
          tracks={tracks}
        />
      )}

      <Separator className="my-4" />

      <PlaylistControlSection
        onPlay={() => playlist && tracks && playTracks(tracks)}
        onDelete={!isLikedSongs ? () => handleDeletePlaylist(id) : undefined}
      />

      {tracks && tracks.length === 0 && (
        <SearchTrack searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      {searchTerm && (
        <TracksList
          tracks={recommendTrackData?.data.items || []}
          title={`Search results for "${debouncedSearchTerm}"`}
          description={`Found ${recommendTrackData?.data.items.length} results for "${debouncedSearchTerm}"`}
          isLoading={recommendLoading}
          isError={recommendError}
          error={(recommendErrorData as ApiErrorResponse)?.data?.message}
        />
      )}

      {!searchTerm && tracks && tracks.length === 0 && (
        <TracksList
          tracks={recommendTrackData?.data.items || []}
          title="Recommended tracks"
          isLoading={recommendLoading}
          isError={recommendError}
          error={(recommendErrorData as ApiErrorResponse)?.data?.message}
        />
      )}

      {tracks && tracks.length !== 0 && <SimpleTrackTable tracks={tracks} />}
    </div>
  );
};
export default DetailPlaylistPage;
