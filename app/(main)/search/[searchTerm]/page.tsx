"use client";
import MediaList from "@/app/(main)/components/MediaList";
import { mockAlbums, mockArtists, mockPlaylists } from "@/app/sampleData";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
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
          className={`text-md w-24 rounded-full font-medium dark:text-white`}
        >
          <Link href={`/search/${searchTerm}`}>All</Link>
        </Button>
        {filterButtons.map((button) => (
          <Button
            key={button}
            variant="outline"
            className={`text-md w-24 rounded-full font-medium dark:text-white`}
          >
            <Link href={`/search/${searchTerm}/${button.toLowerCase()}`}>
              {button}
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-12 px-3">
        <p className="px-2 text-xl font-bold">Tracks</p>
        <SimpleTrackTable
          tracks={[]}
          showHeader={false}
          variant="addToPlaylist"
          className="mt-4"
        />
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
