"use client";
import { Option } from "@/components/ui/MultipleSelector";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetPlaylistsQuery } from "@/services/playlists/playlistApi";
import {
  clearFilters,
  setCurrentPage,
  setDebounceTitle,
  setFilters,
  setPageLimit,
} from "@/store/slices/playlistManagement";
import { useCallback, useEffect, useRef } from "react";

const useAdminPlaylistManagement = () => {
  const { current, limit, title, debounceTitle, owners } = useAppSelector(
    (state) => state.playlistManagement,
  );
  const dispatch = useAppDispatch();
  const refTitle = useRef(title);
  const debouncedTitle = useDebounce(debounceTitle, 500);

  useEffect(() => {
    if (debouncedTitle !== refTitle.current) {
      refTitle.current = debouncedTitle;
      dispatch(setFilters({ title: debouncedTitle }));
    }
  }, [debouncedTitle, dispatch]);

  const { data, ...getPlaylistState } = useGetPlaylistsQuery(
    {
      current,
      limit,
      title: title ? title : undefined,
      owners:
        owners && owners.length > 0
          ? owners.map((owner) => owner.value)
          : undefined,
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

  const setOwnersFilter = useCallback(
    (owners: Option[]) => {
      dispatch(setFilters({ owners }));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const setLimitFilter = useCallback(
    (limit: number) => {
      dispatch(setPageLimit(limit));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const clearFilter = useCallback(() => {
    dispatch(clearFilters());
    toFirstPage();
  }, [dispatch, toFirstPage]);

  return {
    getPlaylistState,
    playlists: data?.data.items || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.current || current,
    limit: data?.data.limit || limit,
    setLimitFilter,

    title,
    setTitleFilter,
    owners,
    setOwnersFilter,

    debounceTitle,
    clearFilter,

    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};
export default useAdminPlaylistManagement;
