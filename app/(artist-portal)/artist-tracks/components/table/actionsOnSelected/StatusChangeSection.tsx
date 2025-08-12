import StatusSelect from "@/app/(artist-portal)/artist-tracks/components/StatusSelect";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface StatusChangeSectionProps {
  selectedStatus: string | undefined;
  onStatusChange: (value: string) => void;
  onStatusConfirm: () => void;
}

const StatusChangeSection = ({
  selectedStatus,
  onStatusChange,
  onStatusConfirm,
}: StatusChangeSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStatusChange = (value: string) => {
    onStatusChange(value);
    setDialogOpen(true);
  };

  return (
    <div className="flex w-1/3 items-center justify-between gap-2">
      <Label className="text-base font-medium capitalize">
        Change selected row to status:
      </Label>
      <StatusSelect
        status={selectedStatus!}
        handleStatusChange={handleStatusChange}
      />
      <ConfirmDialog
        title="Confirm Status Change"
        description="Are you sure you want to change the status of all selected items ?"
        onConfirm={onStatusConfirm}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default StatusChangeSection;
