"use client";
import { Label } from "@/components/ui/label";
import { Table } from "@tanstack/react-table";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import AddTrackToAlbumDialog from "../AddTrackToAlbumDialog";
import { ArtistTrackItem } from "@/app/types/component";
import { PlusCircle, Trash2 } from "lucide-react";
import { useTrackActions } from "../../hooks/useTrackActions";
import { useState } from "react";
import StatusSelect from "../StatusSelect";

const StatusChangeSection = ({
  selectedStatus,
  selectedRowsCount,
  statusDialogOpen,
  onStatusChange,
  onStatusConfirm,
  onCloseDialog,
}: {
  selectedStatus: string | undefined;
  selectedRowsCount: number;
  statusDialogOpen: boolean;
  onStatusChange: (value: string) => void;
  onStatusConfirm: () => void;
  onCloseDialog: () => void;
}) => (
  <div className="flex items-center gap-2">
    <Label>Change selected row to status:</Label>
    <StatusSelect
      status={selectedStatus!}
      handleStatusChange={onStatusChange}
    />
    <ConfirmDialog
      title="Confirm Status Change"
      description={`Are you sure you want to change the status of ${selectedRowsCount} selected items to "${selectedStatus}"? This action can be reversed later.`}
      onCancel={onCloseDialog}
      onConfirm={onStatusConfirm}
      isOpen={statusDialogOpen}
      setIsOpen={onCloseDialog}
    />
  </div>
);

const AddToAlbumSection = ({
  selectedTracks,
}: {
  selectedTracks: ArtistTrackItem[];
}) => (
  <div>
    <AddTrackToAlbumDialog tracks={selectedTracks}>
      <Button variant="outline" className="rounded-full">
        <PlusCircle className="h-4 w-4 mr-1" />
        Add to album
      </Button>
    </AddTrackToAlbumDialog>
  </div>
);

const DeleteSection = ({
  selectedRowsCount,
  onDeleteConfirm,
}: {
  selectedRowsCount: number;
  onDeleteConfirm: () => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      <Button
        variant="destructive"
        className="rounded-full"
        onClick={() => setDialogOpen(true)}
      >
        <Trash2 className="h-4 w-4 mr-1" /> Delete selected
      </Button>
      <ConfirmDialog
        title="Confirm Deletion"
        description={`Are you absolutely sure to delete all ${selectedRowsCount} selected items? This action cannot be undone.`}
        onConfirm={onDeleteConfirm}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const {
    selectedStatus,
    statusDialogOpen,
    selectedTracks,
    handleStatusChange,
    handleStatusConfirm,
    handleDeleteConfirm,
    closeStatusDialog,
  } = useTrackActions(table);

  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex items-center gap-4">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        selectedRowsCount={selectedRowsCount}
        statusDialogOpen={statusDialogOpen}
        onStatusChange={handleStatusChange}
        onStatusConfirm={handleStatusConfirm}
        onCloseDialog={closeStatusDialog}
      />

      <AddToAlbumSection selectedTracks={selectedTracks} />

      <DeleteSection
        selectedRowsCount={selectedRowsCount}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
