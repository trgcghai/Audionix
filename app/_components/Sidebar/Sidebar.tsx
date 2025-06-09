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
import { mockAlbums, mockArtists, mockPlaylists } from "../../sampleData";
import LibraryItem from "./LibraryItem";
import CreatePlaylistButton from "./CreatePlaylistButton";
import FilterButtons from "./FilterButtons";

const Sidebar = () => {
  const filterButtons = ["Playlists", "Artists", "Albums"];
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p>Your library</p>
            <CreatePlaylistButton
              isOpen={isPopoverOpen}
              onOpenChange={setIsPopoverOpen}
            />
          </div>
        </CardTitle>
        <CardDescription className="space-y-4">
          <FilterButtons
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            options={filterButtons}
          />
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
        <ScrollArea className="overflow-y-auto h-[600px]">
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
