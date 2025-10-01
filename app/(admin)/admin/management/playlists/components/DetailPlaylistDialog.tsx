import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/hooks/redux";
import { useGetPlaylistByIdQuery } from "@/services/playlists/playlistApi";
import {
  setOpen,
  useDetailPlaylistSlice,
} from "@/store/slices/detailPlaylistSlice";
import { formatUploadTime } from "@/utils/formatUploadTime";
import Image from "next/image";

const DetailPlaylistDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpen, playlist } = useDetailPlaylistSlice();

  const { data, isLoading, isError, isSuccess, error } =
    useGetPlaylistByIdQuery(playlist?._id || "", {
      skip: !playlist?._id || !isOpen,
    });

  if (!playlist) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => dispatch(setOpen({ isOpen: open }))}
    >
      <DialogContent className="!max-w-4xl !px-2">
        <ScrollArea className="h-[600px] px-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Playlist Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Cover Image</Label>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center justify-center">
                  {playlist.cover_images && playlist.cover_images.length > 0 ? (
                    <Image
                      src={playlist.cover_images[0].url}
                      alt={`${playlist.title} cover`}
                      width={300}
                      height={300}
                      className="w-[300px] aspect-square object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-[300px] h-[300px] flex items-center justify-center bg-muted rounded-lg">
                      No image
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Title</Label>
                <Input
                  value={playlist.title}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Creator</Label>
                <Input
                  value={playlist.owner.username || "Unknown"}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Created At</Label>
                <Input
                  value={formatUploadTime(playlist.createdAt)}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Last updated</Label>
                <Input
                  value={formatUploadTime(playlist.updatedAt)}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea
                  value={playlist.description || "No description"}
                  disabled
                  className="font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Tracks</Label>
              {isError && (
                <ErrorMessage
                  message={
                    (error as ApiErrorResponse)?.data?.message ||
                    "Failed to load tracks"
                  }
                />
              )}
              {isLoading && <LoaderSpin />}
              {isSuccess && data && (
                <SimpleTrackTable
                  tracks={playlist.tracks || []}
                  variant="default"
                  showAction={false}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => dispatch(setOpen({ isOpen: false }))}
                className="rounded-full"
              >
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailPlaylistDialog;
