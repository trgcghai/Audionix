"use client";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface UseTrackTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const useTrackTable = <TData, TValue>({
  columns,
  data,
}: UseTrackTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const hasSelectedRows = selectedRowsCount > 0;
  const selectedTracks = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  return {
    table,
    selectedRowsCount,
    hasSelectedRows,
    selectedTracks,
  };
};
