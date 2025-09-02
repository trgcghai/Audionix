import { ApiResponse } from "@/app/types/api";
import { User } from "@/app/types/model";

export type CheckUserFollowArtistResponse = ApiResponse<{
  result: [
    {
      artistId: string;
      isFollowing: boolean;
    },
  ];
}>;

export type CheckUserFollowAlbumResponse = ApiResponse<{
  result: [
    {
      albumId: string;
      isFollowing: boolean;
    },
  ];
}>;

export type UpdateUserResponse = ApiResponse<{
  message: string;
  result: User;
}>;
