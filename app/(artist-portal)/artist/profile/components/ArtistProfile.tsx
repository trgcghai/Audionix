"use client";
import ArtistForm from "@/app/(artist-portal)/artist/profile/components/form/ArtistForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyArtistProfileQuery } from "@/services/artists/artistApi";

const ArtistFormSkeleton = () => (
  <div className="space-y-6 flex flex-col items-center justify-center">
    <Skeleton className="h-72 w-72 rounded-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

const ArtistInformation = () => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetMyArtistProfileQuery();

  return (
    <div className="px-3">
      <p className="mb-4 text-xl font-bold">Your artist profile</p>

      {isLoading && <ArtistFormSkeleton />}
      {isError && (
        <ErrorMessage message={(error as ApiErrorResponse)?.data?.message} />
      )}

      {isSuccess && <ArtistForm artist={data.data} />}
    </div>
  );
};
export default ArtistInformation;
