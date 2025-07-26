"use client";
import { mockArtistAlbums } from "@/app/sampleData";
import { ArtistTrackItem } from "@/app/types/component";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AddTrackToAlbumDialogProps {
  tracks: ArtistTrackItem[];
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
  const [album, setAlbum] = useState<string>("");

  const handleAddToAlbum = () => {
    console.log(`Adding ${tracks.length} track(s) to album with ID: ${album}`);
  };

  return (
    <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add selected track(s) to album</DialogTitle>
        </DialogHeader>

        <Select onValueChange={(value) => setAlbum(value)} value={album}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an album" />
          </SelectTrigger>
          <SelectContent>
            {mockArtistAlbums.map((album) => {
              return (
                <SelectItem key={album.id} value={album.id}>
                  {album.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="rounded-full"
              onClick={handleAddToAlbum}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddTrackToAlbumDialog;
