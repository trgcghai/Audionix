import { Album, Artist, Playlist } from "@/app/types/model";
import { Music, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Type guards for better type safety
const isArtist = (item: LibraryItemData): item is Artist =>
  item.type === "artist";
const isPlaylist = (item: LibraryItemData): item is Playlist =>
  item.type === "playlist";
const isAlbum = (item: LibraryItemData): item is Album => item.type === "album";

// Types
type LibraryItemData = Playlist | Album | Artist;
interface LibraryItemProps {
  data: LibraryItemData;
}

// ItemImage component for the left side image/icon
const ItemImage = ({ data }: { data: LibraryItemData }) => {
  const hasCoverImage =
    Array.isArray(data.cover_images) && data.cover_images.length > 0;
  const isRounded = isArtist(data);

  if (hasCoverImage) {
    return (
      <Image
        src={data.cover_images[0]?.url || "/audionix_logo_short.png"}
        alt={getItemTitle(data)}
        width={data.cover_images[0]?.width || 200}
        height={data.cover_images[0]?.height || 200}
        className={`aspect-square object-cover h-[60px] w-[60px] ${
          isRounded ? "rounded-full" : "rounded-lg"
        }`}
      />
    );
  }

  return (
    <div
      className={`bg-muted flex h-[60px] w-[60px] items-center justify-center ${
        isRounded ? "rounded-full" : "rounded-lg"
      }`}
    >
      {isRounded ? (
        <User2 className="h-5 w-5" />
      ) : (
        <Music className="h-5 w-5" />
      )}
    </div>
  );
};

// Helper function to get the title
const getItemTitle = (data: LibraryItemData): string => {
  if ("name" in data) return data.name;
  if ("title" in data) return data.title;
  return "Untitled item";
};

// Helper function to get the subtitle
const getItemSubtitle = (data: LibraryItemData): string => {
  let subtitle = data.type;

  // Add track count for playlists and albums
  if ((isPlaylist(data) || isAlbum(data)) && "tracks" in data) {
    subtitle += ` - ${data.tracks.length} items`;
  }

  return subtitle;
};

const LibraryItem = ({ data }: LibraryItemProps) => {
  const title = getItemTitle(data);
  const subtitle = getItemSubtitle(data);

  return (
    <Link href={`/${data.type}s/${data._id}`}>
      <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-500/30">
        <ItemImage data={data} />
        <div>
          <p>{title}</p>
          <p className="text-muted-foreground text-sm">
            <span className="capitalize">{subtitle}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LibraryItem;
