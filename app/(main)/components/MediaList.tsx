import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { Album, Artist, Playlist, Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { Music, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MediaSkeleton = () => (
  <div className="rounded-lg p-2">
    <Skeleton className="aspect-square w-full h-full rounded-lg" />
    <Skeleton className="mt-2 h-4 w-3/4" />
  </div>
);

type CardType = "playlist" | "album" | "track" | "artist";

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
          className={`dark:text-foreground mt-2 text-sm capitalize ${
            isArtist ? "text-center" : ""
          }`}
        >
          {isArtist ? artistName : title}
        </p>
      </div>
    </Link>
  );
};

const getCardProps = (
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

interface MediaListProps {
  title?: string;
  data:
    | Playlist[]
    | Album[]
    | Artist[]
    | Track[]
    | (Artist & { totalFollowers: number })[];
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

const MediaList = ({
  title,
  data,
  className = "",
  error,
  isError,
  isLoading,
}: MediaListProps): React.ReactNode => {
  if (isLoading) {
    return (
      <div className={className}>
        <p className="px-2 text-lg font-semibold capitalize dark:text-white">
          {title}
        </p>
        <div className={`mt-1 grid grid-cols-${ITEM_PER_MEDIA_ROW} gap-2`}>
          {Array.from({ length: ITEM_PER_MEDIA_ROW }).map((_, idx) => (
            <MediaSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error || "An error occurred while fetching media"}
      />
    );
  }

  return (
    <div className={className}>
      <p className="px-2 text-lg font-semibold capitalize dark:text-white">
        {title}
      </p>
      <div className={`mt-1 grid grid-cols-${ITEM_PER_MEDIA_ROW}`}>
        {data.length === 0 && (
          <div
            className={`col-span-${ITEM_PER_MEDIA_ROW} flex w-full items-center justify-center`}
          >
            <ErrorMessage
              message={"No media found"}
              variant="inline"
              severity="info"
            />
          </div>
        )}
        {data.map((item, index) => {
          return <MediaCard key={item._id + index} {...getCardProps(item)} />;
        })}
      </div>
    </div>
  );
};
export default MediaList;
