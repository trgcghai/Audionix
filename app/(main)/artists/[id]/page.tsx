"use client";
import { mockAlbums, mockArtists, mockTracks } from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaList from "@/components/common/MediaList";
import HeroSection from "@/components/common/HeroSection";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";

const DetailArtistPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="">
      <HeroSection
        data={mockArtists[0]}
        extraInfo={
          <>
            <Button
              variant={isFollowing ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Dot />
            <p>Artist total tracks</p>
            <Dot />
            <p>Artist total albums</p>
          </>
        }
      />

      <Separator className="my-4" />

      <div className="px-3">
        <p className="text-xl font-bold">Popular tracks</p>
        <SimpleTrackTable tracks={mockTracks} showHeader={false} />
      </div>

      <div className="mt-12 px-3">
        <p className="text-xl font-bold">Latest products</p>
        <Tabs defaultValue="albums" className="mt-4">
          <TabsList className="">
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="singles">Singles</TabsTrigger>
          </TabsList>
          <TabsContent value="albums" className="-mx-3">
            <MediaList data={mockAlbums} />
          </TabsContent>
          <TabsContent value="singles" className="-mx-3">
            <MediaList data={mockTracks} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 px-3">
        <p className="text-xl font-bold">Fan also like</p>
        <MediaList data={mockArtists} />
      </div>
    </div>
  );
};
export default DetailArtistPage;
