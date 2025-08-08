"use client";

import { createTrackValues } from "@/app/(artist-portal)/artist-tracks/components/form/schemas";
import { COVER_IMAGE_ACCEPT_TYPES } from "@/app/constant";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/common/FileUploader";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { DropzoneOptions } from "react-dropzone";
import { ControllerRenderProps } from "react-hook-form";

interface ImageUploadFieldProps {
  field: ControllerRenderProps<createTrackValues, "cover_image">;
}

export const ImageUploadField = ({ field }: ImageUploadFieldProps) => {
  const options = {
    multiple: false,
    maxFiles: 1,
    accept: COVER_IMAGE_ACCEPT_TYPES,
  } satisfies DropzoneOptions;

  return (
    <FileUploader
      value={field.value}
      onValueChange={field.onChange}
      dropzoneOptions={options}
      reSelect={true}
    >
      {(!field.value || field.value.length === 0) && (
        <FileInput className="border-muted relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4">
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
            <ImageIcon className="text-muted-foreground mb-2 h-10 w-10" />
            <p className="text-muted-foreground text-sm">
              Drop image here or click to upload
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {getAcceptedFileExtensions(COVER_IMAGE_ACCEPT_TYPES)} accepted
            </p>
          </div>
        </FileInput>
      )}
      {field.value && field.value.length > 0 && (
        <FileUploaderContent className="border-muted flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4">
          {field.value.map((file, index) => (
            <FileUploaderItem
              index={index}
              key={file.name}
              className="size-auto px-10 hover:bg-none"
            >
              <div className="space-y-2">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="aspect-square rounded-lg object-cover"
                />
              </div>
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      )}
    </FileUploader>
  );
};
