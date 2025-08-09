"use client";
import MediaList from "@/components/common/MediaList";
import { mockAlbums, mockArtists, mockPlaylists } from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";

const Page = () => {
  const { searchTerm, type } = useParams();
  const filterButtons = ["Tracks", "Playlists", "Artists", "Albums"];

  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <Button
          variant={"outline"}
          className={`text-md w-24 rounded-full font-medium dark:text-white`}
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
            className={`text-md w-24 rounded-full font-medium dark:text-white`}
          >
            <Link href={`/search/${searchTerm}/${button.toLowerCase()}`}>
              {button}
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-4 px-3">
        {type === "tracks" && <SimpleTrackTable tracks={[]} />}
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
