"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { COVER_IMAGE_ACCEPT_TYPES } from "@/app/constant";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";
import { useEffect } from "react";
import { useFileUploadWithPreview } from "@/hooks/useFileUpload";

interface ImageUploadFieldProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  label?: string;
  initialPreview?: string;
}

export const ImageUploadField = ({
  onChange,
  label = "Cover Image",
  initialPreview = "",
}: ImageUploadFieldProps) => {
  const {
    preview,
    setPreview,
    error,
    clearPreview,
    handlePreviewError,
    dropzone,
  } = useFileUploadWithPreview({
    accept: COVER_IMAGE_ACCEPT_TYPES,
    onFileChange: onChange,
  });

  // Set initial preview nếu có
  useEffect(() => {
    if (initialPreview && !preview) {
      setPreview(initialPreview);
    }
  }, [initialPreview, preview, setPreview]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearPreview();
    onChange(undefined);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <FormItem className="h-full">
      <FormLabel className="text-md font-semibold">{label}</FormLabel>
      <FormControl>
        <div
          {...dropzone.getRootProps()}
          className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4"
        >
          <Input
            type="file"
            {...dropzone.getInputProps()}
            onChange={handleFileInputChange}
          />
          {preview && !error ? (
            <div className="w-full space-y-2">
              <div className="flex items-center justify-end gap-2">
                <XIcon className="h-4 w-4" onClick={handleClear} />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={preview}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="aspect-square rounded-lg object-cover"
                  onError={handlePreviewError}
                />
              </div>
              <p className="text-muted-foreground text-center text-xs">
                Drop a new file to replace
              </p>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <ImageIcon className="text-muted-foreground mb-2 h-10 w-10" />
              <p className="text-muted-foreground text-sm">
                {error
                  ? "Image failed to load. Please try again."
                  : "Drop image here or click to upload"}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {getAcceptedFileExtensions(COVER_IMAGE_ACCEPT_TYPES)} accepted
              </p>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
