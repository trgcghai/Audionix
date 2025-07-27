"use client";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { ArtistTrackItem } from "@/app/types/component";

export const useTrackActions = <TData,>(table: Table<TData>) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [addToAlbumDialogOpen, setAddToAlbumDialogOpen] = useState(false);

  const selectedTracks = table
    .getSelectedRowModel()
    .rows.map((row) => row.original) as ArtistTrackItem[];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    console.log(`Changing status to: ${selectedStatus}`);
    console.log(`Selected tracks:`, selectedTracks);
    setStatusDialogOpen(false);
    setSelectedStatus(undefined);
    // TODO: Implement actual status update logic
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting selected tracks:", selectedTracks);
    // TODO: Implement actual delete logic
  };

  const handleAddToAlbum = (albumId: string) => {
    console.log(`Adding tracks to album ${albumId}:`, selectedTracks);
    setAddToAlbumDialogOpen(false);
    // TODO: Implement actual add to album logic
  };

  const closeStatusDialog = () => {
    setStatusDialogOpen(false);
    setSelectedStatus(undefined);
  };

  return {
    selectedStatus,
    statusDialogOpen,
    addToAlbumDialogOpen,
    selectedTracks,
    handleStatusChange,
    handleStatusConfirm,
    handleDeleteConfirm,
    handleAddToAlbum,
    closeStatusDialog,
    setAddToAlbumDialogOpen,
  };
};
