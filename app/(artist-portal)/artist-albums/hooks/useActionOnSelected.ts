"use client";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { Album } from "@/app/types/model";

export const useActionOnSelected = <TData>(table: Table<TData>) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const selectedAlbums = table
    .getSelectedRowModel()
    .rows.map((row) => row.original) as Album[];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return {
    selectedStatus,
    selectedAlbums,
    handleStatusChange,
  };
};
