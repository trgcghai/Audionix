import { Album, Artist, Playlist, Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Music, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500/30">
      {playlist.cover_images.length > 0 ? (
        <Image
          src={
            playlist.cover_images.length > 0
              ? playlist.cover_images[0].url
              : "/audionix_logo_short.png"
          }
          alt=""
          width={200}
          height={200}
          className="aspect-square rounded-lg object-cover w-full h-full"
        />
      ) : (
        <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
          <Music className="h-10 w-10" />
        </div>
      )}
      <p className="dark:text-foreground mt-2 text-sm capitalize">
        {playlist.title}
      </p>
    </div>
  );
};

const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500/30">
      {album.cover_images.length > 0 ? (
        <Image
          src={
            album.cover_images.length > 0
              ? album.cover_images[0].url
              : "/audionix_logo_short.png"
          }
          alt=""
          width={200}
          height={200}
          className="aspect-square rounded-lg object-cover w-full h-full"
        />
      ) : (
        <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
          <Music className="h-10 w-10" />
        </div>
      )}
      <p className="dark:text-foreground mt-2 text-sm capitalize">
        {album.title}
      </p>
    </div>
  );
};

const TrackCard = ({ track }: { track: Track }) => {
  return (
    <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500/30">
      {track.cover_images.length > 0 ? (
        <Image
          src={
            track.cover_images.length > 0
              ? track.cover_images[0].url
              : "/audionix_logo_short.png"
          }
          alt=""
          width={200}
          height={200}
          className="aspect-square rounded-lg object-cover w-full h-full"
        />
      ) : (
        <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
          <Music className="h-10 w-10" />
        </div>
      )}
      <p className="dark:text-foreground mt-2 text-sm capitalize">
        {track.title}
      </p>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500/30">
      {artist.cover_images.length > 0 ? (
        <Image
          src={
            artist.cover_images.length > 0
              ? artist.cover_images[0].url
              : "/audionix_logo_short.png"
          }
          alt=""
          width={200}
          height={200}
          className="aspect-square rounded-full object-cover"
        />
      ) : (
        <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-full">
          <User2 className="h-10 w-10" />
        </div>
      )}
      <p className="dark:text-foreground mt-2 text-center text-sm capitalize">
        {artist.name}
      </p>
    </div>
  );
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
    return <LoaderSpin />;
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
      <div className="mt-1 grid grid-cols-7">
        {data.length === 0 && (
          <div className="col-span-7 flex w-full items-center justify-center">
            <ErrorMessage
              message={"No media found"}
              variant="inline"
              severity="info"
            />
          </div>
        )}
        {data.map((item, index) => {
          if (item.type === "playlist") {
            return (
              <Link href={`/playlists/${item._id}`} key={item._id + index}>
                <PlaylistCard
                  key={item._id}
                  playlist={item satisfies Playlist}
                />
              </Link>
            );
          } else if (item.type === "album") {
            return (
              <Link href={`/albums/${item._id}`} key={item._id + index}>
                <AlbumCard key={item._id} album={item satisfies Album} />
              </Link>
            );
          } else if (item.type === "artist") {
            return (
              <Link href={`/artists/${item._id}`} key={item._id + index}>
                <ArtistCard key={item._id} artist={item satisfies Artist} />
              </Link>
            );
          } else if (item.type === "track") {
            return (
              <Link href={`/tracks/${item._id}`} key={item._id + index}>
                <TrackCard key={item._id} track={item satisfies Track} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};
export default MediaList;
