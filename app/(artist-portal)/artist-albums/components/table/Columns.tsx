"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { ARTIST_ALBUM_STATUS_OPTIONS } from "@/app/constant";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import { Album } from "@/app/types/model";
import StatusCell from "./cells/StatusCell";
import ImageCell from "./cells/ImageCell";
import ActionCell from "./cells/ActionCell";

export const Columns: ColumnDef<Album>[] = [
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
    accessorKey: "images[0].url",
    enableSorting: false,
    meta: {
      label: "Album Image Cover",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Album Image Cover" />
    ),
    cell: ({ row }) => <ImageCell row={row} />,
  },
  {
    accessorKey: "title",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Album Name" />
    ),
    meta: {
      label: "Album Name",
      inputType: "text",
    },
  },
  {
    accessorKey: "uploadTime",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upload Time" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.createdAt),
    meta: {
      label: "Upload Time",
      inputType: "date",
    },
  },
  {
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
      options: ARTIST_ALBUM_STATUS_OPTIONS,
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
