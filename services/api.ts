import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryWithBaseUrl } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQueryWithBaseUrl,
  tagTypes: ["Tracks", "Artists", "Albums", "User", "Playlists", "Accounts"],

  // thay đổi hành vi mặc định của RTK Query, tự động trigger refetch khi trang web được focus lại sau khi chuyển sang tab khác trong cùng 1 trình duyệt
  refetchOnFocus: true,

  // thay đổi hành vi mặc định của RTK Query, tự động trigger refetch khi trang web được focus lại sau khi kết nối lại internet
  refetchOnReconnect: true,

  endpoints: (builder) => {
    return {
      ping: builder.query<string, void>({
        query: () => ({ url: "/ping" }),
      }),
    };
  },
});

export const { usePingQuery } = api;
