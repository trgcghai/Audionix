import AddTrackToAlbumDialog from "@/app/(artist-portal)/artist-tracks/components/AddTrackToAlbumDialog";
import { Track } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AddToAlbumSection = ({ selectedTracks }: { selectedTracks: Track[] }) => (
  <div>
    <AddTrackToAlbumDialog tracks={selectedTracks}>
      <Button variant="outline" className="rounded-full">
        <PlusCircle className="mr-1 h-4 w-4" />
        Add to album
      </Button>
    </AddTrackToAlbumDialog>
  </div>
);

export default AddToAlbumSection;
