import { Columns } from "@/app/_components/DataTable/AlbumTable/Columns"
import AlbumTable from "@/app/_components/DataTable/AlbumTable/Table"
import { mockArtistAlbums } from "@/app/sampleData"
import { ScrollArea } from "@/components/ui/scroll-area"

const ArtistAlbumPage = () => {
  return (
    <ScrollArea className="px-3">
      <p className="text-xl font-bold mb-4">Your albums</p>

      <AlbumTable 
        columns={Columns}
        data={[...mockArtistAlbums, ...mockArtistAlbums, ...mockArtistAlbums]}
      />
    </ScrollArea>
  )
}
export default ArtistAlbumPage