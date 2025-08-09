"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockAlbums, mockArtists } from "@/app/sampleData";
import { Playlist } from "@/app/types/model";
import CreatePlaylistButton from "@/app/(main)/components/sidebar/CreatePlaylistButton";
import FilterButtons from "@/app/(main)/components/sidebar/FilterButtons";
import LibraryItem from "@/app/(main)/components/sidebar/LibraryItem";

interface SidebarProps {
  playlists: Playlist[];
}

const MainSidebar = ({ playlists }: SidebarProps) => {
  const filterButtons = ["Playlists", "Artists", "Albums"];
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p>Your library</p>
            <CreatePlaylistButton />
          </div>
        </CardTitle>
        <CardDescription className="space-y-4">
          <FilterButtons
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            options={filterButtons}
          />
          <div className="relative">
            <Search className="absolute top-2 left-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search your library"
              className="placeholder:text-md rounded-full pl-8"
            />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <ScrollArea className="h-[600px] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {selectedFilter === "Playlists" &&
              playlists.map((playlist) => (
                <LibraryItem key={playlist._id} data={playlist} />
              ))}
            {selectedFilter === "Albums" &&
              mockAlbums.map((album) => (
                <LibraryItem key={album._id} data={album} />
              ))}
            {selectedFilter === "Artists" &&
              mockArtists.map((artist) => (
                <LibraryItem key={artist._id} data={artist} />
              ))}
            {!selectedFilter && (
              <>
                {playlists.map((playlist) => (
                  <LibraryItem key={playlist._id} data={playlist} />
                ))}
                {mockAlbums.map((album) => (
                  <LibraryItem key={album._id} data={album} />
                ))}
                {mockArtists.map((artist) => (
                  <LibraryItem key={artist._id} data={artist} />
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default MainSidebar;
