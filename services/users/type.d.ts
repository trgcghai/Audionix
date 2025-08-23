import { ApiResponse } from "@/app/types/api";

export type CheckUserFollowArtistResponse = ApiResponse<{
  result: [
    {
      artistId: string;
      isFollowing: boolean;
    },
  ];
}>;
