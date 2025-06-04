"use client";
import HeroSection from "@/app/_components/HeroSection";
import MediaList from "@/app/_components/MediaList";
import TrackRow from "@/app/_components/TrackRow";
import { mockAlbums, mockTracks } from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody } from "@/components/ui/table";
import { Dot, Ellipsis, Heart, Play } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <HeroSection
        data={mockTracks[0]}
        extraInfo={
          <>
            <p>Artist</p>
            <Dot />
            <p>Length</p>
            <Dot />
            <p>Year released</p>
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
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full scale-95 hover:scale-100 transition-all duration-200"
        >
          <Heart className="h-7 w-7 ml-0.5" fill="currentColor" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full scale-95 hover:scale-100 transition-all duration-200"
        >
          <Ellipsis className="h-7 w-7 ml-0.5" fill="currentColor" />
        </Button>
      </div>

      <div className="flex gap-4 items-center mt-8">
        <Image
          src={"/audionix_logo_short.png"}
          alt=""
          width={90}
          height={90}
          className={"rounded-full"}
        />
        <div className="">
          <p className="text-foreground text-sm font-semibold capitalize">
            Artist
          </p>
          <p className="text-lg font-bold capitalize">Artist name</p>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-xl font-bold px-3">Popular tracks by artist</p>
        <Table className="mt-4">
          <TableBody className="">
            {mockTracks.map((track, index) => (
              <TrackRow
                key={track.id + index}
                track={track}
                index={index + 1}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-12">
        <p className="text-xl font-bold px-3">Popular albums by artist</p>
        <MediaList data={mockAlbums} />
      </div>

      <div className="mt-12">
        <p className="text-xl font-bold px-3">Fan also like</p>
        <MediaList data={mockTracks} />
      </div>
    </div>
  );
};
export default Page;
