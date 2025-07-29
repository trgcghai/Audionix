"use client";
import { useCallback, useState } from "react";
import { useGetTracksQuery } from "./trackApi";

const useTrackManagement = () => {
  const [current, setCurrent] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState<string | undefined>("");
  const [artist, setArtist] = useState<string | undefined>("");
  const [status, setStatus] = useState<string | undefined>("");
  const [sort, setSort] = useState<string | undefined>("createdAt");
  const [album, setAlbum] = useState<string | undefined>("");

  const { data, isLoading, isError } = useGetTracksQuery({
    current,
    limit,
    title,
    artist,
    status,
    sort,
    albums: album ? [album] : undefined,
  });

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

  return {
    // Data structure
    tracks: data?.data.result || [],
    totalItems: data?.data.totalItems || 0,
    totalPages: data?.data.totalPages || 0,
    current: data?.data.currentPage || current,
    setCurrent,
    limit: data?.data.limit || limit,
    setLimit,
    isLoading,
    isError,

    // State management
    title,
    setTitle,
    artist,
    setArtist,
    status,
    setStatus,
    sort,
    setSort,
    album,
    setAlbum,

    // Pagination functions
    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage,
  };
};
export default useTrackManagement;
