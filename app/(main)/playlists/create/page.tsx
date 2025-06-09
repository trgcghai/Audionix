import HeroSection from "@/app/_components/HeroSection";
import TrackRow from "@/app/_components/TrackRow";
import { mockTracks } from "@/app/sampleData";
import { PlaylistItem } from "@/app/types/component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Repeat, CornerDownLeft, Clock } from "lucide-react";

const CreatePlaylistPage = () => {
  const newPlaylist: PlaylistItem = {
    id: "new-playlist",
    name: "New AI Playlist",
    type: "playlist",
    images: [],
    tracks: {
      href: "",
      total: 0,
    },
    description: "",
    href: "",
  };

  return (
    <div>
      <HeroSection data={newPlaylist} />

      <Separator className="my-4" />

      <div>
        <div className="flex items-center justify-start">
          <Button
            variant="default"
            className="rounded-full text-md font-semibold gap-1"
          >
            <Plus className="h-4 w-4" />
            <span className="ml-1">Create</span>
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-start gap-2">
          <Input
            className="rounded-full w-2/5"
            placeholder="Describe the musical experience you want (e.g. 'Jazz for a dinner party')"
          />
          <Input
            type="number"
            placeholder="Number of tracks, default is 20"
            min={1}
            className="rounded-full w-1/5"
          />

          <Button
            variant="default"
            className="rounded-full aspect-square text-md font-semibold h-10 w-10"
          >
            <CornerDownLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full aspect-square text-md font-semibold h-10 w-10"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow className="cursor-default">
            <TableHead className="text-xs font-bold text-gray-400 rounded-tl-lg rounded-bl-lg">
              #
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400">
              Title
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400">
              Album
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400">
              Date added
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400 rounded-tr-lg rounded-br-lg">
              <Clock className="w-4 h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {[...mockTracks, ...mockTracks].map((track, index) => (
            <TrackRow key={track.id + index} track={track} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default CreatePlaylistPage;
