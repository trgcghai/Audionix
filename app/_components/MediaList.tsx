import Image from "next/image";
import {
  AlbumItem,
  ArtistItem,
  PlaylistItem,
  TrackItem,
} from "../types/component";
import Link from "next/link";

const PlaylistCard = ({ playlist }: { playlist: PlaylistItem }) => {
  return (
    <div className="p-3 hover:bg-gray-500/30 rounded-lg cursor-pointer">
      <Image
        src={playlist.images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="rounded-lg object-cover aspect-square"
      />
      <p className="text-md capitalize dark:text-white mt-2">{playlist.name}</p>
    </div>
  );
};

const AlbumCard = ({ album }: { album: AlbumItem }) => {
  return (
    <div className="p-3 hover:bg-gray-500/30 rounded-lg cursor-pointer">
      <Image
        src={album.images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="rounded-lg object-cover aspect-square"
      />
      <p className="text-md capitalize dark:text-white mt-2">{album.name}</p>
    </div>
  );
};

const TrackCard = ({ track }: { track: TrackItem }) => {
  return (
    <div className="p-3 hover:bg-gray-500/30 rounded-lg cursor-pointer">
      <Image
        src={track.album.images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="rounded-lg object-cover aspect-square"
      />
      <p className="text-md capitalize dark:text-white mt-2">{track.name}</p>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: ArtistItem }) => {
  return (
    <div className="p-3 hover:bg-gray-500/30 rounded-lg cursor-pointer">
      <Image
        src={artist.images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="rounded-full object-cover aspect-square"
      />
      <p className="text-md capitalize dark:text-white mt-2">{artist.name}</p>
    </div>
  );
};

const MediaList = ({
  title,
  data,
  className = "",
}: {
  title?: string;
  data: PlaylistItem[] | AlbumItem[] | ArtistItem[] | TrackItem[];
  className?: string;
}): React.ReactNode => {
  return (
    <div className={className}>
      <p className="px-3 text-xl dark:text-white font-semibold">{title}</p>
      <div className="grid grid-cols-7 mt-1">
        {data.map((item) => {
          if (item.type === "playlist") {
            return (
              <Link href={`/playlists/${item.id}`} key={item.id}>
                <PlaylistCard key={item.id} playlist={item as PlaylistItem} />
              </Link>
            );
          } else if (item.type === "album") {
            return (
              <Link href={`/albums/${item.id}`} key={item.id}>
                <AlbumCard key={item.id} album={item as AlbumItem} />
              </Link>
            );
          } else if (item.type === "artist") {
            return (
              <Link href={`/artists/${item.id}`} key={item.id}>
                <ArtistCard key={item.id} artist={item as ArtistItem} />
              </Link>
            );
          } else if (item.type === "track") {
            return (
              <Link href={`/tracks/${item.id}`} key={item.id}>
                <TrackCard key={item.id} track={item as TrackItem} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};
export default MediaList;
