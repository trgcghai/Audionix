import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock } from "lucide-react";
import { SimpleTrackTablesVariant } from ".";

const TableHeaderByVariant = ({
  variant = "default",
  showAction = true,
}: {
  variant?: SimpleTrackTablesVariant;
  showAction?: boolean;
}) => {
  if (variant === "searchResult") {
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
          <TableHead className="text-xs font-bold text-gray-400">
            Artist
          </TableHead>
          <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400">
            <Clock className="h-4 w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  }

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
          <TableHead className="text-xs font-bold text-gray-400 w-3/5"></TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            <Clock className="h-4 w-4" />
          </TableHead>
          {showAction && (
            <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400"></TableHead>
          )}
        </TableRow>
      </TableHeader>
    );
  }

  if (variant === "album") {
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
            Genres
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Date added
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            <Clock className="h-4 w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  }

  if (variant === "albumManagement") {
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
            Genres
          </TableHead>
          <TableHead className="text-xs font-bold text-gray-400">
            Date added
          </TableHead>
          <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400">
            <Clock className="h-4 w-4" />
          </TableHead>
          {showAction && (
            <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400"></TableHead>
          )}
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
        <TableHead className="text-xs font-bold text-gray-400">
          <Clock className="h-4 w-4" />
        </TableHead>
        {showAction && (
          <TableHead className="rounded-tr-lg rounded-br-lg text-xs font-bold text-gray-400"></TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderByVariant;
