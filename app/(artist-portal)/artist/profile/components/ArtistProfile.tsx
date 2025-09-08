"use client";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyProfileQuery } from "@/services/users/userApi";

const ArtistFormSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-1/2" />
  </div>
);

const ArtistInformation = () => {
  const { isLoading, isError, error, isSuccess } = useGetMyProfileQuery();

  return (
    <div className="px-3">
      <p className="mb-4 text-xl font-bold">Your artist profile</p>

      {isLoading && <ArtistFormSkeleton />}
      {isError && (
        <ErrorMessage
          message={
            (error as ApiErrorResponse)?.data?.message ||
            "An error occurred while fetching tracks data. Please try again later"
          }
        />
      )}

      {isSuccess && <p>Artist profile form</p>}
    </div>
  );
};
export default ArtistInformation;
