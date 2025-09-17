"use client";
import UpdateAlbumForm from "@/app/(artist-portal)/artist/albums/components/form/UpdateAlbumForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useGetAlbumByIdQuery } from "@/services/albums/albumApi";
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

  return (
    <div className="w-4xl mx-auto">
      {isError && (
        <ErrorMessage message={(error as ApiErrorResponse).data.message} />
      )}

      {isLoading && <LoaderSpin />}

      {data && <UpdateAlbumForm album={album} />}
    </div>
  );
};
export default UpdateAlbumPage;
