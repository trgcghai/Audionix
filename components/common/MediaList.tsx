import Image from "next/image";
import {
  AlbumItem,
  ArtistItem,
  PlaylistItem,
  TrackItem,
} from "../../app/types/component";
import Link from "next/link";

const PlaylistCard = ({ playlist }: { playlist: PlaylistItem }) => {
  return (
    <div className="cursor-pointer rounded-lg p-3 hover:bg-gray-500/30">
      <Image
        src={playlist.cover_images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="aspect-square rounded-lg object-cover"
      />
      <p className="text-md mt-2 capitalize dark:text-white">{playlist.name}</p>
    </div>
  );
};

const AlbumCard = ({ album }: { album: AlbumItem }) => {
  return (
    <div className="cursor-pointer rounded-lg p-3 hover:bg-gray-500/30">
      <Image
        src={album.cover_images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="aspect-square rounded-lg object-cover"
      />
      <p className="text-md mt-2 capitalize dark:text-white">{album.name}</p>
    </div>
  );
};

const TrackCard = ({ track }: { track: TrackItem }) => {
  return (
    <div className="cursor-pointer rounded-lg p-3 hover:bg-gray-500/30">
      <Image
        src={track.cover_images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="aspect-square rounded-lg object-cover"
      />
      <p className="text-md mt-2 capitalize dark:text-white">{track.name}</p>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: ArtistItem }) => {
  return (
    <div className="cursor-pointer rounded-lg p-3 hover:bg-gray-500/30">
      <Image
        src={artist.cover_images[0].url || "/audionix_logo_short.png"}
        alt=""
        width={200}
        height={200}
        className="aspect-square rounded-full object-cover"
      />
      <p className="text-md mt-2 capitalize dark:text-white">{artist.name}</p>
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
      <p className="px-3 text-xl font-semibold dark:text-white">{title}</p>
      <div className="mt-1 grid grid-cols-7">
        {data.map((item, index) => {
          if (item.type === "playlist") {
            return (
              <Link href={`/playlists/${item._id}`} key={item._id + index}>
                <PlaylistCard key={item._id} playlist={item as PlaylistItem} />
              </Link>
            );
          } else if (item.type === "album") {
            return (
              <Link href={`/albums/${item._id}`} key={item._id + index}>
                <AlbumCard key={item._id} album={item as AlbumItem} />
              </Link>
            );
          } else if (item.type === "artist") {
            return (
              <Link href={`/artists/${item._id}`} key={item._id + index}>
                <ArtistCard key={item._id} artist={item as ArtistItem} />
              </Link>
            );
          } else if (item.type === "track") {
            return (
              <Link href={`/tracks/${item._id}`} key={item._id + index}>
                <TrackCard key={item._id} track={item as TrackItem} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};
export default MediaList;
