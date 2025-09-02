"use client";
import UserForm from "@/app/(user)/profile/components/form/UserForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyProfileQuery } from "@/services/users/userApi";

const UserFormSkeleton = () => (
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

const UserInformationCard = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetMyProfileQuery();
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Personal Information
        </CardTitle>
        <CardDescription>
          Update your personal details and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isError && (
          <ErrorMessage
            message={
              (error as ApiErrorResponse)?.data?.message ||
              "An error occurred while fetching user data."
            }
          />
        )}

        {isLoading && <UserFormSkeleton />}

        {isSuccess && <UserForm user={data?.data.item} />}
      </CardContent>
    </Card>
  );
};
export default UserInformationCard;
