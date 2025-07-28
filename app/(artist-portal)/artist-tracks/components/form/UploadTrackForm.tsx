"use client";
import { mockAlbums } from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { createTrackValues } from "./schemas";
import { useCreateTrackForm } from "../../hooks/useCreateTrackForm";
import { ImageUploadField } from "./ImageUploadField";
import { AudioUploadField } from "./AudioUploadField";
import StatusSelect from "../StatusSelect";

interface UploadTrackFormProps {
  onSubmit?: (data: createTrackValues) => void;
}

const UploadTrackForm = ({ onSubmit }: UploadTrackFormProps) => {
  const {
    form,
    dialogOpen,
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  } = useCreateTrackForm({ onSubmit });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <ImageUploadField
              value={field.value}
              onChange={field.onChange}
              label="Track Cover Image"
              initialPreview={undefined}
            />
          )}
        />

        <FormField
          control={form.control}
          name="audioFile"
          render={({ field }) => (
            <AudioUploadField
              value={field.value}
              onChange={field.onChange}
              label="Track Audio File"
              initialPreview={undefined}
            />
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel className="text-md font-semibold">Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Track name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="album"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel className="text-md font-semibold">Album</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an album" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAlbums.map((album) => (
                      <SelectItem key={album.id} value={album.id}>
                        {album.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel className="text-md font-semibold">Status</FormLabel>
              <FormControl>
                <StatusSelect
                  status={field.value}
                  handleStatusChange={field.onChange}
                  disabled={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6 py-2"
            onClick={handleReset}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="rounded-full px-6 py-2"
            onClick={openConfirmDialog}
          >
            Upload
          </Button>
          <ConfirmDialog
            title="Confirm Upload"
            description={`Are you sure you want to upload this track? Please ensure all details are correct before proceeding.`}
            onConfirm={() => form.handleSubmit(handleSubmit)()}
            onCancel={closeConfirmDialog}
            isOpen={dialogOpen}
            setIsOpen={setDialogOpen}
          />
        </div>
      </form>
    </Form>
  );
};
export default UploadTrackForm;
