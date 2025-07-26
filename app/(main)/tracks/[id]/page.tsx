"use client";
import ControlSection from "@/components/common/ControlSection";
import TableTrack from "@/components/common/SimpleTrackTable";
import HeroSection from "@/components/common/HeroSection";
import MediaList from "@/components/common/MediaList";
import { mockAlbums, mockTracks } from "@/app/sampleData";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const DetailTrackPage = () => {
  const [isLiked, setIsLiked] = useState(false);
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

      <ControlSection
        onPlay={() => console.log("Play track")}
        onAddToPlaylist={() => console.log("Add to playlist")}
        onLike={() => setIsLiked(!isLiked)}
        isLiked={isLiked}
        variant="track"
      />

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
        <TableTrack tracks={mockTracks} showHeader={false} />
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
export default DetailTrackPage;
