import EditAlbumForm from "@/app/_components/Form/EditAlbumForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateNewAlbumPage = () => {
  return (
    <ScrollArea className="w-4xl mx-auto">
      <EditAlbumForm />
    </ScrollArea>
  );
};
export default CreateNewAlbumPage;
