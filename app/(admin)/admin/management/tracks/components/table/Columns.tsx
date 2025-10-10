import ActionCell from "@/app/(artist-portal)/artist/tracks/components/table/cells/ActionCell";
import GenresCell from "@/app/(artist-portal)/artist/tracks/components/table/cells/GenresCell";
import StatusCell from "@/app/(artist-portal)/artist/tracks/components/table/cells/StatusCell";
import { TRACK_STATUS_OPTIONS } from "@/app/constant";
import { Track } from "@/app/types/model";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import ImageCell from "@/components/dataTable/ImageCell";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAlbumsAsFilterOptionsQuery } from "@/services/albums/albumApi";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { ColumnDef } from "@tanstack/react-table";

export const AdminTrackColumns: ColumnDef<Track>[] = [
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
    cell: ({ row }) => (
      <ImageCell<Track>
        row={row}
        getImageUrl={(data) => data.cover_images[0].url}
      />
    ),
  },
  {
    id: "title",
    accessorKey: "title",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track title" />
    ),
    meta: {
      label: "Track title",
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
    id: "genres",
    accessorKey: "genres",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genres" />
    ),
    cell: ({ row }) => (
      <GenresCell<Track> row={row} getGenres={(data) => data.genres} />
    ),
    meta: {
      label: "Genres",
      inputType: "text",
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upload time" />
    ),
    cell: ({ row }) => formatUploadTime((row.original as Track).createdAt),
    meta: {
      label: "Upload Time",
      inputType: "date",
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last update" />
    ),
    cell: ({ row }) => formatUploadTime((row.original as Track).updatedAt),
    meta: {
      label: "Last update",
      inputType: "date",
    },
  },
  {
    id: "uploadBy",
    accessorKey: "uploadBy",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upload by" />
    ),
    cell: ({ row }) => (
      <Badge className="rounded-full px-2 py-1">
        {row.original.artist.name}
      </Badge>
    ),
    meta: {
      label: "Upload By",
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
      options: TRACK_STATUS_OPTIONS,
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionCell
        row={row}
        useGetOptionsQuery={useGetAlbumsAsFilterOptionsQuery}
      />
    ),
  },
];
