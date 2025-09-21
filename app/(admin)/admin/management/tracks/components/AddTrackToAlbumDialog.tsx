"use client";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import useAlbumActions from "@/hooks/useAlbumActions";
import { useGetAlbumsAsFilterOptionsQuery } from "@/services/albums/albumApi";
import { useState } from "react";

interface AddTrackToAlbumDialogProps {
  tracks: Track[];
  statusDialogOpen?: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
  setStatusDialogOpen?: (open: boolean) => void;
}

const AddTrackToAlbumDialog = ({
  tracks,
  statusDialogOpen,
  children,
  asChild = true,
  setStatusDialogOpen = () => {},
}: AddTrackToAlbumDialogProps) => {
  const [albums, setAlbums] = useState<Option[]>([]);
  const { data } = useGetAlbumsAsFilterOptionsQuery({});

  const {
    handleAddTracksToAlbums,
    addTracksToAlbumsState: { isLoading },
  } = useAlbumActions();

  const handleCancel = () => {
    setStatusDialogOpen(false);
    setAlbums([]);
  };

  const handleSave = async () => {
    const albumIds = albums.map((album) => album.value);
    const trackIds = tracks.map((track) => track._id);

    await handleAddTracksToAlbums({ albumsIds: albumIds, trackIds });

    setStatusDialogOpen(false);
    setAlbums([]);
  };

  return (
    <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add selected track(s) to album</DialogTitle>
        </DialogHeader>

        <MultipleSelector
          options={data?.data?.options || []}
          value={albums}
          onChange={setAlbums}
          placeholder="Select albums"
          emptyIndicator={
            <div className="flex items-center justify-center">
              <ErrorMessage
                message="No albums found."
                severity="info"
                variant="inline"
                showIcon={false}
              />
            </div>
          }
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="rounded-full"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? <LoaderSpin /> : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddTrackToAlbumDialog;
