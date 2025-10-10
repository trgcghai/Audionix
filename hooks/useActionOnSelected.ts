"use client";
import { Table } from "@tanstack/react-table";

export const useActionOnSelected = <TData>(
  table: Table<TData>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idExtractor: (item: TData) => string = (item: any) => item._id,
) => {
  // Lấy các dòng được chọn
  const selectedRows = table.getSelectedRowModel().rows;

  // Trích xuất dữ liệu gốc
  const selectedItems = selectedRows.map((row) => row.original);

  // Trích xuất IDs để thuận tiện
  const selectedIds = selectedItems.map((item) => idExtractor(item));

  // Số lượng dòng được chọn
  const selectedCount = selectedRows.length;

  return {
    selectedItems,
    selectedIds,
    selectedCount,

    hasSelected: selectedCount > 0,
  };
};
