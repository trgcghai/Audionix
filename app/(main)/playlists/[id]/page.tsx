import { Separator } from "@/components/ui/separator";
import { Clock, Dot, Play } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPlaylists, mockTracks } from "@/app/sampleData";
import HeroSection from "@/app/_components/HeroSection";
import TrackRow from "@/app/_components/TrackRow";

const Page = () => {
  return (
    <div>
      <HeroSection
        data={mockPlaylists[0]}
        extraInfo={
          <>
            <p>Playlist&apos;s creator</p>
            <Dot />
            <p>Playlist number items</p>
            <Dot />
            <p>Playlist total time</p>
          </>
        }
      />

      <Separator className="my-4" />

      <div>
        <div className="h-14 w-14 aspect-square scale-95 hover:scale-100 rounded-full transition-all duration-200 bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/80">
          <Play className="h-7 w-7 ml-1 block" fill="currentColor" />
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
export default Page;
