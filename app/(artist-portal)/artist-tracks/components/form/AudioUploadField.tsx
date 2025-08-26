"use client";
import { createTrackValues } from "@/app/(artist-portal)/artist-tracks/components/form/schemas";
import { AUDIO_FILE_ACCEPT_TYPES } from "@/app/constant";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/common/FileUploader";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";
import { Music } from "lucide-react";
import { DropzoneOptions } from "react-dropzone";
import { ControllerRenderProps } from "react-hook-form";

interface AudioUploadFieldProps {
  field: ControllerRenderProps<createTrackValues, "audio">;
}

export const AudioUploadField = ({ field }: AudioUploadFieldProps) => {
  const options = {
    multiple: false,
    maxFiles: 1,
    accept: AUDIO_FILE_ACCEPT_TYPES,
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
            <Music className="text-muted-foreground mb-2 h-10 w-10" />
            <p className="text-muted-foreground text-sm">
              Drop audio here or click to upload
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {getAcceptedFileExtensions(AUDIO_FILE_ACCEPT_TYPES)} accepted
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
              className="size-auto w-full px-10 hover:bg-none"
            >
              <div className="w-full">
                <audio controls className="w-full">
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      )}
    </FileUploader>
  );
};
