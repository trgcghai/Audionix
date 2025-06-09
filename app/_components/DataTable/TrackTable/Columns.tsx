"use client";

import { formatTrackDuration } from "@/app/_utils/formatTrackDuration";
import { formatUploadTime } from "@/app/_utils/formatUploadTime";
import { ArtistTrackItem } from "@/app/types/component";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "../Generics/ColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ARTIST_TRACK_STATUS_OPTIONS } from "@/app/constant";

export const Columns: ColumnDef<ArtistTrackItem>[] = [
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
      label: "Track Image Cover",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track Image Cover" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.images[0]?.url;
      return (
        <Image
          src={imageUrl}
          alt={""}
          width={70}
          height={70}
          className="rounded"
        />
      );
    },
  },
  {
    accessorKey: "name",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track Name" />
    ),
    meta: {
      label: "Track Name",
      inputType: "text",
    },
  },
  {
    accessorKey: "album.name",
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
    accessorKey: "uploadTime",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upload Time" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.uploadTime),
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
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Badge
          variant={row.original.status === "active" ? "default" : "destructive"}
          className="rounded-full px-2 py-1 capitalize"
        >
          {row.original.status}
        </Badge>
      </div>
    ),
    meta: {
      inputType: "select",
      options: ARTIST_TRACK_STATUS_OPTIONS,
    },
  },
];
