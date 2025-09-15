"use client";
import UpdateTrackForm from "@/app/(artist-portal)/artist/tracks/components/form/UpdateTrackForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useGetTrackByIdQuery } from "@/services/tracks/trackApi";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateTrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetTrackByIdQuery(id, {
    skip: !id,
  });

  const track = useMemo(() => {
    return data && data.data;
  }, [data]);

  console.log(track?.albums);

  return (
    <div className="w-4xl mx-auto">
      {isError && (
        <ErrorMessage message={(error as ApiErrorResponse).data.message} />
      )}

      {isLoading && <LoaderSpin />}

      {track && <UpdateTrackForm track={track} />}
    </div>
  );
};
export default UpdateTrackPage;
