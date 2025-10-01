"use client";
import { Playlist, Track } from "@/app/types/model";
import { SimpleTrackTablesVariant } from "@/components/common/SimpleTrackTable";
import useTrackRow from "@/components/common/SimpleTrackTable/useTrackRow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { Ellipsis, Trash2 } from "lucide-react";

const TrackRow = ({
  index,
  track,
  onClick = () => {},
  variant = "default",
  showAction = true,
}: TrackRowProps) => {
  const {
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleRemoveFromAlbum,
    albumName,
  } = useTrackRow({ track });

  if (variant === "searchResult") {
    return (
      <TableRow className="rounded-lg border-b-0" onClick={onClick}>
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell className="w-1/2">
          <p className="text-sm font-semibold">{track.title}</p>
        </TableCell>
        <TableCell className="w-2/10">
          <p className="text-sm font-medium">{albumName}</p>
        </TableCell>
        <TableCell className="w-2/10">
          <p className="text-sm font-medium">{track.artist.name}</p>
        </TableCell>
        <TableCell className="w-1/10">
          <p className="text-sm font-medium">
            {formatTrackDuration(track.duration_ms)}
          </p>
        </TableCell>
      </TableRow>
    );
  }

  if (variant === "addToPlaylist") {
    return (
      <TableRow className="rounded-lg border-b-0" onClick={onClick}>
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist.name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="w-3/5"></TableCell>
        <TableCell className="">
          <p className="text-sm font-medium">
            {formatTrackDuration(track.duration_ms)}
          </p>
        </TableCell>
        {showAction && (
          <TableCell
            className="rounded-tr-lg rounded-br-lg text-end"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              className="h-8 rounded-full text-sm font-medium"
              onClick={handleAddToPlaylist}
            >
              Add
            </Button>
          </TableCell>
        )}
      </TableRow>
    );
  }

  if (variant === "album") {
    return (
      <TableRow className="rounded-lg border-b-0" onClick={onClick}>
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell className="w-2/5">
          <p className="text-sm font-semibold">{track.title}</p>
        </TableCell>
        <TableCell className="w-2/5">
          <p className="text-sm font-medium">
            {track.genres.map((genre) => (
              <Badge key={genre} className="mr-1">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </Badge>
            ))}
          </p>
        </TableCell>
        <TableCell className="w-1/5">
          <p className="text-sm font-medium">
            {"time_added" in track
              ? formatUploadTime(track.time_added as string)
              : ""}
          </p>
        </TableCell>
        <TableCell className="w-10 rounded-tr-lg rounded-br-lg">
          <p className="text-sm font-medium">
            {formatTrackDuration(track.duration_ms)}
          </p>
        </TableCell>
      </TableRow>
    );
  }

  if (variant === "albumManagement") {
    return (
      <TableRow className="rounded-lg border-b-0" onClick={onClick}>
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell className="w-2/5">
          <p className="text-sm font-semibold">{track.title}</p>
        </TableCell>
        <TableCell className="w-2/5">
          <p className="text-sm font-medium">
            {track.genres.map((genre) => (
              <Badge key={genre} className="mr-1">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </Badge>
            ))}
          </p>
        </TableCell>
        <TableCell className="w-1/5">
          <p className="text-sm font-medium">
            {"time_added" in track
              ? formatUploadTime(track.time_added as string)
              : ""}
          </p>
        </TableCell>
        <TableCell className="w-10">
          <p className="text-sm font-medium">
            {formatTrackDuration(track.duration_ms)}
          </p>
        </TableCell>
        {showAction && (
          <TableCell
            className="w-10 rounded-tr-lg rounded-br-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-md h-10 w-10 gap-1 rounded-full font-semibold"
                >
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={10}>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleRemoveFromAlbum}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove from this album
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        )}
      </TableRow>
    );
  }

  return (
    <TableRow className="rounded-lg border-b-0" onClick={onClick}>
      <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
        <p className="text-sm text-gray-500">{index}</p>
      </TableCell>
      <TableCell className="w-1/2">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-semibold">{track.title}</p>
            <p className="text-sm text-gray-500">{track.artist?.name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-1/10">
        <p className="text-sm font-medium">{albumName}</p>
      </TableCell>
      <TableCell className="w-1/5">
        <p className="text-sm font-medium">
          {"timeAdded" in track ? formatUploadTime(track.timeAdded!) : ""}
        </p>
      </TableCell>
      <TableCell className="w-1/10">
        <p className="text-sm font-medium">
          {formatTrackDuration(track.duration_ms)}
        </p>
      </TableCell>
      {showAction && (
        <TableCell
          className="w-10 rounded-tr-lg rounded-br-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-md h-10 w-10 gap-1 rounded-full font-semibold"
              >
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10}>
              <DropdownMenuItem
                variant="destructive"
                onClick={handleRemoveFromPlaylist}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove from this playlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
};

interface TrackRowProps {
  index: number;
  track: Track | Playlist["tracks"][number];
  onClick?: () => void;
  variant?: SimpleTrackTablesVariant;
  showAction?: boolean;
}

export default TrackRow;
