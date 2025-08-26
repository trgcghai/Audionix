"use client";
import { Track } from "@/app/types/model";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

export const useActionOnSelected = <TData>(table: Table<TData>) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const selectedTracks = table
    .getSelectedRowModel()
    .rows.map((row) => row.original) as Track[];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return {
    selectedStatus,
    selectedTracks,
    handleStatusChange,
  };
};
