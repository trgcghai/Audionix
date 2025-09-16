import { Track } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatTrackDuration } from "@/utils/formatTrackDuration";
import { formatUploadTime } from "@/utils/formatUploadTime";
import Image from "next/image";
import Link from "next/link";

interface DetailTrackDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  track: Track;
}

const DetailTrackDialog = ({
  isOpen,
  setIsOpen,
  track,
}: DetailTrackDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="!max-w-4xl !px-2">
        <ScrollArea className="h-[600px] px-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Track Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Cover Image</Label>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center justify-center">
                  <Image
                    src={track.cover_images[0].url}
                    alt={`${track.title} cover`}
                    width={track.cover_images[0].width}
                    height={track.cover_images[0].height}
                    className="w-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Audio File</Label>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center gap-4">
                  <audio controls className="w-full">
                    <source src={track.file.url} type={track.file.mimetype} />
                  </audio>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Title</Label>
                <Input value={track.title} disabled className="font-medium" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Duration</Label>
                <Input
                  value={formatTrackDuration(track.duration_ms)}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Release Date</Label>
                <Input
                  value={formatUploadTime(track.createdAt)}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Genres</Label>
                <MultipleSelector
                  className="font-medium"
                  disabled
                  value={track.genres.map((genre) => ({
                    value: genre,
                    label: genre.charAt(0).toUpperCase() + genre.slice(1),
                  }))}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Link href={`/artist/tracks/update/${track._id}`}>
                <Button>Edit Track</Button>
              </Link>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default DetailTrackDialog;
