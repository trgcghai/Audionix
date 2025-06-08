"use client";
import { useCallback, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PlaylistItem } from "@/app/types/component";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";

interface EditPlaylistFormProps {
  data?: PlaylistItem;
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().optional(),
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EditPlaylistForm = ({ data }: EditPlaylistFormProps) => {
  const [previewImage, setPreviewImage] = useState<string>(
    data?.images[0]?.url || ""
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.name || "",
      description: "",
    },
  });

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted:", formData);
  };

  const onDrop = useCallback(
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 grid-cols-3 grid-rows-3"
      >
        <div className="grid col-span-1 row-span-3">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`relative w-full h-full rounded-lg flex flex-col items-center justify-center cursor-pointer`}
                  >
                    <input
                      {...getInputProps()}
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
                      <div className="relative w-full h-full">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center border rounded-lg">
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drop image here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG, GIF accepted
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

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormControl>
                  <Input {...field} placeholder="Add a title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 row-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add an optional description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end col-span-3">
          <Button type="submit" className="rounded-full">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditPlaylistForm;
