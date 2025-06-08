"use client";
import { mockAlbums, mockArtists, mockTracks } from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody } from "@/components/ui/table";
import { Dot } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaList from "@/app/_components/MediaList";
import HeroSection from "@/app/_components/HeroSection";
import TrackRow from "@/app/_components/TrackRow";

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
