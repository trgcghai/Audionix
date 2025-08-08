"use client";

import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { TrackInArtistAlbum } from "@/app/types/component";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TrackStatusValues } from "@/app/constant";
import {
  ImageIcon,
  MoreHorizontal,
  PlusCircle,
  Settings2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddTrackToAlbumDialog from "../AddTrackToAlbumDialog";
import { TrackStatus } from "@/app/enums";
import { Track } from "@/app/types/model";
import StatusSelect from "../StatusSelect";

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
    cell: RenderImageCell,
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
      const album = row.original.album;
      return album ? album.name : "-";
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
    cell: RenderStatusCell,
    meta: {
      inputType: "select",
      options: TrackStatusValues,
    },
  },
  {
    id: "actions",
    cell: RenderActionCell,
  },
];

export const TrackInAlbumColumns: ColumnDef<TrackInArtistAlbum>[] =
  Columns.filter((item) =>
    ["select", "coverImage", "name", "duration"].includes(item.id || ""),
  ).map((item) => item as TrackInArtistAlbum);

function RenderStatusCell({ row }: { row: Row<Track> }) {
  const [status, setStatus] = useState(row.original.status as string);
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
              row.original.status !== TrackStatus.HIDDEN
                ? "default"
                : "destructive"
            }
            className="cursor-pointer rounded-full px-2 py-1 capitalize"
          >
            {row.original.status}
          </Badge>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          <StatusSelect
            status={status}
            handleStatusChange={handleStatusChange}
          />
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        title="Confirm Status Change"
        description={`Are you sure you want to change the status of this track to "${status}"?`}
        onCancel={() => setStatusDialogOpen(false)}
        onConfirm={handleStatusConfirm}
        isOpen={statusDialogOpen}
        setIsOpen={setStatusDialogOpen}
      />
    </div>
  );
}

function RenderImageCell({ row }: { row: Row<Track> }) {
  const imageUrl = row.original.cover_images[0]?.url;
  const [imageError, setImageError] = useState(false);

  if (!imageUrl || imageError) {
    return (
      <div className="flex h-[70px] w-[70px] items-center justify-center rounded-lg border text-xs">
        <ImageIcon className="text-muted-foreground h-4 w-4" />
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

function RenderActionCell({ row }: { row: Row<Track> }) {
  const track = row.original;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addToAlbumDialog, setAddToAlbumDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 rounded-full p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem variant="default" className="cursor-pointer">
            <Link
              href={`/artist-tracks/update/${track._id}`}
              className="flex items-center gap-2"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAddToAlbumDialog(true)}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Add to album
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddTrackToAlbumDialog
        tracks={[track as Track]}
        statusDialogOpen={addToAlbumDialog}
        setStatusDialogOpen={setAddToAlbumDialog}
      />
      <ConfirmDialog
        title="Confirm Deletion"
        description={`Are you absolutely sure to delete this track ? This action cannot be undone.`}
        onConfirm={() => {
          console.log("Deleting track:", track);
          setDeleteDialog(false);
        }}
        onCancel={() => setDeleteDialog(false)}
        isOpen={deleteDialog}
        setIsOpen={setDeleteDialog}
      />
    </>
  );
}
