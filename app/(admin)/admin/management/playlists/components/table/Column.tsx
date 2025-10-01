"use client";

import ActionCell from "@/app/(admin)/admin/management/playlists/components/table/cells/ActionCell";
import ImageCell from "@/app/(admin)/admin/management/playlists/components/table/cells/ImageCell";
import { Playlist } from "@/app/types/model";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { ColumnDef } from "@tanstack/react-table";

export const AdminPlaylistColumns: ColumnDef<Playlist>[] = [
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
    accessorKey: "cover_images[0].url",
    enableSorting: false,
    meta: {
      label: "Playlist Cover",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Playlist Cover" />
    ),
    cell: ({ row }) => <ImageCell row={row} />,
  },
  {
    id: "title",
    accessorKey: "title",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Playlist Title" />
    ),
    meta: {
      label: "Playlist Title",
      inputType: "text",
    },
  },
  {
    id: "creator",
    accessorKey: "creator.username",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => (
      <Badge className="rounded-full px-2 py-1">
        {row.original.owner.username || "Unknown"}
      </Badge>
    ),
    meta: {
      label: "Created By",
      inputType: "text",
    },
  },
  {
    id: "tracks",
    accessorKey: "tracks",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Tracks" />
    ),
    cell: ({ row }) => <span>{row.original.tracks?.length || 0} tracks</span>,
    meta: {
      label: "Number of Tracks",
      inputType: "text",
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.createdAt),
    meta: {
      label: "Created At",
      inputType: "date",
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.updatedAt),
    meta: {
      label: "Last Update",
      inputType: "date",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
