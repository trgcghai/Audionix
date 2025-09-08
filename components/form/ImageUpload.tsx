import { COVER_IMAGE_ACCEPT_TYPES } from "@/app/constant";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFileUploadWithPreview } from "@/hooks/useFileUpload";
import getAcceptedFileExtensions from "@/utils/getAcceptedFileExtensions";
import { ImageIcon, User2, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  initialPreview?: string;
  disabled?: boolean;
  variant: "playlist" | "user";
}

const ImageUpload = ({
  onChange,
  initialPreview = "",
  disabled,
  variant,
}: ImageUploadProps) => {
  const {
    preview,
    setPreview,
    error,
    clearPreview,
    handlePreviewError,
    dropzone,
  } = useFileUploadWithPreview({
    accept: COVER_IMAGE_ACCEPT_TYPES,
    maxFiles: 1,
    multiple: false,
    onFileChange: onChange,
  });

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

  if (variant === "playlist") {
    return (
      <FormItem className="">
        <FormControl>
          <div
            {...dropzone.getRootProps()}
            className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border p-4`}
          >
            <Input
              {...dropzone.getInputProps()}
              onChange={handleFileInputChange}
              disabled={disabled}
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
      </FormItem>
    );
  }

  if (variant === "user") {
    return (
      <FormItem className="">
        <FormControl>
          <div
            {...dropzone.getRootProps()}
            className="relative flex flex-col items-center justify-center"
          >
            <Input
              {...dropzone.getInputProps()}
              onChange={handleFileInputChange}
              disabled={disabled}
              className="hidden"
            />
            <div className="relative group flex flex-col items-center justify-center">
              {/* Avatar preview */}
              <div className="relative">
                {preview && !error ? (
                  <Image
                    src={preview}
                    alt="Avatar Preview"
                    width={250}
                    height={250}
                    className="aspect-square rounded-full object-cover border border-muted"
                    onError={handlePreviewError}
                  />
                ) : (
                  <div className="bg-muted flex aspect-square w-[250px] h-[250px] items-center justify-center rounded-full border border-muted">
                    <User2 className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                {/* Remove button */}
                {preview && !error && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 rounded-full bg-background p-1 shadow hover:bg-muted"
                    onClick={handleClear}
                    tabIndex={-1}
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-col items-center">
                <span className="text-muted-foreground text-xs">
                  {error
                    ? "Image failed to load. Please try again."
                    : "Click or drop to change avatar"}
                </span>
                <span className="text-muted-foreground mt-1 text-xs">
                  {getAcceptedFileExtensions(COVER_IMAGE_ACCEPT_TYPES)} accepted
                </span>
              </div>
            </div>
          </div>
        </FormControl>
      </FormItem>
    );
  }

  return null;
};
export default ImageUpload;
