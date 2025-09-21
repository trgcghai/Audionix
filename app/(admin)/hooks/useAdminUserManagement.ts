"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetUsersQuery } from "@/services/users/userApi";
import {
  clearFilters,
  setCurrentPage,
  setDebounceUsername,
  setFilters,
  setPageLimit,
} from "@/store/slices/userManagement";
import { useCallback, useEffect, useRef } from "react";

const useAdminUserManagement = () => {
  const { current, limit, username, email, debounceUsername } = useAppSelector(
    (state) => state.userManagement,
  );
  const dispatch = useAppDispatch();
  const refUsername = useRef(username);
  const debouncedUsername = useDebounce(debounceUsername, 500);

  useEffect(() => {
    if (debouncedUsername !== refUsername.current) {
      refUsername.current = debouncedUsername;
      dispatch(setFilters({ username: debouncedUsername }));
    }
  }, [debouncedUsername, dispatch]);

  const { data, ...getUserState } = useGetUsersQuery(
    {
      current,
      limit,
      username: username ? username : undefined,
      email: email ? email : undefined,
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
      if (totalPages === 0) return;
      dispatch(setCurrentPage(totalPages));
    },
    [dispatch],
  );

  const setUsernameFilter = useCallback(
    (username: string) => {
      dispatch(setDebounceUsername(username));
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

  const setEmailFilter = useCallback(
    (email: string) => {
      dispatch(setFilters({ email }));
      toFirstPage();
    },
    [dispatch, toFirstPage],
  );

  const clearFilter = useCallback(() => {
    dispatch(clearFilters());
    toFirstPage();
  }, [dispatch, toFirstPage]);

  return {
    getUserState,
    users: data?.data.items || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.current || current,
    limit: data?.data.limit || limit,
    setLimitFilter,

    username,
    setUsernameFilter,
    email,
    setEmailFilter,

    debounceUsername,
    clearFilter,

    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};

export default useAdminUserManagement;
