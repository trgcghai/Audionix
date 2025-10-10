import { ALBUM_STATUS_OPTIONS } from "@/app/constant";
import { AlbumStatus } from "@/app/enums";
import { Album } from "@/app/types/model";
import StatusSelect from "@/components/common/StatusSelect";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAlbumActions from "@/hooks/useAlbumActions";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

const StatusCell = ({ row }: { row: Row<Album> }) => {
  const [status, setStatus] = useState(row.original.status);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const { handleUpdateStatusOne } = useAlbumActions();

  const handleStatusChange = (value: string) => {
    setStatus(value as AlbumStatus);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    handleUpdateStatusOne({ albumId: row.original._id, status });
    setStatusDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Badge
            variant={
              row.original.status === AlbumStatus.PUBLISHED
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
            value={status}
            onChange={handleStatusChange}
            disabled={false}
            className="w-full rounded-lg"
            title="Select status"
            items={ALBUM_STATUS_OPTIONS}
          />
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        title="Confirm Status Change"
        description={`Are you sure you want to change the status of this album?`}
        onCancel={() => setStatusDialogOpen(false)}
        onConfirm={handleStatusConfirm}
        isOpen={statusDialogOpen}
        setIsOpen={setStatusDialogOpen}
      />
    </div>
  );
};

export default StatusCell;
