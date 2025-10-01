import { ApiResponse, PaginatedResponse } from "@/app/types/api";
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

export type GetMyProfileResponse = ApiResponse<{
  item: User;
}>;

export type FindUserParams = {
  username?: string;
  email?: string;
  current?: number;
  limit?: number;
  sort?: string;
};

export type FindUserResponse = ApiResponse<PaginatedResponse<User>>;

export type FindUserByIdResponse = ApiResponse<{ item: User }>;

export type FindUserAsOptionsResponse = ApiResponse<{ items: Option[] }>;
