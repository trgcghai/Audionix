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
  <div className="space-y-6 flex flex-col items-center justify-center">
    <Skeleton className="h-72 w-72 rounded-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
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
