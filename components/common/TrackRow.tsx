"use client";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { SimpleTrackTablesVariant } from "@/app/types/component";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { Button } from "@/components/ui/button";
import { Playlist, Track } from "@/app/types/model";
import { useCallback, useMemo } from "react";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { formatUploadTime } from "@/utils/formatUploadTime";

interface TrackRowProps {
  index: number;
  track: Track | Playlist["tracks"][number];
  variant?: SimpleTrackTablesVariant;
}

const RenderByVariant = ({
  index,
  track,
  variant = "default",
}: TrackRowProps) => {
  const extractTrackData = useCallback((track: TrackRowProps["track"]) => {
    const isPlaylistTrack = "time_added" in track;
    if (isPlaylistTrack) {
      return {
        ...(track._id as Track),
        time_added: track.time_added,
      };
    } else {
      return {
        ...(track as Track),
      };
    }
  }, []);

  const { handleAddTracksToPlaylist, getCurrrentPlaylistId } =
    usePlaylistAction();

  const trackData = useMemo(
    () => extractTrackData(track),
    [extractTrackData, track],
  );

  const albumName = useMemo(() => {
    return trackData.album ? trackData.album.name : "-";
  }, [trackData]);

  if (variant === "addToPlaylist") {
    return (
      <TableRow className="rounded-lg border-b-0">
        <TableCell className="w-6 rounded-tl-lg rounded-bl-lg">
          <p className="text-sm text-gray-500">{index}</p>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Image
              src={trackData.cover_images[0].url}
              alt={trackData.title}
              width={40}
              height={40}
              className="aspect-square rounded object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{trackData.title}</p>
              {/* <p className="text-sm text-gray-500">{trackData.artist.name}</p> */}
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
              handleAddTracksToPlaylist({
                id: getCurrrentPlaylistId()!,
                trackIds: [trackData._id],
              });
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
            src={trackData.cover_images[0].url}
            alt={trackData.title}
            width={40}
            height={40}
            className="aspect-square rounded object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{trackData.title}</p>
            <p className="text-sm text-gray-500">{trackData.artist.name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-sm font-medium">{albumName}</p>
      </TableCell>
      <TableCell>
        <p className="text-sm font-medium">
          {"time_added" in trackData
            ? formatUploadTime(trackData.time_added)
            : ""}
        </p>
      </TableCell>
      <TableCell className="rounded-tr-lg rounded-br-lg">
        <p className="text-sm font-medium">
          {formatTrackDuration(trackData.duration_ms)}
        </p>
      </TableCell>
    </TableRow>
  );
};

const TrackRow = ({ index, track, variant = "default" }: TrackRowProps) => {
  return <RenderByVariant index={index} track={track} variant={variant} />;
};

export default TrackRow;
