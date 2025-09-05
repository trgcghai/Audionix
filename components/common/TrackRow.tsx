"use client";
import { Playlist, Track } from "@/app/types/model";
import { SimpleTrackTablesVariant } from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { Ellipsis, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface RenderByVariantProps extends TrackRowProps {
  onClick: () => void;
}

const RenderByVariant = ({
  index,
  track,
  variant = "default",
  onClick,
}: RenderByVariantProps) => {
  const {
    handleAddTracksToPlaylist,
    handleRemoveTracksFromPlaylist,
    getCurrrentPlaylistId,
  } = usePlaylistAction();

  const albumName = useMemo(() => {
    return track.albums && track.albums.length > 0
      ? track.albums[0].title
      : "-";
  }, [track.albums]);

  const handleAddToPlaylist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleAddTracksToPlaylist({
      id: getCurrrentPlaylistId()!,
      trackIds: [track._id],
    });
  };

  const handleRemoveFromPlaylist = () => {
    handleRemoveTracksFromPlaylist({
      id: getCurrrentPlaylistId()!,
      trackIds: [track._id],
    });
  };

  console.log(variant);

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
        <TableCell>
          <p className="text-sm font-medium">{albumName}</p>
        </TableCell>
        <TableCell className="rounded-tr-lg rounded-br-lg text-end">
          <Button
            variant="outline"
            className="h-8 rounded-full text-sm font-medium"
            onClick={handleAddToPlaylist}
          >
            Add
          </Button>
        </TableCell>
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
            <p className="text-sm text-gray-500">{track.artist.name}</p>
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
      <TableCell className="w-10 rounded-tr-lg rounded-br-lg">
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
    </TableRow>
  );
};

const TrackRow = ({ index, track, variant = "default" }: TrackRowProps) => {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/tracks/${track._id}`);
  };

  return (
    <RenderByVariant
      index={index}
      track={track}
      variant={variant}
      onClick={handleRowClick}
    />
  );
};

interface TrackRowProps {
  index: number;
  track: Track | Playlist["tracks"][number];
  variant?: SimpleTrackTablesVariant;
}

export default TrackRow;
