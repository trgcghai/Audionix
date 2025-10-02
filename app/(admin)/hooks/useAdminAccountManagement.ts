"use client";
import { Option } from "@/components/ui/MultipleSelector";
import { useAppDispatch } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAccountsQuery } from "@/services/auth/authApi";
import {
  clearFilters,
  setCurrentPage,
  setDebounceEmail,
  setFilters,
  setPageLimit,
  useAccountManagementSlice,
} from "@/store/slices/accountManagement";
import { useCallback, useEffect, useRef } from "react";

const useAdminAccountManagement = () => {
  const { current, limit, email, debounceEmail, roles } =
    useAccountManagementSlice();
  const dispatch = useAppDispatch();
  const refEmail = useRef(email);
  const debouncedEmail = useDebounce(debounceEmail, 500);

  useEffect(() => {
    if (debouncedEmail !== refEmail.current) {
      refEmail.current = debouncedEmail;
      dispatch(setFilters({ email: debouncedEmail }));
    }
  }, [debouncedEmail, dispatch]);

  const { data, ...getUsersState } = useGetAccountsQuery(
    {
      current,
      limit,
      email: email ? email : undefined,
      role: roles.length > 0 ? roles.map((r) => r.value).join(",") : undefined,
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

  const setEmailFilter = useCallback(
    (email: string) => {
      dispatch(setDebounceEmail(email));
    },
    [dispatch],
  );

  const setRolesFilter = useCallback(
    (roles: Option[]) => {
      dispatch(setFilters({ roles }));
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
    getUsersState,
    accounts: data?.data.items || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.current || current,
    limit: data?.data.limit || limit,
    setLimitFilter,

    email,
    setEmailFilter,
    roles,
    setRolesFilter,

    debounceEmail,
    clearFilter,

    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};

export default useAdminAccountManagement;
