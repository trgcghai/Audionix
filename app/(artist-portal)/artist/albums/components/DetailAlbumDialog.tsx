import { ApiErrorResponse } from "@/app/types/api";
import { Track } from "@/app/types/model";
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
import MultipleSelector from "@/components/ui/MultipleSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/hooks/redux";
import { useGetTracksInAlbumQuery } from "@/services/albums/albumApi";
import { setOpen, useDetailAlbumSlice } from "@/store/slices/detailAlbumSlice";
import formatStringCapital from "@/utils/formatStringCapital";
import { formatUploadTime } from "@/utils/formatUploadTime";
import Image from "next/image";
import Link from "next/link";

const DetailAlbumDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpen, album } = useDetailAlbumSlice();

  const { data, isLoading, isError, isSuccess, error } =
    useGetTracksInAlbumQuery(album?._id || "", {
      skip: !album?._id && !isOpen,
    });

  if (!album) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => dispatch(setOpen({ isOpen: open }))}
    >
      <DialogContent className="!max-w-4xl !px-2">
        <ScrollArea className="h-[600px] px-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Album Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Cover Image</Label>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center justify-center">
                  <Image
                    src={album.cover_images[0].url}
                    alt={`${album.title} cover`}
                    width={album.cover_images[0].width || 300}
                    height={album.cover_images[0].height || 300}
                    className="w-[300px] aspect-square object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Title</Label>
                <Input value={album.title} disabled className="font-medium" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Release Date</Label>
                <Input
                  value={formatUploadTime(album.createdAt)}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Last updated</Label>
                <Input
                  value={formatUploadTime(album.updatedAt)}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea
                  value={album.description || ""}
                  disabled
                  className="font-medium"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Genres</Label>
                <MultipleSelector
                  className="font-medium"
                  disabled
                  value={album.genres.map((genre) => ({
                    value: genre,
                    label: formatStringCapital(genre),
                  }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Tracks</Label>
              {isError && (
                <ErrorMessage
                  message={(error as ApiErrorResponse).data.message}
                />
              )}
              {isLoading && <LoaderSpin />}
              {isSuccess && (
                <SimpleTrackTable
                  tracks={data.data.results.map(
                    (item: { _id: Track; time_added: string }) => ({
                      ...item._id,
                      time_added: item.time_added,
                    }),
                  )}
                  variant="album"
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
              <Link href={`./albums/update/${album._id}`}>
                <Button className="rounded-full">Edit Album</Button>
              </Link>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailAlbumDialog;
