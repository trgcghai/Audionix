"use client";
import AddNewTrackDialog from "@/app/(artist-portal)/artist/albums/components/AddNewTrackDialog";
import UpdateAlbumForm from "@/app/(artist-portal)/artist/albums/components/form/UpdateAlbumForm";
import { ApiErrorResponse } from "@/app/types/api";
import { Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
import useAlbumActions from "@/hooks/useAlbumActions";
import {
  useGetAlbumByIdQuery,
  useGetTracksInAlbumQuery,
} from "@/services/albums/albumApi";
import { useGetMyCreatedTrackQuery } from "@/services/tracks/trackApi";
import { PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const UpdateAlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error } = useGetAlbumByIdQuery(id, {
    skip: !id,
  });

  const album = useMemo(() => {
    return data && data.data;
  }, [data]);

  const { data: tracksData } = useGetTracksInAlbumQuery(id, {
    skip: !id,
  });

  const myTrackData = useGetMyCreatedTrackQuery(
    { title: search },
    { skip: !open },
  );

  const { handleAddTracksToAlbums } = useAlbumActions();

  const trackInTable = useMemo(() => {
    return (
      tracksData?.data.results.map(
        (item: { _id: Track; time_added: string }) => ({
          ...item._id,
          time_added: item.time_added,
        }),
      ) || []
    );
  }, [tracksData?.data.results]);

  return (
    <div className="w-full mx-auto flex gap-6">
      <div className="w-1/2">
        {isError && (
          <ErrorMessage message={(error as ApiErrorResponse).data.message} />
        )}

        {isLoading && <LoaderSpin />}

        {data && <UpdateAlbumForm album={album} />}
      </div>

      <div className="w-1/2">
        <SimpleTrackTable variant="albumManagement" tracks={trackInTable} />
        <Button
          variant={"outline"}
          className="w-full mt-4 rounded-full"
          onClick={() => setOpenAddDialog(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add new track to album
        </Button>
      </div>

      <AddNewTrackDialog
        tracks={
          myTrackData.data
            ? myTrackData.data.data.items.filter(
                (track) =>
                  !trackInTable.some(
                    (t: Track & { time_added: string }) => t._id === track._id,
                  ),
              )
            : []
        }
        isLoading={myTrackData.isLoading}
        isError={myTrackData.isError}
        error={(myTrackData.error as ApiErrorResponse)?.data?.message}
        search={search}
        setSearch={setSearch}
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        onAdd={(trackId) =>
          handleAddTracksToAlbums({
            albumsIds: [id],
            trackIds: [trackId],
          })
        }
      />
    </div>
  );
};
export default UpdateAlbumPage;
