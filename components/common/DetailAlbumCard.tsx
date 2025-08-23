"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { hideViewDetail } from "@/store/slices/detailAlbumSlice";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TrackTable } from "../../app/(artist-portal)/artist-tracks/components/table";
import { TrackInAlbumColumns } from "../../app/(artist-portal)/artist-tracks/components/table/Columns";
import { ArtistAlbumItem } from "../../app/types/component";
import { useAppDispatch } from "../../hooks/redux";
import { formatUploadTime } from "../../utils/formatUploadTime";

const DetailAlbumCard = ({ album }: { album: ArtistAlbumItem }) => {
  const dispatch = useAppDispatch();
  const [coverImageError, setCoverImageError] = useState(false);

  const handleClose = () => {
    dispatch(hideViewDetail());
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Album Detail</CardTitle>
        <CardAction>
          <XIcon className="w-5 h-5 cursor-pointer" onClick={handleClose} />
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <div className="row-span-3 w-full">
          <p className="text-sm font-semibold mb-2">Cover Image</p>
          {coverImageError ? (
            <div
              className={`p-4 border w-full aspect-square rounded-lg flex items-center justify-center gap-2`}
            >
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
              <p>No image</p>
            </div>
          ) : (
            <Image
              src={album.images[0].url}
              alt={album.name}
              width={album.images[0].width}
              height={album.images[0].height}
              className="rounded-lg"
              onError={() => {
                setCoverImageError(true);
              }}
            />
          )}
        </div>

        <div className="row-span-3 flex flex-col justify-between">
          <div className="">
            <p className="text-sm font-semibold mb-2">Album Name</p>
            <p className="text-md p-2 border rounded-lg">{album.name}</p>
          </div>

          <div className="">
            <p className="text-sm font-semibold mb-2">Created Date</p>
            <p className="text-md p-2 border rounded-lg">
              {formatUploadTime(album.uploadTime)}
            </p>
          </div>

          <div className="">
            <p className="text-sm font-semibold mb-2">Album&apos;s status</p>
            <p className="text-md p-2 border rounded-lg capitalize">
              {album.status}
            </p>
          </div>
        </div>

        <Separator className="col-span-2 my-4" />

        <div className="col-span-2">
          <TrackTable
            columns={TrackInAlbumColumns}
            data={album.tracks}
            showActions={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default DetailAlbumCard;
