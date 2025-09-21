import { Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

interface AddNewTrackDialogProps {
  tracks: Track[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  search: string;
  setSearch: (search: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (trackId: string) => void;
}

const AddNewTrackDialog = ({
  tracks,
  isLoading,
  isError,
  error,
  search,
  setSearch,
  open,
  onOpenChange,
  onAdd,
}: AddNewTrackDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Track to Album</DialogTitle>
        </DialogHeader>
        <div className="mb-2">
          <Input
            placeholder="Search your tracks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full"
          />
        </div>
        {isLoading && <LoaderSpin />}
        {isError && <ErrorMessage message={error} />}
        <div className="max-h-64 overflow-y-auto space-y-2">
          {tracks.length === 0 && (
            <div className="text-muted-foreground text-center text-sm py-4">
              No tracks found.
            </div>
          )}
          {tracks.map((track: Track) => (
            <div
              key={track._id}
              className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted cursor-pointer"
              onClick={() => {
                onAdd(track._id);
                onOpenChange(false);
              }}
            >
              <div>
                <div className="font-medium">{track.title}</div>
                <div className="text-xs text-muted-foreground">
                  {track.artist?.name}
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTrackDialog;
