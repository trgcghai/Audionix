"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { cn } from "@/libs/utils";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import { DataTableViewOptions } from "@/components/dataTable/DataTableViewOptions";
import DataTableFilterOptions from "@/components/dataTable/DataTableFilterOptions";
import { useEffect, useState } from "react";
import DataTableActionsOnSelected from "./DataTableActionsOnSelected";
import useAlbumManagement from "@/app/(artist-portal)/artist-albums/hooks/useAlbumManagement";
import TableContent from "@/components/dataTable/TableContent";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showActions?: boolean;
  showViewOptions?: boolean;
  showFilterOptions?: boolean;
}

const AlbumTable = <TData, TValue>({
  columns,
  data,
  showActions = true,
  showViewOptions = true,
  showFilterOptions = true,
}: DataTableProps<TData, TValue>) => {
  const [hasSelectedRows, setHasSelectedRows] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  const {
    current,
    limit,
    totalPages,
    setLimitFilter,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = useAlbumManagement();

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setHasSelectedRows(selectedRows.length > 0);
  }, [table, rowSelection]);

  return (
    <div className="space-y-4">
      {showFilterOptions && (
        <DataTableFilterOptions
          table={table}
          className="space-y-4"
          itemClassName="mb-4 w-full"
          inputClassName="w-full"
          labelClassName="text-md w-1/5"
        />
      )}
      <div
        className={cn(
          "mb-4 flex items-center justify-end",
          showActions && hasSelectedRows && "justify-between",
        )}
      >
        {showActions && hasSelectedRows && (
          <DataTableActionsOnSelected table={table} />
        )}
        {showViewOptions && <DataTableViewOptions table={table} />}
      </div>
      <TableContent table={table} columns={columns} />
      <DataTablePagination
        current={current}
        limit={limit}
        totalPages={totalPages}
        setLimit={setLimitFilter}
        onGoToFirst={toFirstPage}
        onGoToPrevious={toPreviousPage}
        onGoToNext={toNextPage}
        onGoToLast={toLastPage}
      />
    </div>
  );
};
export default AlbumTable;
