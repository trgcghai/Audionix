import StatusSelect from "@/app/(artist-portal)/artist-tracks/components/StatusSelect";
import { TrackStatus } from "@/app/enums";
import { Track } from "@/app/types/model";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useTrackActions from "@/hooks/useTrackActions";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

const StatusCell = ({ row }: { row: Row<Track> }) => {
  const [status, setStatus] = useState(row.original.status as string);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const { handleChangeOneStatus } = useTrackActions();

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    handleChangeOneStatus({
      trackId: row.original._id,
      status,
    });
    setStatusDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger>
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
            className="w-full rounded-md"
          />
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        title="Confirm Status Change"
        description="Are you sure you want to change the status of this track ?"
        onConfirm={handleStatusConfirm}
        isOpen={statusDialogOpen}
        setIsOpen={setStatusDialogOpen}
      />
    </div>
  );
};
export default StatusCell;
