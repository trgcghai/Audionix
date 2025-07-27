import { SimpleTrackTablesVariant, TrackItem } from "@/app/types/component";
import TrackRow from "./TrackRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock } from "lucide-react";

const RenderHeaderByVariant = ({
  variant = "default",
}: {
  variant?: SimpleTrackTablesVariant;
}) => {
  if (variant === "artistTrack") {
    return (
      <TableHeader>
        <TableRow className="cursor-default">
          <TableHead className="text-xs font-bold text-gray-400 rounded-tl-lg rounded-bl-lg">
            #
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Title
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Album
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Date uploaded
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Status
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400 rounded-tr-lg rounded-br-lg">
            <Clock className="w-4 h-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  }

  if (variant === "addToPlaylist") {
    return (
      <TableHeader>
        <TableRow className="cursor-default">
          <TableHead className="text-xs font-bold text-gray-400 rounded-tl-lg rounded-bl-lg">
            #
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Title
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Album
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400 rounded-tr-lg rounded-br-lg"></TableHead>
        </TableRow>
      </TableHeader>
    );
  }

  return (
    <TableHeader>
      <TableRow className="cursor-default">
        <TableHead className="text-xs font-bold text-gray-400 rounded-tl-lg rounded-bl-lg">
          #
        </TableHead>
        <TableHead className="text-xs font-bold text-gray-400">Title</TableHead>
        <TableHead className="text-xs font-bold text-gray-400">Album</TableHead>
        <TableHead className="text-xs font-bold text-gray-400">
          Date added
        </TableHead>
        <TableHead className="text-xs font-bold text-gray-400 rounded-tr-lg rounded-br-lg">
          <Clock className="w-4 h-4" />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

const SimpleTrackTable = ({
  variant = "default",
  showHeader = true,
  tracks,
}: SimpleTrackTableProps) => {
  return (
    <Table className="mt-4">
      {showHeader && <RenderHeaderByVariant variant={variant} />}
      <TableBody className="">
        {tracks.map((track, index) => (
          <TrackRow
            key={track.id + index}
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
  tracks: TrackItem[];
  showHeader?: boolean;
  variant?: SimpleTrackTablesVariant;
}
