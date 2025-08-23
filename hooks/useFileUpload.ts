import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UseFileUploadWithPreviewProps {
  accept: Record<string, string[]>;
  onFileChange: (file: File) => void;
  multiple?: boolean;
  maxFiles?: number;
}

export const useFileUploadWithPreview = ({
  accept,
  onFileChange,
  multiple = false,
  maxFiles = 1,
}: UseFileUploadWithPreviewProps) => {
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileChange(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setError(false);
      }
    },
    [onFileChange],
  );

  const dropzone = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple,
  });

  const clearPreview = () => {
    setPreview("");
    setError(false);
  };

  const handlePreviewError = () => {
    setError(true);
  };

  return {
    preview,
    setPreview,
    error,
    clearPreview,
    handlePreviewError,
    dropzone,
  };
};
