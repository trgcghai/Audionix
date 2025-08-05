import { AlbumItem, ArtistItem } from "@/app/types/component";
import { Playlist } from "@/app/types/model";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface LibraryItemProps {
  data: Playlist | AlbumItem | ArtistItem;
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
        <Image
          src={data.cover_images?.[0]?.url || "/audionix_logo_short.png"}
          alt=""
          width={50}
          height={50}
          className={`${
            data.type == "artist" ? "rounded-full" : "rounded-lg"
          } aspect-square object-cover`}
        />
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
