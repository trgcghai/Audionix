import EditAlbumForm from "@/app/(artist-portal)/artist-albums/components/EditAlbumForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateNewAlbumPage = () => {
  return (
    <ScrollArea className="w-4xl mx-auto">
      <EditAlbumForm />
    </ScrollArea>
  );
};
export default CreateNewAlbumPage;
