import AddTrackToAlbumDialog from "@/app/(artist-portal)/artist/tracks/components/AddTrackToAlbumDialog";
import { Track } from "@/app/types/model";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTrackActions from "@/hooks/useTrackActions";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ActionCell = ({ row }: { row: Row<Track> }) => {
  const track = row.original;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addToAlbumDialog, setAddToAlbumDialog] = useState(false);
  const { handleDeleteOne } = useTrackActions();

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
          handleDeleteOne(track._id);
          setDeleteDialog(false);
        }}
        isOpen={deleteDialog}
        setIsOpen={setDeleteDialog}
      />
    </>
  );
};
export default ActionCell;
