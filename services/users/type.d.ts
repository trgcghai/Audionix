import { ApiResponse } from "@/app/types/api";

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
