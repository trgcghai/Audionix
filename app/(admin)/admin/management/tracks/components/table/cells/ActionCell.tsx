import AddTrackToAlbumDialog from "@/app/(admin)/admin/management/tracks/components/AddTrackToAlbumDialog";
import { Track } from "@/app/types/model";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks/redux";
import useTrackActions from "@/hooks/useTrackActions";
import { openViewDetail } from "@/store/slices/detailTrackSlice";
import { Row } from "@tanstack/react-table";
import {
  FileText,
  MoreHorizontal,
  PlusCircle,
  Settings2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ActionCellProps {
  row: Row<Track>;
}

const ActionCell = ({ row }: ActionCellProps) => {
  const track = row.original;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addToAlbumDialog, setAddToAlbumDialog] = useState(false);
  const { handleDeleteOne } = useTrackActions();
  const dispatch = useAppDispatch();

  const handleViewDetail = () => {
    dispatch(openViewDetail({ track }));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 rounded-full p-0">
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
              <FileText className="mr-2 h-4 w-4" />
              <span>View Detail</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem variant="default" className="cursor-pointer">
            <Link
              href={`./tracks/update/${track._id}`}
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
