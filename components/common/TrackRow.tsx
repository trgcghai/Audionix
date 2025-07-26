"use client";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { TrackItem } from "@/app/types/component";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { Button } from "@/components/ui/button";
import { SimpleTrackTablesVariant } from "../../app/constant";

const RenderByVariant = ({
  index,
  track,
  variant = "default",
}: TrackRowProps) => {
  if (variant === "addToPlaylist") {
    return (
      <TableRow className="border-b-0 rounded-lg">
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Image
              src={track.album.images[0].url}
              alt={track.name}
              width={40}
              height={40}
              className="rounded"
            />
            <div>
              <p className="text-sm font-semibold">{track.name}</p>
              <p className="text-sm text-gray-500">{track.artists[0].name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-sm font-medium">{track.album.name}</p>
        </TableCell>
        <TableCell className="rounded-tr-lg rounded-br-lg text-end">
          <Button
            variant="outline"
            className="text-sm font-medium h-8 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Adding ${track.name} to playlist`);
            }}
          >
            Add
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="border-b-0 rounded-lg">
      <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
        <p className="text-sm text-gray-500">{index}</p>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <p className="text-sm font-semibold">{track.name}</p>
            <p className="text-sm text-gray-500">{track.artists[0].name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-sm font-medium">{track.album.name}</p>
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
  track: TrackItem;
  variant?: SimpleTrackTablesVariant;
}
