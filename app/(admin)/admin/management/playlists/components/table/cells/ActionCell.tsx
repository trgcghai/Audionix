import { Playlist } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks/redux";
import { openViewDetail } from "@/store/slices/detailPlaylistSlice";
import { Row } from "@tanstack/react-table";
import { FileText, MoreHorizontal } from "lucide-react";

interface ActionCellProps {
  row: Row<Playlist>;
}

const ActionCell = ({ row }: ActionCellProps) => {
  const playlist = row.original;
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 rounded-full p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => dispatch(openViewDetail({ playlist }))}
        >
          <div className="flex items-center gap-2">
            <FileText className="mr-2 h-4 w-4" />
            <span>View Detail</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ActionCell;
