"use client";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
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

  // Thêm state để theo dõi row selection
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection, // Thêm hàm xử lý thay đổi row selection
    state: {
      columnFilters,
      rowSelection, // Thêm rowSelection vào state
    },
    // Enable selection
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setSelectedRowsCount(selectedRows.length);
    setHasSelectedRows(selectedRows.length > 0);
    setSelectedTracks(selectedRows.map((row) => row.original));
  }, [table, rowSelection]);

  return {
    table,
    selectedRowsCount,
    hasSelectedRows,
    selectedTracks,
  };
};
