"use client";

import ActionCell from "@/app/(admin)/admin/management/accounts/components/table/cells/ActionCell";
import { AccountStatus } from "@/app/enums";
import { Account } from "@/app/types/model";
import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import formatStringCapital from "@/utils/formatStringCapital";
import { formatUploadTime } from "@/utils/formatUploadTime";
import { ColumnDef } from "@tanstack/react-table";

export const AdminAccountColumns: ColumnDef<Account>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    id: "firstName",
    accessorKey: "firstName",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    meta: {
      label: "firstName",
      inputType: "text",
    },
  },
  {
    id: "lastName",
    accessorKey: "lastName",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    meta: {
      label: "lastName",
      inputType: "text",
    },
  },
  {
    id: "email",
    accessorKey: "email",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: {
      label: "Email",
      inputType: "text",
    },
  },
  {
    id: "roles",
    accessorKey: "roles",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.role.map((role) => (
          <Badge key={role} className="capitalize rounded-full">
            {role}
          </Badge>
        ))}
      </div>
    ),
    meta: {
      label: "Roles",
      inputType: "text",
    },
  },
  {
    id: "isVerified",
    accessorKey: "isVerified",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.isVerified ? "default" : "destructive"}
        className="rounded-full"
      >
        {row.original.isVerified ? "Verified" : "Unverified"}
      </Badge>
    ),
    meta: {
      label: "Verified",
      inputType: "text",
    },
  },
  {
    id: "isActivate",
    accessorKey: "isActivate",
    enableColumnFilter: true,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activated" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.isActivate ? "default" : "destructive"}
        className="rounded-full"
      >
        {formatStringCapital(
          row.original.isActivate
            ? AccountStatus.ACTIVATED
            : AccountStatus.DEACTIVATED,
        )}
      </Badge>
    ),
    meta: {
      label: "Verified",
      inputType: "text",
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.createdAt),
    meta: {
      label: "Created At",
      inputType: "date",
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    enableColumnFilter: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => formatUploadTime(row.original.updatedAt),
    meta: {
      label: "Created At",
      inputType: "date",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
