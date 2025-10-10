"use client";

import TableFilters from "@/app/(admin)/admin/management/tracks/components/table/filters";
import useAdminTrackManagement from "@/app/(admin)/hooks/useAdminTrackManagement";
import DataTableActionsOnSelected from "@/app/(artist-portal)/artist/tracks/components/table/actionsOnSelected";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import { DataTableViewOptions } from "@/components/dataTable/DataTableViewOptions";
import TableContent from "@/components/dataTable/TableContent";
import { cn } from "@/libs/utils";
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
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showActions?: boolean;
  showViewOptions?: boolean;
  showFilterOptions?: boolean;
}

export function AdminTrackTable<TData, TValue>({
  columns,
  data,
  showActions = true,
  showViewOptions = true,
  showFilterOptions = true,
}: DataTableProps<TData, TValue>) {
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
  } = useAdminTrackManagement();

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setHasSelectedRows(selectedRows.length > 0);
  }, [table, rowSelection]);

  return (
    <div className="space-y-4">
      {showFilterOptions && (
        <TableFilters
          className="grid grid-cols-2 gap-x-12 gap-y-6"
          itemClassName="flex items-center gap-4 mb-0"
          inputClassName="flex-1 w-full rounded-full"
          labelClassName="text-sm w-1/7 capitalize"
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
}
