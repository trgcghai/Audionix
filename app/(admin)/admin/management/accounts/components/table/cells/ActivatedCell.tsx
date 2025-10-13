import { ACCOUNT_STATUS_OPTIONS } from "@/app/constant";
import { AccountStatus } from "@/app/enums";
import { Account } from "@/app/types/model";
import StatusSelect from "@/components/common/StatusSelect";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAdminActions from "@/hooks/useAdminActions";
import formatStringCapital from "@/utils/formatStringCapital";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const ActivatedCell = ({ row }: { row: Row<Account> }) => {
  const [status, setStatus] = useState<AccountStatus | undefined>();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const { handleToggleActiveStatus } = useAdminActions();

  useEffect(() => {
    setStatus(
      row.original.isActivate
        ? AccountStatus.ACTIVATED
        : AccountStatus.DEACTIVATED,
    );
  }, [row.original.isActivate]);

  const handleStatusChange = (value: string) => {
    setStatus(value as AccountStatus);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    handleToggleActiveStatus({
      accountIds: [row.original._id],
      status: status as AccountStatus,
    });
    setStatusDialogOpen(false);
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Badge
            variant={row.original.isActivate ? "default" : "destructive"}
            className="cursor-pointer rounded-full px-2 py-1 capitalize"
          >
            {formatStringCapital(
              row.original.isActivate
                ? AccountStatus.ACTIVATED
                : AccountStatus.DEACTIVATED,
            )}
          </Badge>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          <StatusSelect
            value={status as AccountStatus}
            onChange={handleStatusChange}
            disabled={false}
            className="w-full rounded-lg"
            title="Select status"
            items={ACCOUNT_STATUS_OPTIONS}
          />
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        title="Confirm Status Change"
        description={`Are you sure you want to change this account status?`}
        onConfirm={handleStatusConfirm}
        isOpen={statusDialogOpen}
        setIsOpen={setStatusDialogOpen}
      />
    </div>
  );
};

export default ActivatedCell;
