import { Account } from "@/app/types/model";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

const ActivatedCell = ({ row }: { row: Row<Account> }) => {
  const [activate, setActivate] = useState(
    row.original.isActivate ? "Activated" : "Unactivated",
  );
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  //   const { handleChangeOneStatus } = useTrackActions();

  const handleStatusChange = (value: string) => {
    setActivate(value);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    // handleChangeOneStatus({
    //   trackId: row.original._id,
    //   activate,
    // });
    console.log();

    setStatusDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger>
          <Badge
            variant={row.original.isActivate ? "default" : "destructive"}
            className="cursor-pointer rounded-full px-2 py-1 capitalize"
          >
            {row.original.isActivate}
          </Badge>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          {/* <StatusSelect
            activate={activate}
            handleStatusChange={handleStatusChange}
            className="w-full rounded-md"
          /> */}
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        title="Confirm Status Change"
        description="Are you sure you want to change the activate of this track ?"
        onConfirm={handleStatusConfirm}
        isOpen={statusDialogOpen}
        setIsOpen={setStatusDialogOpen}
      />
    </div>
  );
};
export default ActivatedCell;
