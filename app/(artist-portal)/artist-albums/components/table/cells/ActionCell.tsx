import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { FileText, MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux";
import { openViewDetail } from "@/store/slices/detailAlbumSlice";
import { Album } from "@/app/types/model";

const ActionCell = ({ row }: { row: Row<Album> }) => {
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
              <span>View detail</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem variant="default" className="cursor-pointer">
            <Link
              href={`/artist-albums/update/${album._id}`}
              className="flex items-center gap-2"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setStatusDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        title="Confirm Deletion"
        description={`Are you absolutely sure to delete this album? This action cannot be undone.`}
        onConfirm={() => {
          console.log("Deleting album:", album);
          setStatusDialogOpen(false);
        }}
        onCancel={() => setStatusDialogOpen(false)}
        isOpen={statusDialogOpen}
        setIsOpen={setStatusDialogOpen}
      />
    </>
  );
};
export default ActionCell;
