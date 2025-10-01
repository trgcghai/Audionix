import { Album, Playlist, Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Table, TableBody } from "@/components/ui/table";
import TableHeaderByVariant from "./TableHeaderByVariant";
import TableRowByVariant from "./TableRowByVariant";

export type SimpleTrackTablesVariant =
  | "default"
  | "addToPlaylist"
  | "searchResult"
  | "album"
  | "albumManagement";

interface SimpleTrackTableProps {
  tracks: Track[] | Playlist["tracks"] | Album["tracks"];
  showHeader?: boolean;
  variant?: SimpleTrackTablesVariant;
  className?: string;
  showAction?: boolean;
}

const SimpleTrackTable = ({
  variant = "default",
  showHeader = true,
  tracks,
  className,
  showAction = true,
}: SimpleTrackTableProps) => {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="flex w-full items-center justify-center">
        <ErrorMessage
          message="No tracks found"
          severity="info"
          variant="inline"
        />
      </div>
    );
  }

  return (
    <Table className={className}>
      {showHeader && (
        <TableHeaderByVariant variant={variant} showAction={showAction} />
      )}
      <TableBody>
        {tracks.map((track, index) => (
          <TableRowByVariant
            key={track._id}
            track={track}
            index={index + 1}
            variant={variant}
            showAction={showAction}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SimpleTrackTable;
