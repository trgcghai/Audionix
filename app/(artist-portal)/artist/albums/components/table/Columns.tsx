"use client";

import GenresCell from "@/app/(artist-portal)/artist/tracks/components/table/cells/GenresCell";
import { ARTIST_ALBUM_STATUS_OPTIONS } from "@/app/constant";
import { Album } from "@/app/types/model";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import ImageCell from "@/components/dataTable/ImageCell";
import { Checkbox } from "@/components/ui/checkbox";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "./cells/ActionCell";
import StatusCell from "./cells/StatusCell";

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
    id: "cover_images",
    accessorKey: "images[0].url",
    enableSorting: false,
    meta: {
      label: "Album Image Cover",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Album Image Cover" />
    ),
    cell: ({ row }) => (
      <ImageCell<Album>
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
      <DataTableColumnHeader column={column} title="Album title" />
    ),
    meta: {
      label: "Album title",
      inputType: "text",
    },
  },
  {
    id: "number_of_followers",
    accessorKey: "number_of_followers",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Followers" />
    ),
    meta: {
      label: "Number of Followers",
      inputType: "text",
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
      <GenresCell<Album> row={row} getGenres={(data) => data.genres} />
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
      <DataTableColumnHeader column={column} title="Upload Time" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.createdAt),
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
    cell: ({ row }) => formatUploadTime(row.original.updatedAt),
    meta: {
      label: "Last update",
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
