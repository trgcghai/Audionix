import { Album, Artist, Playlist } from "@/app/types/model";
import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface LibraryItemProps {
  data: Playlist | Album | Artist;
}

const LibraryItem = ({ data }: LibraryItemProps) => {
  const getTrackCount = () => {
    if (data.type === "playlist" && "tracks" in data) {
      return data.tracks.length;
    } else if (data.type === "album" && "total_tracks" in data) {
      return data.total_tracks;
    }
    return 0;
  };

  const title = useMemo(() => {
    if ("name" in data) {
      return data.name;
    }
    if ("title" in data) {
      return data.title;
    }
    return "Untitled item";
  }, [data]);

  return (
    <Link href={`/${data.type}s/${data._id}`}>
      <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-500/30">
        {Array.isArray(data.cover_images) && data.cover_images.length > 0 ? (
          <Image
            src={data.cover_images?.[0]?.url || "/audionix_logo_short.png"}
            alt=""
            width={50}
            height={50}
            className={`${
              data.type == "artist" ? "rounded-full" : "rounded-lg"
            } aspect-square object-cover`}
          />
        ) : (
          <div className="bg-muted flex h-[55px] w-[55px] items-center justify-center rounded-lg">
            <Music className="h-5 w-5" />
          </div>
        )}
        <div>
          <p>{title}</p>
          <p className="text-muted-foreground text-sm">
            <span className="capitalize">{data.type}</span>
            {["album", "playlist"].includes(data.type) &&
              ` - ${getTrackCount()} items`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LibraryItem;
