"use client";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { mockTracks } from "@/app/sampleData";
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
import { useGetPlaylistByIdQuery } from "@/services/playlists/playlistApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";

const DetailPlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetPlaylistByIdQuery(id);
  const playlist = useMemo(() => data?.data.item, [data]);
  const tracksLength = useMemo(() => playlist?.tracks.length || 0, [playlist]);
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
          track.name.toLowerCase().includes(term.toLowerCase()),
        );
        setSearchResults(results);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, searchTerm]);

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
      {playlist && (
        <HeroSection
          data={playlist}
          extraInfo={
            <>
              <p>Playlist&apos;s creator</p>
              <Dot />
              <p>{data?.data.item.tracks.length} tracks</p>
            </>
          }
        />
      )}

      <Separator className="my-4" />

      {/* display play button if playlist has tracks */}
      {tracksLength !== 0 && (
        <ControlSection
          onPlay={() => console.log("Play playlist")}
          onDelete={() => console.log("Delete playlist")}
          variant="playlist"
        />
      )}

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
