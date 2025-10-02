import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch } from "@/hooks/redux";
import {
  setOpen,
  useDetailAccountSlice,
} from "@/store/slices/detailAccountSlice";

const DetailAccountDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpen, account } = useDetailAccountSlice();

  if (!account) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => dispatch(setOpen({ isOpen: open }))}
    >
      <DialogContent className="!max-w-4xl !px-2">
        <ScrollArea className="h-[600px] px-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Account Details
            </DialogTitle>
          </DialogHeader>
          Thông tin account và user / artist liên quan
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailAccountDialog;
