"use client";
import UpdateAlbumForm from "@/app/(artist-portal)/artist/albums/components/form/UpdateAlbumForm";
import { ApiErrorResponse } from "@/app/types/api";
import { Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Button } from "@/components/ui/button";
import {
  useGetAlbumByIdQuery,
  useGetTracksInAlbumQuery,
} from "@/services/albums/albumApi";
import { PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateAlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetAlbumByIdQuery(id, {
    skip: !id,
  });

  const album = useMemo(() => {
    return data && data.data;
  }, [data]);

  const { data: tracksData } = useGetTracksInAlbumQuery(id, {
    skip: !id,
  });

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
        <SimpleTrackTable
          variant="albumManagement"
          tracks={
            tracksData?.data.results.map(
              (item: { _id: Track; time_added: string }) => ({
                ...item._id,
                time_added: item.time_added,
              }),
            ) || []
          }
        />
        <Button variant={"outline"} className="w-full mt-4 rounded-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add new track to album
        </Button>
      </div>
    </div>
  );
};
export default UpdateAlbumPage;
