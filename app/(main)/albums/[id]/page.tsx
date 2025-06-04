"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Dot, Play } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAlbums, mockTracks } from "@/app/sampleData";
import { useState } from "react";
import MediaList from "@/app/_components/MediaList";
import HeroSection from "@/app/_components/HeroSection";
import TrackRow from "@/app/_components/TrackRow";

const Page = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div>
      <HeroSection
        data={mockAlbums[0]}
        extraInfo={
          <>
            <p>Album&apos;s author</p>
            <Dot />
            <p>Album number items</p>
            <Dot />
            <p>Album total time</p>
          </>
        }
      />

      <Separator className="my-4" />

      <div className="flex items-center gap-4">
        <Button
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full scale-95 hover:scale-100 transition-all duration-200"
        >
          <Play className="h-7 w-7 ml-0.5" fill="currentColor" />
        </Button>

        <Button
          variant={"outline"}
          className="rounded-full"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
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

      <MediaList
        className="mt-12"
        data={mockTracks}
        title={`More from artist name`}
      />
    </div>
  );
};
export default Page;
