"use client";
import EditAlbumForm from "@/app/(artist-portal)/artist-albums/components/EditAlbumForm";
import { mockArtistAlbums } from "@/app/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateAlbumPage = () => {
  const { id } = useParams();
  const album = useMemo(
    () => mockArtistAlbums.find((album) => album.id === id),
    [id]
  );

  return (
    <ScrollArea className="w-4xl mx-auto">
      <EditAlbumForm album={album} />
    </ScrollArea>
  );
};
export default UpdateAlbumPage;
