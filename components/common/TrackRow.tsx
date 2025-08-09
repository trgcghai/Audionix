"use client";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { SimpleTrackTablesVariant } from "@/app/types/component";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { Button } from "@/components/ui/button";
import { Track } from "@/app/types/model";
import { useMemo } from "react";

const RenderByVariant = ({
  index,
  track,
  variant = "default",
}: TrackRowProps) => {
  const albumName = useMemo(() => track?.album?.name || "-", [track.album]);

  if (variant === "addToPlaylist") {
    return (
      <TableRow className="rounded-lg border-b-0">
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Image
              src={track.cover_images[0].url}
              alt={track.title}
              width={40}
              height={40}
              className="aspect-square rounded object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist.name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-sm font-medium">{albumName}</p>
        </TableCell>
        <TableCell className="rounded-tr-lg rounded-br-lg text-end">
          <Button
            variant="outline"
            className="h-8 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Adding ${track.title} to playlist`);
            }}
          >
            Add
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="rounded-lg border-b-0">
      <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
        <p className="text-sm text-gray-500">{index}</p>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={track.cover_images[0].url}
            alt={track.title}
            width={40}
            height={40}
            className="aspect-square rounded object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{track.title}</p>
            <p className="text-sm text-gray-500">{track.artist.name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-sm font-medium">{albumName}</p>
      </TableCell>
      <TableCell>
        <p className="text-sm font-medium">Time added to playlist</p>
      </TableCell>
      <TableCell className="rounded-tr-lg rounded-br-lg">
        <p className="text-sm font-medium">
          {formatTrackDuration(track.duration_ms)}
        </p>
      </TableCell>
    </TableRow>
  );
};

const TrackRow = ({ index, track, variant = "default" }: TrackRowProps) => {
  return <RenderByVariant index={index} track={track} variant={variant} />;
};

export default TrackRow;

interface TrackRowProps {
  index: number;
  track: Track;
  variant?: SimpleTrackTablesVariant;
}
