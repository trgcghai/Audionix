"use client";
import {
  AUDIO_FILE_ACCEPT_TYPES,
  COVER_IMAGE_ACCEPT_TYPES,
} from "@/app/constant";
import { mockAlbums } from "@/app/sampleData";
import { ArtistTrackItem } from "@/app/types/component";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Music, XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import z from "zod";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  album: z.string().optional(),
  image: z.instanceof(File).optional(),
  audioFile: z.instanceof(File, { message: "Audio file is required" }),
  status: z.string({ message: "Status is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const UploadTrackForm = ({ track }: { track?: ArtistTrackItem }) => {
  const [previewImage, setPreviewImage] = useState<string>(
    track?.images[0]?.url || ""
  );
  const [previewAudio, setPreviewAudio] = useState<string>(track?.href || "");
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: track?.name || "",
      album: track?.album?.id || "",
      image: track?.images[0].url
        ? new File([], track?.images[0].url)
        : undefined,
      audioFile: track?.href ? new File([], track.href) : undefined,
      status: track?.status || "inactive",
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

  const onDropAudioFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        form.setValue("audioFile", file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewAudio(objectUrl);
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

  const audioFileInput = useDropzone({
    onDrop: onDropAudioFile,
    accept: AUDIO_FILE_ACCEPT_TYPES,
    maxFiles: 1,
    multiple: false,
  });

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted:", formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="audioFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">
                  Track Audio File
                </FormLabel>
                <FormControl>
                  <div
                    {...audioFileInput.getRootProps()}
                    className={`rounded-lg flex flex-col items-center justify-center cursor-pointer border border-dashed p-4`}
                  >
                    <Input
                      type="file"
                      {...audioFileInput.getInputProps()}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          const objectUrl = URL.createObjectURL(file);
                          setPreviewAudio(objectUrl);
                        }
                      }}
                    />

                    {previewAudio ? (
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-end gap-2">
                          <XIcon
                            className="h-4 w-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewAudio("");
                              field.onChange(undefined);
                            }}
                          />
                        </div>

                        <audio
                          controls
                          src={previewAudio}
                          className="w-full"
                          onError={() => setPreviewAudio("")}
                        >
                          Your browser does not support the audio element.
                        </audio>

                        <p className="text-xs text-center text-muted-foreground">
                          Drop a new file to replace
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Music className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drop audio file here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getAcceptedFileExtensions(AUDIO_FILE_ACCEPT_TYPES)}{" "}
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
        </div>

        <div className="">
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
                      {mockAlbums.map((album) => {
                        return (
                          <SelectItem key={album.id} value={album.id}>
                            {album.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
                    disabled={!track}
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
              track ? "update" : "upload"
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
              {track ? "Update" : "Upload"}
            </Button>
          </ConfirmDialog>
        </div>
      </form>
    </Form>
  );
};
export default UploadTrackForm;
