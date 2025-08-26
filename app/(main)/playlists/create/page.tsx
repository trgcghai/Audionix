import { PlaylistHeroSection } from "@/app/(main)/components/heroSection";
import { PlaylistItem } from "@/app/types/component";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CornerDownLeft, Plus, Repeat } from "lucide-react";

const CreatePlaylistPage = () => {
  const newPlaylist: PlaylistItem = {
    _id: "new-playlist",
    name: "New AI Playlist",
    type: "playlist",
    cover_images: [],
    tracks: {
      href: "",
      total: 0,
    },
    description: "",
    href: "",
  };

  return (
    <div>
      <PlaylistHeroSection playlist={newPlaylist} />

      <Separator className="my-4" />

      <div>
        <div className="flex items-center justify-start">
          <Button variant="default" className="text-md gap-1 rounded-full">
            <Plus className="h-4 w-4" />
            <span className="ml-1">Create</span>
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-start gap-2">
          <Input
            className="w-2/5 rounded-full"
            placeholder="Describe the musical experience you want (e.g. 'Jazz for a dinner party')"
          />
          <Input
            type="number"
            placeholder="Number of tracks, default is 20"
            min={1}
            className="w-1/5 rounded-full"
          />

          <Button
            variant="default"
            className="text-md aspect-square h-10 w-10 rounded-full font-semibold"
          >
            <CornerDownLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="text-md aspect-square h-10 w-10 rounded-full font-semibold"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <SimpleTrackTable
        tracks={[]}
        showHeader={false}
        variant="addToPlaylist"
        className="mt-4"
      />
    </div>
  );
};
export default CreatePlaylistPage;
