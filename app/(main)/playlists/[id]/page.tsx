"use client";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { mockPlaylists, mockTracks } from "@/app/sampleData";
import HeroSection from "@/components/common/HeroSection";
import { useEffect, useMemo, useState } from "react";
import { TrackItem } from "@/app/types/component";
import { useParams } from "next/navigation";
import debounce from "lodash.debounce";
import SearchTrack from "@/app/(main)/playlists/components/SearchTrack";
import SearchResult from "@/app/(main)/playlists/components/SearchResult";
import RecommendationsTracks from "@/app/(main)/playlists/components/RecommendationsTracks";
import TableTrack from "@/components/common/SimpleTrackTable";
import ControlSection from "@/components/common/ControlSection";

const DetailPlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const playlist = useMemo(
    () => mockPlaylists.find((item) => item.id === id),
    [id]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TrackItem[]>([]);

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        if (term.trim() === "") {
          setSearchResults([]);
          return;
        }

        const results = mockTracks.filter((track) =>
          track.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, searchTerm]);

  return (
    <div>
      {playlist && (
        <HeroSection
          data={playlist}
          extraInfo={
            <>
              <p>Playlist&apos;s creator</p>
              <Dot />
              <p>{playlist.tracks.total} tracks</p>
            </>
          }
        />
      )}

      <Separator className="my-4" />

      {/* display play button if playlist has tracks */}
      {playlist?.tracks.total !== 0 && (
        <ControlSection
          onPlay={() => console.log("Play playlist")}
          onDelete={() => console.log("Delete playlist")}
          variant="playlist"
        />
      )}

      {/* display search bar to add tracks to playlist */}
      {playlist?.tracks.total === 0 && (
        <SearchTrack searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      {/* display search result to add to playlist */}
      {searchTerm && (
        <SearchResult searchTerm={searchTerm} searchResults={searchResults} />
      )}

      {/* display recommendations to add to playlist */}
      {playlist?.tracks.total === 0 && (
        <RecommendationsTracks mockTracks={mockTracks} />
      )}

      {/* display tracks in playlist if playlist already have some */}
      {playlist?.tracks.total !== 0 && (
        <TableTrack tracks={[...mockTracks, ...mockTracks]} />
      )}
    </div>
  );
};
export default DetailPlaylistPage;
