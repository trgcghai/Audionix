"use client";
import { useCallback, useEffect, useState } from "react";
import { useGetTracksQuery } from "./trackApi";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter } from "next/navigation";

const useTrackManagement = () => {
  // Router để cập nhật URL query params
  const router = useRouter();
  const pathname = usePathname();

  // State của filter
  const [current, setCurrent] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [title, setTitle] = useState<string>("");
  const [albums, setAlbums] = useState<string[]>([]);
  const [uploadTime, setUploadTime] = useState<string>("");
  const [status, setStatus] = useState<string[]>([]);

  // Debounce title để tránh gọi API quá nhiều lần khi người dùng gõ
  const debouncedTitle = useDebounce(title, 500);

  // Cập nhật URL query params khi state thay đổi
  useEffect(() => {
    const params = new URLSearchParams();

    // Chỉ thêm params có giá trị
    if (title) params.set("title", title);
    if (status.length > 0) params.set("status", status.join(","));
    if (albums.length > 0) params.set("albums", albums.join(","));
    if (uploadTime) params.set("uploadTime", uploadTime);
    if (current > 1) params.set("page", current.toString());
    if (limit !== 10) params.set("limit", limit.toString());

    // Cập nhật URL không reload trang
    router.replace(`${pathname}?${params.toString()}`);
  }, [albums, current, limit, pathname, router, status, title, uploadTime]);

  // Gọi API để lấy danh sách tracks
  const { data, isLoading, isError, error } = useGetTracksQuery(
    {
      current,
      limit,
      title: debouncedTitle,
      status: status.length > 0 ? status : undefined,
      albums: albums.length > 0 ? albums : undefined,
    },
    {
      // Sử dụng refetchOnMountOrArgChange để đảm bảo dữ liệu luôn mới nhất
      refetchOnMountOrArgChange: true,
    },
  );

  // Action chuyển trang
  const toNextPage = useCallback(() => {
    if (data && data.data.currentPage < data.data.totalPages) {
      setCurrent((prev) => prev + 1);
    }
  }, [data]);

  const toPreviousPage = useCallback(() => {
    if (data && data.data.currentPage > 1) {
      setCurrent((prev) => prev - 1);
    }
  }, [data]);

  const toFirstPage = useCallback(() => {
    setCurrent(1);
  }, []);

  const toLastPage = useCallback(() => {
    if (data) {
      setCurrent(data.data.totalPages);
    }
  }, [data]);

  // Action thay đổi states value
  const setTitleFilter = useCallback(
    (title: string) => {
      setTitle(title);
      toFirstPage();
    },
    [toFirstPage],
  );

  const setLimitFilter = useCallback(
    (limit: number) => {
      setLimit(limit);
      toFirstPage();
    },
    [toFirstPage],
  );

  const setStatusFilter = useCallback(
    (status: string[]) => {
      setStatus(status);
      toFirstPage();
    },
    [toFirstPage],
  );

  const setAlbumsFilter = useCallback(
    (albums: string[]) => {
      setAlbums(albums);
      toFirstPage();
    },
    [toFirstPage],
  );

  const setUploadTimeFilter = useCallback(
    (uploadTime: string) => {
      setUploadTime(uploadTime);
      toFirstPage();
    },
    [toFirstPage],
  );

  return {
    // Data API
    isLoading,
    isError,
    error,
    tracks: data?.data.items || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.currentPage || current,
    limit: data?.data.limit || limit,
    setLimitFilter,

    // State management
    title,
    setTitleFilter,
    albums,
    setAlbumsFilter,
    uploadTime,
    setUploadTimeFilter,
    status,
    setStatusFilter,

    // Pagination functions
    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};
export default useTrackManagement;
