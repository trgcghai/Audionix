"use client";
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SearchTrack from "@/app/(main)/playlists/components/SearchTrack";
import { useGetPlaylistByIdQuery } from "@/services/playlists/playlistApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useDebounce } from "@/hooks/useDebounce";
import ControlSection from "@/app/(main)/playlists/components/ControlSection";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { ApiErrorResponse } from "@/app/types/api";
import TracksList from "@/app/(main)/playlists/components/TracksList";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { PlaylistHeroSection } from "@/app/(main)/components/heroSection";

const DetailPlaylistPage = () => {
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
      {/* display play button and control section such as delete,... */}
      <ControlSection
        onPlay={() => console.log("Play playlist")}
        onDelete={() => handleDeletePlaylist(id)}
      />
      {/* display search bar to add tracks to playlist */}
      {playlist && playlist.tracks.length === 0 && (
        <SearchTrack searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      {/* display search result to add to playlist */}
      {searchTerm && (
        <TracksList
          tracks={recommendTrackData?.data.items || []}
          title={`Search results for "${debouncedSearchTerm}"`}
          description={`Found ${recommendTrackData?.data.items.length} results for "${debouncedSearchTerm}"`}
          isLoading={recommendLoading}
          isError={recommendError}
          error={(recommendErrorData as ApiErrorResponse)?.message}
        />
      )}
      {/* display recommendations to add to playlist */}
      {!searchTerm && playlist && playlist.tracks.length === 0 && (
        <TracksList
          tracks={recommendTrackData?.data.items || []}
          title="Recommended tracks"
          isLoading={recommendLoading}
          isError={recommendError}
          error={(recommendErrorData as ApiErrorResponse)?.message}
        />
      )}
      {/* display tracks in playlist if playlist already have some */}
      {playlist && playlist.tracks.length !== 0 && (
        <SimpleTrackTable tracks={playlist.tracks} />
      )}
    </div>
  );
};
export default DetailPlaylistPage;
