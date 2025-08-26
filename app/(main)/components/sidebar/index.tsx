"use client";
import CreatePlaylistButton from "@/app/(main)/components/sidebar/CreatePlaylistButton";
import FilterButtons from "@/app/(main)/components/sidebar/FilterButtons";
import LibraryItem from "@/app/(main)/components/sidebar/LibraryItem";
import { Album, Artist, Playlist } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type DataSection<T> = {
  items: T[];
  isLoading: boolean;
  isError: boolean;
  error: string;
};

interface SidebarProps {
  playlistData: DataSection<Playlist>;
  albumData: DataSection<Album>;
  artistData: DataSection<Artist>;
}

const MainSidebar = ({ playlistData, albumData, artistData }: SidebarProps) => {
  const filterButtons = ["Playlists", "Artists", "Albums"];
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const isLoading =
    playlistData.isLoading || albumData.isLoading || artistData.isLoading;
  const isError =
    playlistData.isError || albumData.isError || artistData.isError;
  const errorMessage =
    playlistData.error || albumData.error || artistData.error;

  const filteredData = useMemo(() => {
    switch (selectedFilter) {
      case "Playlists":
        return playlistData.items;
      case "Albums":
        return albumData.items;
      case "Artists":
        return artistData.items;
      default:
        return [...playlistData.items, ...albumData.items, ...artistData.items];
    }
  }, [selectedFilter, playlistData.items, albumData.items, artistData.items]);

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
            {isLoading && <LoaderSpin />}
            {isError && <ErrorMessage message={errorMessage} />}

            {filteredData.map((item) => (
              <LibraryItem key={item._id} data={item} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default MainSidebar;
