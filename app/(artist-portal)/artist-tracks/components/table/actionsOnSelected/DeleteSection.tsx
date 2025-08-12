import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteSection = ({
  onDeleteConfirm,
}: {
  onDeleteConfirm: () => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      <Button
        variant="destructive"
        className="rounded-full"
        onClick={() => setDialogOpen(true)}
      >
        <Trash2 className="mr-1 h-4 w-4" /> Delete selected
      </Button>
      <ConfirmDialog
        title="Confirm Deletion"
        description={`Are you absolutely sure to delete all selected items? This action cannot be undone.`}
        onConfirm={onDeleteConfirm}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default DeleteSection;
