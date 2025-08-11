"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import { DataTableViewOptions } from "@/components/dataTable/DataTableViewOptions";
import DataTableFilterOptions from "@/components/dataTable/DataTableFilterOptions";
import DataTableActionsOnSelected from "./DataTableActionsOnSelected";
import { useTrackTable } from "../../hooks/useTrackTable";
import TableContent from "@/components/dataTable/TableContent";
import { cn } from "@/libs/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showActions?: boolean;
  showViewOptions?: boolean;
  showFilterOptions?: boolean;
}

export function TrackTable<TData, TValue>({
  columns,
  data,
  showActions = true,
  showViewOptions = true,
  showFilterOptions = true,
}: DataTableProps<TData, TValue>) {
  const { table, hasSelectedRows } = useTrackTable({ columns, data });
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
      <DataTablePagination table={table} />
    </div>
  );
}
