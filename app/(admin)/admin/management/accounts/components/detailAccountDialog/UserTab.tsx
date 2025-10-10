import { ApiErrorResponse } from "@/app/types/api";
import { User } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatUploadTime } from "@/utils/formatUploadTime";

interface UserTabProps {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: ApiErrorResponse | undefined;
}

const UserTab = ({ user, isLoading, isError, error }: UserTabProps) => {
  if (isLoading) return <LoaderSpin />;

  if (isError) {
    return (
      <ErrorMessage
        message={
          (error as ApiErrorResponse)?.data?.message ||
          "Failed to load user details"
        }
      />
    );
  }

  if (!user)
    return (
      <ErrorMessage message="No user information available" severity="info" />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Username</Label>
        <Input value={user.username} disabled className="font-medium" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Email</Label>
        <Input value={user.email} disabled className="font-medium" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Created At</Label>
        <Input
          value={formatUploadTime(user.createdAt)}
          disabled
          className="font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Last Updated</Label>
        <Input
          value={formatUploadTime(user.updatedAt)}
          disabled
          className="font-medium"
        />
      </div>

      <div className="space-y-2 col-span-2">
        <Label className="text-sm font-medium">Following Artists</Label>
        <div className="p-2 border rounded-md min-h-10 flex flex-wrap gap-2">
          {user.followed_artists && user.followed_artists.length > 0 ? (
            user.followed_artists.map((artistId, index) => (
              <Badge key={index} variant="outline">
                {artistId}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">
              Not following any artists
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 col-span-2">
        <Label className="text-sm font-medium">Following Albums</Label>
        <div className="p-2 border rounded-md min-h-10 flex flex-wrap gap-2">
          {user.followed_albums && user.followed_albums.length > 0 ? (
            user.followed_albums.map((albumId, index) => (
              <Badge key={index} variant="outline">
                {albumId}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">
              Not following any albums
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTab;
