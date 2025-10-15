import MediaCard, {
  getCardProps,
} from "@/app/(main)/components/mediaList/MediaCard";
import MediaSkeleton from "@/app/(main)/components/mediaList/MediaSkeleton";
import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { Album, Artist, Playlist, Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";

export type CardType = "playlist" | "album" | "track" | "artist";

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
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  };

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
      <div className={`mt-1 grid ${gridColsClass[ITEM_PER_MEDIA_ROW]}`}>
        {data.length === 0 && (
          <div
            className={`${colSpanClass[ITEM_PER_MEDIA_ROW]} flex w-full items-center justify-center`}
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
