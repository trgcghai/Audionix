"use client";
import { PlaylistControlSection } from "@/app/(main)/components/controlSection";
import { PlaylistHeroSection } from "@/app/(main)/components/heroSection";
import SearchTrack from "@/app/(main)/playlists/components/SearchTrack";
import TracksList from "@/app/(main)/playlists/components/TracksList";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Separator } from "@/components/ui/separator";
import { useDebounce } from "@/hooks/useDebounce";
import { usePlayer } from "@/hooks/usePlayer";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { useGetPlaylistByIdQuery } from "@/services/playlists/playlistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const DetailPlaylistPage = () => {
  const { playTracks } = usePlayer();
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: playlistData,
    isLoading: playlistLoading,
    isError: playlistError,
  } = useGetPlaylistByIdQuery(id, { skip: !id });

  const playlist = useMemo(() => {
    return playlistData && playlistData.data;
  }, [playlistData]);

  const { handleDeletePlaylist } = usePlaylistAction();
  const {
    data: recommendTrackData,
    isLoading: recommendLoading,
    isError: recommendError,
    error: recommendErrorData,
  } = useGetTracksQuery(
    {
      limit: 6,
      title: debouncedSearchTerm,
    },
    {
      skip: playlist?.tracks.length !== 0,
    },
  );

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
      {playlist && <PlaylistHeroSection playlist={playlist} />}

      <Separator className="my-4" />

      <PlaylistControlSection
        onPlay={() => playlist && playTracks(playlist.tracks)}
        onDelete={() => handleDeletePlaylist(id)}
      />

      {playlist && playlist.tracks.length === 0 && (
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

      {!searchTerm && playlist && playlist.tracks.length === 0 && (
        <TracksList
          tracks={recommendTrackData?.data.items || []}
          title="Recommended tracks"
          isLoading={recommendLoading}
          isError={recommendError}
          error={(recommendErrorData as ApiErrorResponse)?.data?.message}
        />
      )}

      {playlist && playlist.tracks.length !== 0 && (
        <SimpleTrackTable tracks={playlist.tracks} />
      )}
    </div>
  );
};
export default DetailPlaylistPage;
