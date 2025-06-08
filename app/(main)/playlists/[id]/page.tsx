"use client";
import { Separator } from "@/components/ui/separator";
import { Clock, Dot, Play, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPlaylists, mockTracks } from "@/app/sampleData";
import HeroSection from "@/app/_components/HeroSection";
import TrackRow from "@/app/_components/TrackRow";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { TrackItem } from "@/app/types/component";
import { useParams } from "next/navigation";
import debounce from "lodash.debounce";

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
      }, 500), // 500ms delay
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

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
        <div>
          <div className="h-14 w-14 aspect-square scale-95 hover:scale-100 rounded-full transition-all duration-200 bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/80">
            <Play className="h-7 w-7 ml-1 block" fill="currentColor" />
          </div>
        </div>
      )}

      {/* display search bar to add tracks to playlist */}
      {playlist?.tracks.total === 0 && (
        <div className="mx-2">
          <p className="w-2/5 text-xl font-semibold mb-4">
            Let&apos;s find something for your playlist
          </p>
          <div className="hidden md:flex relative w-1/3">
            <Search className="absolute left-2.5 top-2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="What do you want to play ?"
              className="pl-9 rounded-full placeholder:text-md"
            />
          </div>
        </div>
      )}

      {/* display search result to add to playlist */}
      {searchTerm && searchResults.length !== 0 && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">
            Search results for {searchTerm}
          </p>
          <Table>
            <TableBody>
              {searchResults.map((track, index) => (
                <TrackRow
                  key={track.id + index}
                  track={track}
                  index={index + 1}
                  variant="addToPlaylist"
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* display search result to add to playlist */}
      {searchTerm && searchResults.length === 0 && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">
            Search results for {searchTerm}
          </p>
          <p className="text-gray-500">
            No results found. Try searching for something else.
          </p>
        </div>
      )}

      {/* display recommendations to add to playlist */}
      {playlist?.tracks.total === 0 && (
        <div className="mx-0.5 mt-8">
          <p className="text-xl font-bold">Recommendations</p>
          <Table className="mt-4">
            <TableBody className="">
              {mockTracks.map((track, index) => (
                <TrackRow
                  key={track.id + index}
                  track={track}
                  index={index + 1}
                  variant="addToPlaylist"
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* display tracks in playlist if playlist already have some */}
      {playlist?.tracks.total !== 0 && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="cursor-default">
              <TableHead className="text-xs font-bold text-gray-400 rounded-tl-lg rounded-bl-lg">
                #
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400">
                Title
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400">
                Album
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400">
                Date added
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 rounded-tr-lg rounded-br-lg">
                <Clock className="w-4 h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {[...mockTracks, ...mockTracks].map((track, index) => (
              <TrackRow
                key={track.id + index}
                track={track}
                index={index + 1}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default DetailPlaylistPage;
