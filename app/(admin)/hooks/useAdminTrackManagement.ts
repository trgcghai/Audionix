"use client";
import { Option } from "@/components/ui/MultipleSelector";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAlbumsAsFilterOptionsQuery } from "@/services/albums/albumApi";
import { useGetTracksForManagementQuery } from "@/services/tracks/trackApi";
import {
  clearFilters,
  setCurrentPage,
  setDebounceTitle,
  setFilters,
  setPageLimit,
} from "@/store/slices/trackManagement";
import { useCallback, useEffect, useRef } from "react";

const useAdminTrackManagement = () => {
  // State của filter
  const {
    current,
    limit,
    title,
    debounceTitle,
    albums,
    uploadTime,
    status,
    genres,
  } = useAppSelector((state) => state.trackManagement);
  const dispatch = useAppDispatch();
  const refTitle = useRef(title);
  const debouncedTitle = useDebounce(debounceTitle, 500);

  useEffect(() => {
    if (debouncedTitle !== refTitle.current) {
      refTitle.current = debouncedTitle;
      dispatch(setFilters({ title: debouncedTitle }));
    }
  }, [debouncedTitle, dispatch]);

  // Gọi API để lấy danh sách tracks
  const { data, isLoading, isError, error } = useGetTracksForManagementQuery(
    {
      current,
      limit,
      title: title ? title : undefined,
      genres: genres.length > 0 ? genres.map((g) => g.value) : undefined,
      status: status.length > 0 ? status.map((s) => s.value) : undefined,
      albums:
        albums.length > 0 ? albums.map((album) => album.value) : undefined,
    },
    {
      // Sử dụng refetchOnMountOrArgChange để đảm bảo dữ liệu luôn mới nhất
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: albumOptions } = useGetAlbumsAsFilterOptionsQuery({});

  // Action chuyển trang
  const toNextPage = useCallback(() => {
    dispatch(setCurrentPage(current + 1));
  }, [dispatch, current]);

  const toPreviousPage = useCallback(() => {
    if (current > 1) {
      dispatch(setCurrentPage(current - 1));
    }
  }, [dispatch, current]);

  const toFirstPage = useCallback(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  const toLastPage = useCallback(
    (totalPages: number) => {
      if (totalPages == 0) return;
      dispatch(setCurrentPage(totalPages));
    },
    [dispatch],
  );

  // Action thay đổi states value
  const setTitleFilter = useCallback(
    (title: string) => {
      dispatch(setDebounceTitle(title));
    },
    [dispatch],
  );

  const setLimitFilter = useCallback(
    (limit: number) => {
      dispatch(setPageLimit(limit));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const setStatusFilter = useCallback(
    (status: Option[]) => {
      dispatch(setFilters({ status }));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const setAlbumsFilter = useCallback(
    (albums: Option[]) => {
      dispatch(setFilters({ albums }));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const setUploadTimeFilter = useCallback(
    (uploadTime: Date | undefined) => {
      dispatch(setFilters({ uploadTime }));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const setGenresFilter = useCallback(
    (genres: Option[]) => {
      dispatch(setFilters({ genres }));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const clearFilter = useCallback(() => {
    dispatch(clearFilters());
    toFirstPage();
  }, [dispatch, toFirstPage]);

  return {
    // Data API
    isLoading,
    isError,
    error,
    tracks: data?.data.items || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.current || current,
    limit: data?.data.limit || limit,
    setLimitFilter,

    // album options
    albumOptions: albumOptions?.data.options || [],

    // State management
    title,
    setTitleFilter,
    albums,
    setAlbumsFilter,
    uploadTime,
    setUploadTimeFilter,
    status,
    setStatusFilter,
    genres,
    setGenresFilter,

    debounceTitle,

    // Clear filters
    clearFilter,

    // Pagination functions
    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};
export default useAdminTrackManagement;
