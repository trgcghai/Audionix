"use client";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { mockAlbums, mockTracks } from "@/app/sampleData";
import { useState } from "react";
import MediaList from "@/components/common/MediaList";
import HeroSection from "@/components/common/HeroSection";
import ControlSection from "@/components/common/ControlSection";
import TableTrack from "@/components/common/SimpleTrackTable";

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
