import { LibraryItemProps } from "@/app/types/component";
import Image from "next/image";
import Link from "next/link";

const LibraryItem = ({ data }: LibraryItemProps) => {
  const getTrackCount = () => {
    if (data.type === "playlist" && "tracks" in data) {
      return data.tracks.total;
    } else if (data.type === "album" && "total_tracks" in data) {
      return data.total_tracks;
    }
    return 0;
  };

  return (
    <Link href={`/${data.type}s/${data.id}`}>
      <div className="flex items-center gap-2 p-2 hover:bg-gray-500/30 rounded-lg cursor-pointer">
        <Image
          src={data.images?.[0]?.url || "/audionix_logo_short.png"}
          alt=""
          width={50}
          height={50}
          className={`${
            data.type == "artist" ? "rounded-full" : "rounded-lg"
          } object-cover aspect-square`}
        />
        <div>
          <p>{data.name}</p>
          <p className="text-sm text-muted-foregrounds">
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
