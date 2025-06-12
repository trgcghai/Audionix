"use client";
import { useCallback, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArtistAlbumItem } from "@/app/types/component";
import Image from "next/image";
import { ImageIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { COVER_IMAGE_ACCEPT_TYPES } from "@/app/constant";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getAcceptedFileExtensions from "@/app/_utils/getAcceptedFileExtensions";

const formSchema = z.object({
  name: z.string({ message: "Name is required" }),
  image: z.instanceof(File).optional(),
  status: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

const EditAlbumForm = ({ album }: { album?: ArtistAlbumItem }) => {
  const [previewImage, setPreviewImage] = useState<string>(
    album?.images[0]?.url || ""
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: album?.name || "",
      image: album?.images[0].url
        ? new File([], album?.images[0].url)
        : undefined,
      status: album?.status || "inactive",
    },
  });

  const onDropCoverImage = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        form.setValue("image", file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
      }
    },
    [form]
  );

  const coverImageFileInput = useDropzone({
      onDrop: onDropCoverImage,
      accept: COVER_IMAGE_ACCEPT_TYPES,
      maxFiles: 1,
      multiple: false,
    });

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted:", formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel className="text-md font-semibold">
                  Track Cover Image
                </FormLabel>
                <FormControl>
                  <div
                    {...coverImageFileInput.getRootProps()}
                    className={`relative w-full h-full rounded-lg flex flex-col items-center justify-center cursor-pointer border border-dashed p-4`}
                  >
                    <Input
                      type="file"
                      {...coverImageFileInput.getInputProps()}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          const objectUrl = URL.createObjectURL(file);
                          setPreviewImage(objectUrl);
                        }
                      }}
                    />
                    {previewImage ? (
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-end gap-2">
                          <XIcon
                            className="h-4 w-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewImage("");
                              field.onChange(undefined);
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-center">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            width={300}
                            height={300}
                            className="rounded-lg object-cover"
                            onError={() => setPreviewImage("")}
                          />
                        </div>

                        <p className="text-xs text-center text-muted-foreground">
                          Drop a new file to replace
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drop image here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getAcceptedFileExtensions(COVER_IMAGE_ACCEPT_TYPES)}{" "}
                          accepted
                        </p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormLabel className="text-md font-semibold">Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Album name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormLabel className="text-md font-semibold">Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    {...field}
                    disabled={!album}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end items-center gap-4">
          <Button
            type="button"
            variant={"outline"}
            className="rounded-full px-6 py-2"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <ConfirmDialog
            title="Confirm Upload"
            description={`Are you sure you want to ${
              album ? "update" : "upload"
            } this track ? Please ensure all details are correct before proceeding.`}
            onConfirm={() => {
              form.handleSubmit(onSubmit)();
              setDialogOpen(false);
            }}
            onCancel={() => setDialogOpen(false)}
            statusDialogOpen={dialogOpen}
            setStatusDialogOpen={setDialogOpen}
            asChild
          >
            <Button type="button" className="rounded-full px-6 py-2">
              {album ? "Update" : "Upload"}
            </Button>
          </ConfirmDialog>
        </div>
      </form>
    </Form>
  );
};
export default EditAlbumForm;
