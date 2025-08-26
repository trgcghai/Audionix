"use client";
import EditAlbumForm from "@/app/(artist-portal)/artist-albums/components/form/EditAlbumForm";
import { mockArtistAlbums } from "@/app/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateAlbumPage = () => {
  const { id } = useParams();
  const album = useMemo(
    () => mockArtistAlbums.find((album) => album.id === id),
    [id],
  );

  return (
    <ScrollArea className="mx-auto w-4xl">
      <EditAlbumForm album={album} />
    </ScrollArea>
  );
};
export default UpdateAlbumPage;
