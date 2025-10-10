import { AccountStatus } from "@/app/enums";
import { Account } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks/redux";
import useAdminActions from "@/hooks/useAdminActions";
import { cn } from "@/libs/utils";
import { openViewDetail } from "@/store/slices/detailAccountSlice";
import formatStringCapital from "@/utils/formatStringCapital";
import { Row } from "@tanstack/react-table";
import {
  FileText,
  MoreHorizontal,
  Power,
  PowerOff,
  Settings2,
} from "lucide-react";
import Link from "next/link";

const ActionCell = ({ row }: { row: Row<Account> }) => {
  const account = row.original;
  const dispatch = useAppDispatch();
  const { handleToggleActiveStatus } = useAdminActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 rounded-full p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => dispatch(openViewDetail({ account }))}>
          <div className="flex items-center gap-2">
            <FileText className="mr-2 h-4 w-4" />
            <span>View Detail</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`./accounts/update/${account._id}`}>
            <Settings2 className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleToggleActiveStatus(
              [account._id],
              account.isActivate
                ? AccountStatus.DEACTIVATED
                : AccountStatus.ACTIVATED,
            );
          }}
          variant={account.isActivate ? "destructive" : "default"}
          className={cn(
            "cursor-pointer",
            !account.isActivate && "text-primary",
          )}
        >
          {account.isActivate ? (
            <PowerOff className="mr-2 h-4 w-4" />
          ) : (
            <Power className="mr-2 h-4 w-4 text-primary" />
          )}
          {formatStringCapital(
            account.isActivate
              ? AccountStatus.DEACTIVATED
              : AccountStatus.ACTIVATED,
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ActionCell;
