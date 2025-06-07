"use client";
import Image from "next/image";
import {
  AlbumItem,
  ArtistItem,
  PlaylistItem,
  TrackItem,
} from "../types/component";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPlaylistForm from "./Form/EditPlaylistForm";

interface HeroSectionProps {
  data: AlbumItem | ArtistItem | PlaylistItem | TrackItem;
  extraInfo?: ReactNode;
}

const HeroSection = ({ data, extraInfo }: HeroSectionProps) => {


  if (data.type !== "playlist") {
    return (
      <div className="flex gap-4 items-end cursor-default">
        <Image
          src={data?.images[0].url || "/audionix_logo_short.png"}
          alt=""
          width={220}
          height={220}
          className={data.type === "artist" ? "rounded-full" : "rounded-lg"}
        />
        <div className="flex flex-col gap-6 justify-end">
          <p className="text-foreground text-sm font-semibold capitalize">
            {data.type}
          </p>
          <p className="text-7xl font-bold capitalize">{data.name}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {extraInfo}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="block">
        <div className="flex gap-4 items-end cursor-pointer">
          <Image
            src={data?.images[0].url}
            alt=""
            width={220}
            height={220}
            className={"rounded-lg"}
          />
          <div className="flex flex-col gap-6 justify-end items-start">
            <p className="text-foreground text-sm font-semibold capitalize">
              {data.type}
            </p>
            <p className="text-7xl font-bold capitalize">{data.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {extraInfo}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit detail</DialogTitle>
        </DialogHeader>
        {data.type === "playlist" && (
          <EditPlaylistForm data={data as PlaylistItem} />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default HeroSection;
