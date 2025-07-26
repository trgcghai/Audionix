"use client";
import { Columns } from "@/app/(artist-portal)/artist-albums/components/table/Columns";
import AlbumTable from "@/app/(artist-portal)/artist-albums/components/table";
import { mockArtistAlbums } from "@/app/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import DetailAlbumCard from "@/components/common/DetailAlbumCard";
import { useEffect } from "react";
import { hideViewDetail } from "@/lib/features/detailAlbumSlice";

const ArtistAlbumPage = () => {
  const { album, isOpen } = useAppSelector((state) => state.detailAlbum);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(hideViewDetail());
    };
  }, [dispatch]);

  return (
    <ScrollArea className="px-3 h-full">
      <div className="flex items-start gap-10">
        <div className={`${isOpen ? "w-3/5" : "w-full"}`}>
          <p className="text-xl font-bold mb-4">Your albums</p>

          <AlbumTable
            columns={Columns}
            data={[
              ...mockArtistAlbums,
              ...mockArtistAlbums,
              ...mockArtistAlbums,
            ]}
          />
        </div>

        {isOpen && album && (
          <div className="w-2/5">
            <DetailAlbumCard album={album} />
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
export default ArtistAlbumPage;
