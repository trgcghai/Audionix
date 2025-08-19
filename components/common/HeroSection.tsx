"use client";
import Image from "next/image";
import { AlbumItem, ArtistItem } from "../../app/types/component";
import { ReactNode, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPlaylistForm from "../../app/(main)/playlists/components/form/EditPlaylistForm";
import { Dot, ImageIcon, Music } from "lucide-react";
import { Playlist, Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import formatTotalTime from "@/utils/formatTotalTime";

interface HeroSectionProps {
  data: AlbumItem | ArtistItem | Playlist | Track;
  extraInfo?: ReactNode;
}

const HeroSection = ({ data, extraInfo }: HeroSectionProps) => {
  const title = useMemo(() => {
    if ("name" in data) return data.name;
    if ("title" in data) return data.title;
    return "";
  }, [data]);

  if (data.type !== "playlist") {
    return (
      <div className="flex cursor-default items-end gap-4">
        {data ? (
          <Image
            src={data?.cover_images[0].url}
            alt=""
            width={220}
            height={220}
            className={data.type === "artist" ? "rounded-full" : "rounded-lg"}
          />
        ) : (
          <div className="bg-muted flex h-[220px] w-[220px] items-center justify-center rounded-lg">
            <ImageIcon />
          </div>
        )}
        <div className="flex flex-col justify-end gap-6">
          <p className="text-foreground text-sm font-semibold capitalize">
            {data.type || ""}
          </p>
          <p className="text-7xl font-bold capitalize">{title}</p>
          {extraInfo && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              {extraInfo}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (data.type == "playlist") {
    const playlist = data as Playlist;
    return (
      <Dialog>
        <DialogTrigger className="block">
          <div className="flex cursor-pointer items-end gap-4">
            {playlist.cover_images.length > 0 ? (
              <Image
                src={playlist?.cover_images[0].url}
                alt=""
                width={220}
                height={220}
                className={"aspect-square rounded-lg object-cover"}
              />
            ) : (
              <div className="bg-muted flex h-[220px] w-[220px] items-center justify-center rounded-lg">
                <Music className="h-20 w-20" />
              </div>
            )}
            <div className="flex flex-col items-start justify-end gap-6">
              <p className="text-foreground text-sm font-semibold capitalize">
                {data.type}
              </p>
              <p className="text-start text-7xl font-bold capitalize">
                {title}
              </p>
              <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
                {playlist?.description && <p>{playlist?.description}</p>}
                <div className="flex items-center gap-2">
                  <p>
                    {formatTotalTime(
                      playlist.tracks.reduce(
                        (prev, curr) => prev + parseInt(curr.duration_ms),
                        0,
                      ),
                    )}
                  </p>
                  <Dot />
                  <p>{playlist?.tracks.length} tracks</p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="!max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit detail</DialogTitle>
          </DialogHeader>
          {data.type === "playlist" && (
            <EditPlaylistForm data={data as Playlist} />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return <ErrorMessage message="Invalid data type for HeroSection" />;
};
export default HeroSection;
