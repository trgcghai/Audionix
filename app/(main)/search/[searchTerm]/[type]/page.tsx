"use client";
import MediaList from "@/components/common/MediaList";
import TrackRow from "@/components/common/TrackRow";
import {
  mockAlbums,
  mockArtists,
  mockPlaylists,
  mockTracks,
} from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import Link from "next/link";
import { useParams } from "next/navigation";

const TrackResult = () => {
  return (
    <Table className="mt-4">
      <TableBody className="">
        {[...mockTracks, ...mockTracks].map((track, index) => (
          <TrackRow key={track.id + index} track={track} index={index + 1} />
        ))}
      </TableBody>
    </Table>
  );
};

const Page = () => {
  const { searchTerm, type } = useParams();
  const filterButtons = ["Tracks", "Playlists", "Artists", "Albums"];

  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <Button
          variant={"outline"}
          className={`text-md font-medium rounded-full dark:text-white w-24`}
        >
          <Link href={`/search/${searchTerm}`}>All</Link>
        </Button>
        {filterButtons.map((button) => (
          <Button
            key={button}
            variant={
              (type as string).toLowerCase() === button.toLowerCase()
                ? "default"
                : "outline"
            }
            className={`text-md font-medium rounded-full dark:text-white w-24`}
          >
            <Link href={`/search/${searchTerm}/${button.toLowerCase()}`}>
              {button}
            </Link>
          </Button>
        ))}
      </div>

      <div className="px-3 mt-4">
        {type === "tracks" && <TrackResult />}
        {type === "playlists" && (
          <MediaList
            data={[...mockPlaylists, ...mockPlaylists, ...mockPlaylists]}
          />
        )}
        {type === "artists" && (
          <MediaList
            data={[
              ...mockArtists,
              ...mockArtists,
              ...mockArtists,
              ...mockArtists,
            ]}
          />
        )}
        {type === "albums" && (
          <MediaList data={[...mockAlbums, ...mockAlbums, ...mockAlbums]} />
        )}
      </div>
    </div>
  );
};
export default Page;
