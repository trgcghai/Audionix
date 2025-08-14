import { Row } from "@tanstack/react-table";
import { useState } from "react";
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
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { ARTIST_ALBUM_STATUS_OPTIONS } from "@/app/constant";
import { Album } from "@/app/types/model";
import { AlbumStatus } from "@/app/enums";

const StatusCell = ({ row }: { row: Row<Album> }) => {
  const [status, setStatus] = useState(row.original.status);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const handleStatusChange = (value: string) => {
    setStatus(value as AlbumStatus);
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
            className="cursor-pointer rounded-full px-2 py-1 capitalize"
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
