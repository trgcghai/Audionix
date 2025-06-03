"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  AlbumItem,
  ArtistItem,
  LibraryItemProps,
  PlaylistItem,
} from "../types/component";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const mockPlaylists: PlaylistItem[] = [
  {
    id: "pl1",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Chill Hits",
    tracks: { href: "https://api.example.com/playlists/pl1/tracks", total: 50 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl1",
  },
  {
    id: "pl2",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Rock Classics",
    tracks: { href: "https://api.example.com/playlists/pl2/tracks", total: 30 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl2",
  },
  {
    id: "pl3",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Pop Party",
    tracks: { href: "https://api.example.com/playlists/pl3/tracks", total: 40 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl3",
  },
  {
    id: "pl4",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Jazz Vibes",
    tracks: { href: "https://api.example.com/playlists/pl4/tracks", total: 25 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl4",
  },
  {
    id: "pl5",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
];

const mockAlbums: AlbumItem[] = [
  {
    id: "al1",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Summer Tunes",
    total_tracks: 12,
    type: "album",
    href: "https://api.example.com/albums/al1",
  },
  {
    id: "al2",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Winter Ballads",
    total_tracks: 10,
    type: "album",
    href: "https://api.example.com/albums/al2",
  },
  {
    id: "al3",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "City Lights",
    total_tracks: 15,
    type: "album",
    href: "https://api.example.com/albums/al3",
  },
  {
    id: "al4",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Road Trip",
    total_tracks: 8,
    type: "album",
    href: "https://api.example.com/albums/al4",
  },
  {
    id: "al5",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Night Drive",
    total_tracks: 14,
    type: "album",
    href: "https://api.example.com/albums/al5",
  },
];

const mockArtists: ArtistItem[] = [
  {
    id: "ar1",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "John Doe",
    type: "artist",
    href: "https://api.example.com/artists/ar1",
  },
  {
    id: "ar2",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Jane Smith",
    type: "artist",
    href: "https://api.example.com/artists/ar2",
  },
  {
    id: "ar3",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "The Band",
    type: "artist",
    href: "https://api.example.com/artists/ar3",
  },
  {
    id: "ar4",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Emma Wilson",
    type: "artist",
    href: "https://api.example.com/artists/ar4",
  },
  {
    id: "ar5",
    images: [{ url: "https://picsum.photos/60", height: 60, width: 60 }],
    name: "Cool Vibes",
    type: "artist",
    href: "https://api.example.com/artists/ar5",
  },
];

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
          <p className="text-sm">
            <span className="capitalize">{data.type}</span>
            {data.type !== "artist" && ` - ${getTrackCount()} items`}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const filterButtons = ["Playlists", "Artists", "Albums"];
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p>Your library</p>
            <Button
              variant="default"
              className="rounded-full text-md font-semibold"
            >
              <Plus />
              <span className="">Create</span>
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="space-y-4">
          <div className="flex gap-2 mt-2">
            {selectedFilter ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFilter("")}
                  className="text-sm font-medium aspect-square rounded-full"
                >
                  <XIcon />
                </Button>
                <Button
                  variant="default"
                  className="text-sm font-medium rounded-full"
                >
                  {selectedFilter}
                </Button>
              </>
            ) : (
              filterButtons.map((button) => (
                <Button
                  key={button}
                  onClick={() => setSelectedFilter(button)}
                  variant="outline"
                  className="text-md font-medium rounded-full dark:text-white"
                >
                  {button}
                </Button>
              ))
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search your library"
              className="pl-8 rounded-full placeholder:text-md"
            />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <ScrollArea className="overflow-y-auto h-[610px]">
          <div className="flex flex-col gap-2">
            {selectedFilter === "Playlists" &&
              mockPlaylists.map((playlist) => (
                <LibraryItem key={playlist.id} data={playlist} />
              ))}
            {selectedFilter === "Albums" &&
              mockAlbums.map((album) => (
                <LibraryItem key={album.id} data={album} />
              ))}
            {selectedFilter === "Artists" &&
              mockArtists.map((artist) => (
                <LibraryItem key={artist.id} data={artist} />
              ))}
            {!selectedFilter && (
              <>
                {mockPlaylists.map((playlist) => (
                  <LibraryItem key={playlist.id} data={playlist} />
                ))}
                {mockAlbums.map((album) => (
                  <LibraryItem key={album.id} data={album} />
                ))}
                {mockArtists.map((artist) => (
                  <LibraryItem key={artist.id} data={artist} />
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default Sidebar;
