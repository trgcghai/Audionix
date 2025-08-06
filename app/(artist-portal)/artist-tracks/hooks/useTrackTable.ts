"use client";
import { useEffect, useState } from "react";
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
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [hasSelectedRows, setHasSelectedRows] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<TData[]>([]);
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

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setSelectedRowsCount(selectedRows.length);
    setHasSelectedRows(selectedRows.length > 0);
    setSelectedTracks(selectedRows.map((row) => row.original));
  }, [table]);

  return {
    table,
    selectedRowsCount,
    hasSelectedRows,
    selectedTracks,
  };
};
