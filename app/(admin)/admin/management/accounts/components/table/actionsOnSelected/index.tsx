"use client";
import { ACCOUNT_STATUS_OPTIONS } from "@/app/constant";
import { AccountStatus } from "@/app/enums";
import StatusChangeSection from "@/components/dataTable/StatusChangeSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useAdminActions from "@/hooks/useAdminActions";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const [selectedStatus, setSelectedStatus] = useState<AccountStatus | string>(
    "",
  );
  const { selectedIds } = useActionOnSelected(table);
  const { handleToggleActiveStatus } = useAdminActions();

  const handleUpdateStatusMany = (data: {
    ids: string[];
    status: AccountStatus;
  }) => {
    handleToggleActiveStatus({
      accountIds: data.ids,
      status: data.status,
    });
  };

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={(value) => setSelectedStatus(value as AccountStatus)}
        statusItems={ACCOUNT_STATUS_OPTIONS}
        onStatusConfirm={() => {
          handleUpdateStatusMany({
            ids: selectedIds,
            status: selectedStatus as AccountStatus,
          });
        }}
        title="Change account status"
        dialogTitle="Change Account Status"
        dialogDescription="Are you sure you want to change the status of the selected accounts? This will affect their ability to log in."
      />
    </div>
  );
}

export default DataTableActionsOnSelected;
