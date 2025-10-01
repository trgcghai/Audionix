import { User } from "@/app/types/model";
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
import { MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ActionCellProps {
  row: Row<User>;
}

const ActionCell = ({ row }: ActionCellProps) => {
  const user = row.original;
  const [deleteDialog, setDeleteDialog] = useState(false);
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
              href={`./users/update/${user._id}`}
              className="flex items-center gap-2"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
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
      <ConfirmDialog
        title="Confirm Deletion"
        description={`Are you absolutely sure to delete this user ? This action cannot be undone.`}
        onConfirm={() => {
          handleDeleteOne(user._id);
          setDeleteDialog(false);
        }}
        isOpen={deleteDialog}
        setIsOpen={setDeleteDialog}
      />
    </>
  );
};
export default ActionCell;
