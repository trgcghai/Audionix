import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface ConfirmDialogProps {
  title: string;
  description: string;

  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;

  onCancel?: () => void;
  onConfirm?: () => void;

  cancelText?: string;
  confirmText?: string;
  variant?: "default" | "destructive";
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

const ConfirmDialog = ({
  title,
  description,
  isOpen,
  setIsOpen,
  onCancel = () => {},
  onConfirm = () => {},
  cancelText = "Cancel",
  confirmText = "Continue",
  variant,
  confirmButtonClassName = "rounded-full",
  cancelButtonClassName = "rounded-full",
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    setIsOpen?.(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen?.(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={cancelButtonClassName}
            onClick={handleCancel}
          >
            {cancelText}
          </AlertDialogCancel>

          {variant === "destructive" ? (
            <Button
              onClick={handleConfirm}
              variant="destructive"
              className={confirmButtonClassName}
            >
              {confirmText}
            </Button>
          ) : (
            <AlertDialogAction
              className={confirmButtonClassName}
              onClick={handleConfirm}
            >
              {confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmDialog;
