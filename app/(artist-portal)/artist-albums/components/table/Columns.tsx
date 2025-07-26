"use client";

import { ArtistAlbumItem } from "@/app/types/component";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../../components/dataTable/ColumnHeader";
import { useState } from "react";
import {
  FileText,
  ImageIcon,
  MoreHorizontal,
  Settings2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { formatUploadTime } from "@/utils/formatUploadTime";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDialog from "../../../../../components/dialog/ConfirmDialog";
import { ARTIST_ALBUM_STATUS_OPTIONS } from "@/app/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux";
import { openViewDetail } from "@/lib/features/detailAlbumSlice";

export const Columns: ColumnDef<ArtistAlbumItem>[] = [
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
    cell: RenderImageCell,
  },
  {
    accessorKey: "name",
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
    accessorKey: "total_tracks",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Tracks" />
    ),
    meta: {
      label: "Total Tracks",
      inputType: "number",
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const rowValue = Number(row.getValue(columnId));
      const filterVal = Number(filterValue);

      if (isNaN(filterVal)) return true;

      return rowValue === filterVal;
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
      options: ARTIST_ALBUM_STATUS_OPTIONS,
    },
  },
  {
    id: "actions",
    cell: RenderActionCell,
  },
];

function RenderImageCell({ row }: { row: Row<ArtistAlbumItem> }) {
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

function RenderStatusCell({ row }: { row: Row<ArtistAlbumItem> }) {
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
              row.original.status === ARTIST_ALBUM_STATUS_OPTIONS[0]
                ? "default"
                : "destructive"
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
              {ARTIST_ALBUM_STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
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

function RenderActionCell({ row }: { row: Row<ArtistAlbumItem> }) {
  const album = row.original;
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleViewDetail = () => {
    dispatch(openViewDetail({ album }));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="default"
            className="cursor-pointer"
            onClick={handleViewDetail}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 mr-2" />
              <span>View detail</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem variant="default" className="cursor-pointer">
            <Link
              href={`/artist-albums/update/${album.id}`}
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
        description={`Are you absolutely sure to delete album with name ${album.name} ? This action cannot be undone.`}
        onConfirm={() => {
          console.log("Deleting album:", album);
          setStatusDialogOpen(false);
        }}
        onCancel={() => setStatusDialogOpen(false)}
        statusDialogOpen={statusDialogOpen}
        setStatusDialogOpen={setStatusDialogOpen}
      />
    </>
  );
}
