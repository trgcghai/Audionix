"use client";
import { useCallback, useEffect, useRef } from "react";
import { useGetMyCreatedAlbumsQuery } from "@/services/albums/albumApi";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter } from "next/navigation";
import { Option } from "@/components/ui/MultipleSelector";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  clearFilters,
  setCurrentPage,
  setDebounceTitle,
  setFilters,
  setPageLimit,
} from "@/store/slices/albumManagement";

const useAlbumManagement = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { current, limit, title, debounceTitle, genres, uploadTime, status } =
    useAppSelector((state) => state.albumManagement);
  const dispatch = useAppDispatch();
  const refTitle = useRef(title);
  const debouncedTitle = useDebounce(debounceTitle, 500);

  useEffect(() => {
    if (debouncedTitle !== refTitle.current) {
      refTitle.current = debouncedTitle;
      dispatch(setFilters({ title: debouncedTitle }));
    }
  }, [debouncedTitle, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (status.length > 0) params.set("status", status.join(","));
    if (genres.length > 0) params.set("genres", genres.join(","));
    if (uploadTime) params.set("uploadTime", uploadTime.toISOString());
    if (current) params.set("current", current.toString());
    if (limit !== 10) params.set("limit", limit.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [genres, current, limit, pathname, router, status, title, uploadTime]);

  const { data, ...getAlbumState } = useGetMyCreatedAlbumsQuery(
    {
      current,
      limit,
      title: title ? title : undefined,
      status: status.length > 0 ? status.map((s) => s.value) : undefined,
      genres: genres.length > 0 ? genres.map((g) => g.value) : undefined,
    },
    { refetchOnMountOrArgChange: true },
  );

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

  const setGenresFilter = useCallback(
    (genres: Option[]) => {
      dispatch(setFilters({ genres }));
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

  const clearFilter = useCallback(() => {
    dispatch(clearFilters());
    toFirstPage();
  }, [dispatch, toFirstPage]);

  return {
    getAlbumState,
    albums: data?.data.items || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.current || current,
    limit: data?.data.limit || limit,
    setLimitFilter,

    title,
    setTitleFilter,
    genres,
    setGenresFilter,
    uploadTime,
    setUploadTimeFilter,
    status,
    setStatusFilter,

    debounceTitle,
    clearFilter,

    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};
export default useAlbumManagement;
