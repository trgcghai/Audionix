import { Columns } from "@/app/_components/DataTable/TrackTable/Columns";
import { TrackTable } from "@/app/_components/DataTable/TrackTable/Table";
import EditAlbumForm from "@/app/_components/Form/EditAlbumForm";
import { mockArtistTracks } from "@/app/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateNewAlbumPage = () => {
  console.log(Columns);
  
  return (
    <ScrollArea className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="">
          <EditAlbumForm />
        </div>

        <div className="">
          {/* <TrackTable
            columns={Columns}
            data={[...mockArtistTracks, ...mockArtistTracks]}
          /> */}
        </div>
      </div>
    </ScrollArea>
  );
};
export default CreateNewAlbumPage;
