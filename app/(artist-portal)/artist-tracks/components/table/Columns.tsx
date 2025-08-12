import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { TrackStatusValues } from "@/app/constant";
import { Track } from "@/app/types/model";
import ImageCell from "./cells/ImageCell";
import StatusCell from "./cells/StatusCell";
import ActionCell from "./cells/ActionCell";

export const Columns: ColumnDef<Track>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    id: "coverImage",
    accessorKey: "images[0].url",
    enableSorting: false,
    meta: {
      label: "Track Image Cover",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track Image Cover" />
    ),
    cell: ({ row }) => <ImageCell row={row} />,
  },
  {
    id: "title",
    accessorKey: "title",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track title" />
    ),
    meta: {
      label: "Track title",
      inputType: "text",
    },
  },
  {
    id: "album",
    accessorKey: "album.name",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Album Name" />
    ),
    cell: ({ row }) => {
      const title =
        row.original.albums.length > 0 ? row.original.albums[0].title : "-";
      return title;
    },
    meta: {
      label: "Album",
      inputType: "text",
    },
  },
  {
    id: "duration",
    accessorKey: "duration_ms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => formatTrackDuration(row.original.duration_ms),
    meta: {
      label: "Track Duration",
    },
  },
  {
    id: "uploadTime",
    accessorKey: "uploadTime",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upload Time" />
    ),
    cell: ({ row }) => formatUploadTime((row.original as Track).createdAt),
    meta: {
      label: "Upload Time",
      inputType: "date",
    },
  },
  {
    id: "status",
    accessorKey: "status",
    enableSorting: false,
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="flex items-center justify-center"
      />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
    meta: {
      inputType: "select",
      options: TrackStatusValues,
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

export const TrackInAlbumColumns: ColumnDef<Track>[] = [
  ...Columns.filter((item) =>
    ["select", "coverImage", "name", "duration"].includes(item.id || ""),
  ),
];
