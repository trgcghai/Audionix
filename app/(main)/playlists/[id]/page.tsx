"use client";
import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/common/HeroSection";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SearchTrack from "@/app/(main)/playlists/components/SearchTrack";
import TableTrack from "@/components/common/SimpleTrackTable";
import { useGetPlaylistByIdQuery } from "@/services/playlists/playlistApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useDebounce } from "@/hooks/useDebounce";
import ControlSection from "@/app/(main)/playlists/components/ControlSection";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { ApiErrorResponse } from "@/app/types/api";
import TracksList from "@/app/(main)/playlists/components/TracksList";
import usePlaylistAction from "@/hooks/usePlaylistAction";

const DetailPlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: playlistData,
    isLoading: playlistLoading,
    isError: playlistError,
  } = useGetPlaylistByIdQuery(id);
  const { handleDeletePlaylist } = usePlaylistAction();
  const playlist = useMemo(() => playlistData?.data.item, [playlistData]);
  const tracksLength = useMemo(() => playlist?.tracks.length || 0, [playlist]);
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
      skip: tracksLength !== 0,
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

  console.log("Playlist data:", playlist?.tracks);

  return (
    <div>
      {playlist && <HeroSection data={playlist} />}

      <Separator className="my-4" />

      {/* display play button and control section such as delete,... */}
      <ControlSection
        onPlay={() => console.log("Play playlist")}
        onDelete={() => handleDeletePlaylist(id)}
      />

      {/* display search bar to add tracks to playlist */}
      {tracksLength === 0 && (
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
      {!searchTerm && tracksLength === 0 && (
        <TracksList
          tracks={recommendTrackData?.data.items || []}
          title="Recommended tracks"
          isLoading={recommendLoading}
          isError={recommendError}
          error={(recommendErrorData as ApiErrorResponse)?.message}
        />
      )}

      {/* display tracks in playlist if playlist already have some */}
      {tracksLength !== 0 && <TableTrack tracks={[]} />}
    </div>
  );
};
export default DetailPlaylistPage;
