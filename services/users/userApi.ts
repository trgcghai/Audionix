import { api } from "@/services/api";
import {
  CheckUserFollowAlbumResponse,
  CheckUserFollowArtistResponse,
  UpdateUserResponse,
} from "@/services/users/type";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followArtist: builder.mutation<void, string>({
      query: (artistId) => {
        return {
          url: `/users/me/following/artists`,
          method: "PUT",
          data: {
            artistId,
          },
        };
      },
      invalidatesTags: ["Artists"],
    }),
    unfollowArtist: builder.mutation<void, string>({
      query: (artistId) => {
        return {
          url: `/users/me/following/artists`,
          method: "DELETE",
          data: {
            artistId,
          },
        };
      },
      invalidatesTags: ["Artists"],
    }),
    followAlbum: builder.mutation<void, string>({
      query: (albumId) => {
        return {
          url: `/users/me/following/albums`,
          method: "PUT",
          data: {
            albumId,
          },
        };
      },
      invalidatesTags: ["Albums"],
    }),
    unfollowAlbum: builder.mutation<void, string>({
      query: (albumId) => {
        return {
          url: `/users/me/following/albums`,
          method: "DELETE",
          data: {
            albumId,
          },
        };
      },
      invalidatesTags: ["Albums"],
    }),
    checkIfUserIsFollowingArtists: builder.query<
      CheckUserFollowArtistResponse,
      string[]
    >({
      query: (artistIds) => {
        return {
          url: `/users/me/following/artists/contains`,
          method: "GET",
          params: {
            artistIds: artistIds.join(","),
          },
        };
      },
      providesTags: ["Artists"],
    }),
    checkIfUserIsFollowingAlbums: builder.query<
      CheckUserFollowAlbumResponse,
      string[]
    >({
      query: (albumIds) => {
        return {
          url: `/users/me/following/albums/contains`,
          method: "GET",
          params: {
            albumIds: albumIds.join(","),
          },
        };
      },
      providesTags: ["Albums"],
    }),
    updateUserProfile: builder.mutation<UpdateUserResponse, FormData>({
      query: (formData) => {
        return {
          url: `/users/me`,
          method: "PUT",
          data: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useFollowAlbumMutation,
  useUnfollowAlbumMutation,
  useCheckIfUserIsFollowingArtistsQuery,
  useCheckIfUserIsFollowingAlbumsQuery,
  useUpdateUserProfileMutation,
} = userApi;
