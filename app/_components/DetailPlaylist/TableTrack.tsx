import { TrackItem } from "@/app/types/component";
import TrackRow from "../TrackRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock } from "lucide-react";

const TableTrack = ({ showHeader = true, tracks }: TableTrackProps) => {
  return (
    <Table className="mt-4">
      {showHeader && (
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
              Date added
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400 rounded-tr-lg rounded-br-lg">
              <Clock className="w-4 h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody className="">
        {tracks.map((track, index) => (
          <TrackRow key={track.id + index} track={track} index={index + 1} />
        ))}
      </TableBody>
    </Table>
  );
};
export default TableTrack;

interface TableTrackProps {
  tracks: TrackItem[];
  showHeader?: boolean;
}
