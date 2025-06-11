"use client";

import { formatTrackDuration } from "@/app/_utils/formatTrackDuration";
import { formatUploadTime } from "@/app/_utils/formatUploadTime";
import { ArtistTrackItem } from "@/app/types/component";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "../Generics/ColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ARTIST_TRACK_STATUS_OPTIONS } from "@/app/constant";
import { ImageIcon, MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDialog from "../../Dialog/ConfirmDialog";
import { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    cell: RenderImageCell,
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
    cell: RenderStatusCell,
    meta: {
      inputType: "select",
      options: ARTIST_TRACK_STATUS_OPTIONS,
    },
  },
  {
    id: "actions",
    cell: RenderActionCell,
  },
];

function RenderStatusCell({ row }: { row: Row<ArtistTrackItem> }) {
  const [status, setStatus] = useState(row.original.status);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    console.log(`Changing status to: ${status}`);
    console.log(`Selected rows:`, row.original);
    setStatusDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Badge
            variant={
              row.original.status === "active" ? "default" : "destructive"
            }
            className="rounded-full px-2 py-1 capitalize cursor-pointer"
          >
            {row.original.status}
          </Badge>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        title="Confirm Status Change"
        description={`Are you sure you want to change the status of ${row.original.name} to "${status}"? This action can be reversed later.`}
        onCancel={() => setStatusDialogOpen(false)}
        onConfirm={handleStatusConfirm}
        statusDialogOpen={statusDialogOpen}
        setStatusDialogOpen={setStatusDialogOpen}
      />
    </div>
  );
}

function RenderImageCell({ row }: { row: Row<ArtistTrackItem> }) {
  const imageUrl = row.original.images[0]?.url;
  const [imageError, setImageError] = useState(false);

  if (!imageUrl || imageError) {
    return (
      <div className="flex items-center justify-center h-[70px] w-[70px] text-xs rounded-lg border">
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={""}
      width={70}
      height={70}
      className="rounded"
      onError={() => setImageError(true)}
    />
  );
}

function RenderActionCell({ row }: { row: Row<ArtistTrackItem> }) {
  const track = row.original;
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem variant="default" className="cursor-pointer">
            <Link
              href={`/tracks/update/${track.id}`}
              className="flex items-center gap-2"
            >
              <Settings2 className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setStatusDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        title="Confirm Deletion"
        description={`Are you absolutely sure to delete track with name ${track.name} ? This action cannot be undone.`}
        onConfirm={() => {
          console.log("Deleting track:", track);
          setStatusDialogOpen(false);
        }}
        onCancel={() => setStatusDialogOpen(false)}
        statusDialogOpen={statusDialogOpen}
        setStatusDialogOpen={setStatusDialogOpen}
      />
    </>
  );
}
