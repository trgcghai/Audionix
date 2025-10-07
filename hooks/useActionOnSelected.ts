"use client";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

export const useActionOnSelected = <TData>(table: Table<TData>) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const selectedItems = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return {
    selectedStatus,
    selectedItems,
    handleStatusChange,
  };
};
