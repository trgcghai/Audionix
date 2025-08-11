import { SimpleTrackTablesVariant } from "@/app/types/component";
import TrackRow from "./TrackRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock } from "lucide-react";
import { Playlist, Track } from "@/app/types/model";

const RenderHeaderByVariant = ({
  variant = "default",
}: {
  variant?: SimpleTrackTablesVariant;
}) => {
  if (variant === "addToPlaylist") {
    return (
      <TableHeader>
        <TableRow className="cursor-default">
          <TableHead className="rounded-tl-lg rounded-bl-lg text-xs font-bold text-gray-400">
            #
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Title
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Album
          </TableHead>
          <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400"></TableHead>
        </TableRow>
      </TableHeader>
    );
  }

  return (
    <TableHeader>
      <TableRow className="cursor-default">
        <TableHead className="rounded-tl-lg rounded-bl-lg text-xs font-bold text-gray-400">
          #
        </TableHead>
        <TableHead className="text-xs font-bold text-gray-400">Title</TableHead>
        <TableHead className="text-xs font-bold text-gray-400">Album</TableHead>
        <TableHead className="text-xs font-bold text-gray-400">
          Date added
        </TableHead>
        <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400">
          <Clock className="h-4 w-4" />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

const SimpleTrackTable = ({
  variant = "default",
  showHeader = true,
  tracks,
  className,
}: SimpleTrackTableProps) => {
  return (
    <Table className={className}>
      {showHeader && <RenderHeaderByVariant variant={variant} />}
      <TableBody className="">
        {tracks.map((track, index) => (
          <TrackRow
            key={track._id}
            track={track}
            index={index + 1}
            variant={variant}
          />
        ))}
      </TableBody>
    </Table>
  );
};
export default SimpleTrackTable;

interface SimpleTrackTableProps {
  tracks: Track[] | Playlist["tracks"];
  showHeader?: boolean;
  variant?: SimpleTrackTablesVariant;
  className?: string;
}
