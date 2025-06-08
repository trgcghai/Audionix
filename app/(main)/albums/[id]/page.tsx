"use client";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { mockAlbums, mockTracks } from "@/app/sampleData";
import { useState } from "react";
import MediaList from "@/app/_components/MediaList";
import HeroSection from "@/app/_components/HeroSection";
import ControlSection from "@/app/_components/ControlSection";
import TableTrack from "@/app/_components/DetailPlaylist/TableTrack";

const DetailAlbumPage = () => {
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

      <ControlSection 
        onPlay={() => console.log("Play album")}
        onFollow={() => setIsFollowing(!isFollowing)}
        variant="album"
        isFollowing={isFollowing}
      />

      <TableTrack tracks={[...mockTracks, ...mockTracks]} />

      <MediaList
        className="mt-12"
        data={mockTracks}
        title={`More from artist name`}
      />
    </div>
  );
};
export default DetailAlbumPage;
