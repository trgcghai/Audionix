import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onCancel?: () => void;
  onConfirm: () => void;
  statusDialogOpen?: boolean;
  setStatusDialogOpen?: (open: boolean) => void;
  children?: React.ReactNode;
  asChild?: boolean;
}

const ConfirmDialog = ({
  title,
  description,
  onCancel = () => {},
  onConfirm,
  statusDialogOpen,
  setStatusDialogOpen,
  children,
  asChild = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
      <AlertDialogTrigger asChild={asChild}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full" onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="rounded-full" onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmDialog;
