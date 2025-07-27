"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Music, XIcon } from "lucide-react";
import { useFileUploadWithPreview } from "@/hooks/useFileUpload";
import { AUDIO_FILE_ACCEPT_TYPES } from "@/app/constant";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";
import { useEffect } from "react";

interface AudioUploadFieldProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  label?: string;
  initialPreview?: string;
}

export const AudioUploadField = ({
  onChange,
  label = "Audio File",
  initialPreview = "",
}: AudioUploadFieldProps) => {
  const {
    preview,
    setPreview,
    error,
    clearPreview,
    handlePreviewError,
    dropzone,
  } = useFileUploadWithPreview({
    accept: AUDIO_FILE_ACCEPT_TYPES,
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
    <FormItem>
      <FormLabel className="text-md font-semibold">{label}</FormLabel>
      <FormControl>
        <div
          {...dropzone.getRootProps()}
          className="rounded-lg flex flex-col items-center justify-center cursor-pointer border border-dashed p-4"
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
              <audio
                controls
                src={preview}
                className="w-full"
                onError={handlePreviewError}
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
                {error
                  ? "Audio failed to load. Please try again."
                  : "Drop audio file here or click to upload"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {getAcceptedFileExtensions(AUDIO_FILE_ACCEPT_TYPES)} accepted
              </p>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
