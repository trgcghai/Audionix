"use client";
import { Input } from "@/components/ui/input";
import { Music, XIcon } from "lucide-react";
import { useFileUploadWithPreview } from "@/hooks/useFileUpload";
import { AUDIO_FILE_ACCEPT_TYPES } from "@/app/constant";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";
import { useEffect } from "react";

interface AudioUploadFieldProps {
  onChange: (file: File | undefined) => void;
  initialPreview?: string;
  disabled?: boolean;
}

export const AudioUploadField = ({
  onChange,
  initialPreview = "",
  disabled,
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
    <div
      {...dropzone.getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4"
    >
      <Input
        {...dropzone.getInputProps()}
        type="file"
        onChange={handleFileInputChange}
        disabled={disabled}
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
          <p className="text-muted-foreground text-center text-xs">
            Drop a new file to replace
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4">
          <Music className="text-muted-foreground mb-2 h-10 w-10" />
          <p className="text-muted-foreground text-sm">
            {error
              ? "Audio failed to load. Please try again."
              : "Drop audio file here or click to upload"}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {getAcceptedFileExtensions(AUDIO_FILE_ACCEPT_TYPES)} accepted
          </p>
        </div>
      )}
    </div>
  );
};
