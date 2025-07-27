import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
}

const ConfirmDeleteDialog = ({
  isOpen,
  setIsOpen,
  onClose,
  title = "Xác nhận xóa",
  description = "Bạn có chắc chắn muốn xóa không? Hành động này không thể hoàn tác.",
  cancelText = "Hủy",
  confirmText = "Xóa",
}: ConfirmDeleteDialogProps) => {
  const handleConfirm = () => {
    onClose();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            {cancelText}
          </AlertDialogCancel>
          <Button onClick={handleConfirm} variant={"destructive"}>
            {confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
