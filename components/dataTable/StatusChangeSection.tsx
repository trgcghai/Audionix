import StatusSelect from "@/components/common/StatusSelect";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

/**
 * Props for the StatusChangeSection component
 * @param selectedStatus - The currently selected status
 * @param onStatusChange - Handler for when status changes
 * @param onStatusConfirm - Handler for when the status change is confirmed
 * @param statusItems - Array of status options to display
 * @param title - Title for the status select dropdown (optional)
 * @param dialogTitle - Title for the confirmation dialog (optional)
 * @param dialogDescription - Description for the confirmation dialog (optional)
 */
interface StatusChangeSectionProps {
  selectedStatus: string | undefined;
  onStatusChange: (value: string) => void;
  onStatusConfirm: () => void;
  statusItems: { key: string; value: string; label: string }[];
  title?: string;
  dialogTitle?: string;
  dialogDescription?: string;
}

const StatusChangeSection = ({
  selectedStatus,
  onStatusChange,
  onStatusConfirm,
  statusItems,
  title = "Select status",
  dialogTitle = "Confirm Status Change",
  dialogDescription = "Are you sure you want to change the status of all selected items?",
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
        value={selectedStatus!}
        onChange={handleStatusChange}
        title={title}
        items={statusItems}
      />
      <ConfirmDialog
        title={dialogTitle}
        description={dialogDescription}
        onConfirm={onStatusConfirm}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default StatusChangeSection;
