"use client";
import { Separator } from "@/components/ui/separator";
import { mockTracks } from "@/app/sampleData";
import HeroSection from "@/components/common/HeroSection";
import { useEffect, useMemo, useState } from "react";
import { TrackItem } from "@/app/types/component";
import { useParams, useRouter } from "next/navigation";
import SearchTrack from "@/app/(main)/playlists/components/SearchTrack";
import SearchResult from "@/app/(main)/playlists/components/SearchResult";
import RecommendationsTracks from "@/app/(main)/playlists/components/RecommendationsTracks";
import TableTrack from "@/components/common/SimpleTrackTable";
import {
  useDeletePlaylistMutation,
  useGetPlaylistByIdQuery,
} from "@/services/playlists/playlistApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useDebounce } from "@/hooks/useDebounce";
import ControlSection from "@/app/(main)/playlists/components/ControlSection";
import useToast from "@/hooks/useToast";

const DetailPlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetPlaylistByIdQuery(id);
  const [deletePlaylist] = useDeletePlaylistMutation();
  const playlist = useMemo(() => data?.data.item, [data]);
  const tracksLength = useMemo(() => playlist?.tracks.length || 0, [playlist]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TrackItem[]>([]);
  const router = useRouter();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { showToast } = useToast();

  const handleDeletePlaylist = async () => {
    if (!id) return;
    try {
      deletePlaylist(id);
      showToast("Deleted playlist successfully", "success");

      router.push("/");
    } catch (error) {
      console.error("Failed to delete playlist:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = mockTracks.filter((track) =>
      track.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage message="Failed to load playlist data" />
      </div>
    );
  }

  return (
    <div>
      {playlist && <HeroSection data={playlist} />}

      <Separator className="my-4" />

      {/* display play button and control section such as delete,... */}
      <ControlSection
        onPlay={() => console.log("Play playlist")}
        onDelete={handleDeletePlaylist}
      />

      {/* display search bar to add tracks to playlist */}
      {tracksLength === 0 && (
        <SearchTrack searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      {/* display search result to add to playlist */}
      {searchTerm && (
        <SearchResult searchTerm={searchTerm} searchResults={searchResults} />
      )}

      {/* display recommendations to add to playlist */}
      {tracksLength === 0 && <RecommendationsTracks mockTracks={mockTracks} />}

      {/* display tracks in playlist if playlist already have some */}
      {tracksLength !== 0 && (
        <TableTrack tracks={[...mockTracks, ...mockTracks]} />
      )}
    </div>
  );
};
export default DetailPlaylistPage;
