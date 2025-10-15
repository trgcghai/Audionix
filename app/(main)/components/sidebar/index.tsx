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
  className?: string;
}

const MainSidebar = ({
  playlistData,
  albumData,
  artistData,
  className = "",
}: SidebarProps) => {
  const filterButtons = ["Playlists", "Artists", "Albums"];
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const isLoading =
    playlistData.isLoading || albumData.isLoading || artistData.isLoading;
  const isError =
    playlistData.isError || albumData.isError || artistData.isError;
  const errorMessage =
    playlistData.error || albumData.error || artistData.error;

  const filteredData = useMemo(() => {
    let data;
    switch (selectedFilter) {
      case "Playlists":
        data = playlistData.items;
        break;
      case "Albums":
        data = albumData.items;
        break;
      case "Artists":
        data = artistData.items;
        break;
      default:
        data = [...playlistData.items, ...albumData.items, ...artistData.items];
    }

    // Apply search filter
    if (searchTerm.trim()) {
      return data.filter((item) => {
        const title = "name" in item ? item.name : item.title;
        return title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return data;
  }, [
    selectedFilter,
    playlistData.items,
    albumData.items,
    artistData.items,
    searchTerm,
  ]);

  // return (
  //   <Card className={`h-full flex flex-col ${className}`}>
  //     <CardHeader className="flex-shrink-0">
  //       <CardTitle>
  //         <div className="flex items-center justify-between">
  //           <h2 className="text-lg font-semibold">Your library</h2>
  //           <CreatePlaylistButton />
  //         </div>
  //       </CardTitle>
  //       <CardDescription className="space-y-3">
  //         <FilterButtons
  //           selected={selectedFilter}
  //           onSelect={setSelectedFilter}
  //           options={filterButtons}
  //         />
  //         <div className="relative">
  //           <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
  //           <Input
  //             type="search"
  //             placeholder="Search your library"
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             className="pl-9 text-sm rounded-full border-muted-foreground/20 focus:border-primary"
  //           />
  //         </div>
  //       </CardDescription>
  //     </CardHeader>

  //     <CardContent className="flex-1 min-h-0 px-2 sm:px-4">
  //       <ScrollArea className="h-full">
  //         <div className="space-y-1 pb-4">
  //           {isLoading && (
  //             <div className="flex items-center justify-center py-8">
  //               <LoaderSpin />
  //             </div>
  //           )}

  //           {isError && (
  //             <div className="px-2">
  //               <ErrorMessage message={errorMessage} />
  //             </div>
  //           )}

  //           {!isLoading && !isError && filteredData.length === 0 && (
  //             <div className="text-center py-8 px-4">
  //               <p className="text-muted-foreground text-sm">
  //                 {searchTerm ? "No results found" : "Your library is empty"}
  //               </p>
  //               {!searchTerm && (
  //                 <p className="text-muted-foreground text-xs mt-1">
  //                   Create your first playlist to get started
  //                 </p>
  //               )}
  //             </div>
  //           )}

  //           {!isLoading &&
  //             !isError &&
  //             filteredData.map((item) => (
  //               <LibraryItem key={item._id} data={item} />
  //             ))}
  //         </div>
  //       </ScrollArea>
  //     </CardContent>
  //   </Card>
  // );

  return (
    <Card className={`h-full flex flex-col min-w-0 ${className}`}>
      <CardHeader className="flex-shrink-0 px-4">
        <CardTitle className="min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold truncate">Your library</h2>
            <CreatePlaylistButton />
          </div>
        </CardTitle>
        <CardDescription className="space-y-3">
          <FilterButtons
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            options={filterButtons}
          />
          <div className="relative min-w-0">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
            <Input
              type="search"
              placeholder="Search your library"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-sm rounded-full border-muted-foreground/20 focus:border-primary w-full"
            />
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 px-2 sm:px-4 w-full overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="space-y-1 pb-4 min-w-0">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <LoaderSpin />
              </div>
            )}

            {isError && (
              <div className="px-2">
                <ErrorMessage message={errorMessage} />
              </div>
            )}

            {!isLoading && !isError && filteredData.length === 0 && (
              <div className="text-center py-8 px-4">
                <p className="text-muted-foreground text-sm">
                  {searchTerm ? "No results found" : "Your library is empty"}
                </p>
                {!searchTerm && (
                  <p className="text-muted-foreground text-xs mt-1">
                    Create your first playlist to get started
                  </p>
                )}
              </div>
            )}

            {!isLoading &&
              !isError &&
              filteredData.map((item) => (
                <div key={item._id} className="min-w-0">
                  <LibraryItem data={item} />
                </div>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MainSidebar;
