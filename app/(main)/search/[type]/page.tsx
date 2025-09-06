"use client";
import FilterButtons from "@/app/(main)/search/components/FilterButtons";
import MyPagination from "@/app/(main)/search/components/MyPagination";
import SearchResult from "@/app/(main)/search/components/SearchResult";
import useSearchManagement from "@/app/(main)/search/hooks/useSearchManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
  const { type } = useParams<{ type: string }>();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const {
    // data
    tracks,
    albums,
    artists,
    isLoading,
    isError,
    error,

    // pagination
    current,
    setCurrent,
    totalPages,
  } = useSearchManagement({ searchTerm, type });

  const data = useMemo(() => {
    if (type === "tracks") return tracks?.data?.items || [];
    if (type === "albums") return albums?.data?.items || [];
    if (type === "artists") return artists?.data?.items || [];
    return [];
  }, [type, tracks, albums, artists]);

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

      <SearchResult type={type} data={data} />

      {data.length > 0 && totalPages > 1 && (
        <MyPagination
          current={current}
          setCurrent={setCurrent}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
export default Page;
