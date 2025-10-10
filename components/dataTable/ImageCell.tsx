import { Row } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageCellProps<T> {
  row: Row<T>;
  /**
   * Function to extract image URL from row data
   */
  getImageUrl: (data: T) => string | undefined;
  /**
   * Size of the image (width and height)
   * @default 70
   */
  size?: number;
  /**
   * Additional class names for the image
   */
  className?: string;
  /**
   * Alt text for the image
   * @default ""
   */
  alt?: string;
}

const ImageCell = <T,>({
  row,
  getImageUrl,
  size = 70,
  className = "aspect-square rounded object-cover",
  alt = "",
}: ImageCellProps<T>) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(row.original);

  if (!imageUrl || imageError) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border text-xs"
        style={{ width: size, height: size }}
      >
        <ImageIcon className="text-muted-foreground h-4 w-4" />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setImageError(true)}
    />
  );
};

export default ImageCell;
