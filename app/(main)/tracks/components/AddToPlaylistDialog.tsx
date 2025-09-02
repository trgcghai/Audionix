"use client";
import { ApiErrorResponse } from "@/app/types/api";
import { Playlist } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import useToast from "@/hooks/useToast";
import { useGetMyPlaylistsQuery } from "@/services/playlists/playlistApi";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface AddToPlaylistDialogProps {
  trackId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const AddToPlaylistDialog = ({
  trackId,
  isOpen,
  onOpenChange,
}: AddToPlaylistDialogProps) => {
  const { showInfoToast } = useToast();
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const { handleCreatePlaylist } = usePlaylistAction();

  // Fetch user's playlists
  const {
    data: playlistsData,
    isLoading,
    isError,
    error,
  } = useGetMyPlaylistsQuery({});

  // Mutation for adding track to playlists
  const { handleAddTracksToPlaylists } = usePlaylistAction();

  // Reset selections when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPlaylists([]);
    }
  }, [isOpen]);

  // Handle checkbox change
  const handlePlaylistSelect = (playlistId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlaylists((prev) => [...prev, playlistId]);
    } else {
      setSelectedPlaylists((prev) => prev.filter((id) => id !== playlistId));
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (selectedPlaylists.length === 0) {
      showInfoToast("Please select at least one playlist.");
      return;
    }

    await handleAddTracksToPlaylists({
      playlistIds: selectedPlaylists,
      trackIds: [trackId],
    });

    onOpenChange(false);
  };

  // Check if track is already in playlist
  const isTrackInPlaylist = (playlist: Playlist) => {
    return playlist.tracks.some((track) => track._id === trackId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to playlist</DialogTitle>
          <DialogDescription>
            Select the playlists you want to add this track to.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading && <LoaderSpin />}

          {isError && (
            <ErrorMessage
              message={
                (error as ApiErrorResponse)?.data?.message ||
                "Không thể tải danh sách playlist"
              }
            />
          )}

          {!isLoading && !isError && playlistsData?.data.items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <PlusCircle className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                You don&apos;t have any playlists yet. Please create a playlist
                first.
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            playlistsData?.data.items.map((playlist) => {
              const isDisabled = isTrackInPlaylist(playlist);

              return (
                <div
                  key={playlist._id}
                  className="flex items-center space-x-3 py-3"
                >
                  <Checkbox
                    id={playlist._id}
                    checked={
                      selectedPlaylists.includes(playlist._id) || isDisabled
                    }
                    onCheckedChange={(checked) =>
                      handlePlaylistSelect(playlist._id, checked as boolean)
                    }
                    disabled={isDisabled}
                  />

                  <label
                    htmlFor={playlist._id}
                    className={`flex-1 text-base cursor-pointer truncate ${isDisabled ? "text-muted-foreground" : ""}`}
                  >
                    <div className="font-medium">{playlist.title}</div>
                  </label>
                </div>
              );
            })}
        </ScrollArea>

        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleCreatePlaylist}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create new playlist
        </Button>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-full"
            disabled={selectedPlaylists.length === 0}
          >
            Add to playlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlaylistDialog;
