"use client";
import MediaList from "@/app/(main)/components/MediaList";
import FilterButtons from "@/app/(main)/search/components/FilterButtons";
import useSearchManagement from "@/app/(main)/search/hooks/useSearchManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const { type } = useParams<{ type: string }>();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const { tracks, albums, artists, isLoading, isError, error } =
    useSearchManagement({ searchTerm, type });

  return (
    <div>
      <FilterButtons />

      {isLoading && <LoaderSpin fullScreen />}
      {isError && (
        <ErrorMessage
          message={
            (error as ApiErrorResponse)?.data?.message ||
            "Unknown error occurred. Please try again later."
          }
        />
      )}

      <div className="mt-4 px-3">
        {type === "tracks" && (
          <SimpleTrackTable tracks={tracks?.data.items || []} />
        )}
        {type === "artists" && <MediaList data={artists?.data.items || []} />}
        {type === "albums" && <MediaList data={albums?.data.items || []} />}
      </div>
    </div>
  );
};
export default Page;
