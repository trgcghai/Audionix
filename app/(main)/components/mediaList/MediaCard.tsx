import { CardType } from "@/app/(main)/components/mediaList/MediaList";
import { Album, Artist, Playlist, Track } from "@/app/types/model";
import { Music, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  type: CardType;
  title: string;
  image?: string;
  link: string;
  isArtist?: boolean;
  artistName?: string;
  width?: number;
  height?: number;
}

export const getCardProps = (
  item: Playlist | Album | Artist | Track,
): MediaCardProps => {
  switch (item.type) {
    case "playlist":
      return {
        type: "playlist",
        title: item.title,
        image: item.cover_images?.[0]?.url || "",
        link: `/playlists/${item._id}`,
        width: item.cover_images?.[0]?.width,
        height: item.cover_images?.[0]?.height,
      };
    case "album":
      return {
        type: "album",
        title: item.title,
        image: item.cover_images?.[0]?.url || "",
        link: `/albums/${item._id}`,
        width: item.cover_images?.[0]?.width,
        height: item.cover_images?.[0]?.height,
      };
    case "track":
      return {
        type: "track",
        title: item.title,
        image: item.cover_images?.[0]?.url || "",
        link: `/tracks/${item._id}`,
        width: item.cover_images?.[0]?.width,
        height: item.cover_images?.[0]?.height,
      };
    case "artist":
      return {
        type: "artist",
        title: item.name,
        image: item.cover_images?.[0]?.url || "",
        link: `/artists/${item._id}`,
        isArtist: true,
        artistName: item.name,
        width: item.cover_images?.[0]?.width,
        height: item.cover_images?.[0]?.height,
      };
    default:
      return {
        type: "track",
        title: "",
        image: "",
        link: "#",
      };
  }
};

const MediaCard = ({
  type,
  title,
  image,
  link,
  isArtist = false,
  artistName,
  width,
  height,
}: MediaCardProps) => {
  const isRound = type === "artist";
  const fallbackIcon =
    type === "artist" ? (
      <User2 className="h-10 w-10" />
    ) : (
      <Music className="h-10 w-10" />
    );
  return (
    <Link href={link}>
      <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500/30 relative aspect-square w-full h-full">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={width || 500}
            height={height || 500}
            quality={100}
            className={`aspect-square object-cover ${
              isRound ? "rounded-full" : "rounded-lg"
            }`}
          />
        ) : (
          <div
            className={`bg-muted flex aspect-square w-full items-center justify-center ${
              isRound ? "rounded-full" : "rounded-lg"
            }`}
          >
            {fallbackIcon}
          </div>
        )}
        <p
          className={`dark:text-foreground w-full truncate mt-2 text-base capitalize ${
            isArtist ? "text-center" : ""
          }`}
        >
          {isArtist ? artistName : title}
        </p>
      </div>
    </Link>
  );
};

export default MediaCard;
