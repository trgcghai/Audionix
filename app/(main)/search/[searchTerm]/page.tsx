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

const Page = () => {
  const { searchTerm } = useParams();
  const filterButtons = ["Tracks", "Playlists", "Artists", "Albums"];

  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="default"
          className={`text-md font-medium rounded-full dark:text-white w-24`}
        >
          <Link href={`/search/${searchTerm}`}>All</Link>
        </Button>
        {filterButtons.map((button) => (
          <Button
            key={button}
            variant="outline"
            className={`text-md font-medium rounded-full dark:text-white w-24`}
          >
            <Link href={`/search/${searchTerm}/${button.toLowerCase()}`}>
              {button}
            </Link>
          </Button>
        ))}
      </div>

      <div className="px-3 mt-12">
        <p className="text-xl font-bold px-2">Tracks</p>
        <Table className="mt-4">
          <TableBody className="">
            {mockTracks.map((track, index) => (
              <TrackRow
                key={track.id + index}
                track={track}
                index={index + 1}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-12 px-3">
        <MediaList data={mockArtists} title="Artists" />
      </div>

      <div className="mt-12 px-3">
        <MediaList data={mockAlbums} title="Albums" />
      </div>

      <div className="mt-12 px-3">
        <MediaList data={mockPlaylists} title="Playlists" />
      </div>
    </div>
  );
};
export default Page;
