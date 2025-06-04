"use client";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { TrackItem } from "@/app/types/component";
import { formatTrackDuration } from "@/app/_utils/formatTrackDuration";

const TrackRow = ({ index, track }: { index: number; track: TrackItem }) => {
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

export default TrackRow;
