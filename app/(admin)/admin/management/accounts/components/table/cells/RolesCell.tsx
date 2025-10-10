"use client";

import { ROLE_OPTIONS } from "@/app/constant";
import { Role } from "@/app/enums";
import { Account } from "@/app/types/model";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import useAdminActions from "@/hooks/useAdminActions";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface RolesCellProps {
  row: Row<Account>;
}

const RolesCell = ({ row }: RolesCellProps) => {
  const account = row.original;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<Option[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { handleUpdateRoles } = useAdminActions();

  useEffect(() => {
    setSelectedRoles(
      account.role.map((role) => ({
        value: role,
        label: role.charAt(0).toUpperCase() + role.slice(1),
      })),
    );

    return () => {
      setSelectedRoles([]);
    };
  }, [account]);

  // Xử lý khi người dùng nhấn Save
  const handleSave = () => {
    setConfirmDialogOpen(true);
  };

  // Xử lý khi người dùng xác nhận thay đổi
  const handleConfirm = () => {
    const newRoles = selectedRoles.map((role) => role.value) as Role[];

    if (newRoles.length === 0) {
      setConfirmDialogOpen(false);
      setIsOpen(false);
      return;
    }

    console.log("Updating roles for account:", {
      accountId: account._id,
      newRoles,
    });

    handleUpdateRoles({
      accountIds: [account._id],
      newRoles,
    });

    // Đóng các dialog
    setConfirmDialogOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="flex flex-wrap gap-2 cursor-pointer">
          {account.role.map((role) => (
            <Badge key={role} className="capitalize rounded-full">
              {role}
            </Badge>
          ))}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Account Roles</DialogTitle>
          </DialogHeader>

          <div className="text-sm text-muted-foreground">
            <p>Email: {account.email}</p>
          </div>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="roles">Roles</Label>
              <MultipleSelector
                options={ROLE_OPTIONS}
                value={selectedRoles}
                onChange={setSelectedRoles}
                className="w-full"
                emptyIndicator="No other roles found"
                placeholder="Select roles..."
                maxSelected={ROLE_OPTIONS.length}
                creatable={false}
                hidePlaceholderWhenSelected
                hideClearAllButton={true}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="rounded-full"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-full" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        title="Confirm Role Change"
        description={`Are you sure you want to update roles for ${account.firstName} ${account.lastName}?`}
        onConfirm={handleConfirm}
        isOpen={confirmDialogOpen}
        setIsOpen={setConfirmDialogOpen}
      />
    </>
  );
};

export default RolesCell;
