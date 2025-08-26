import { Album } from "@/app/types/model";
import { Row } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ImageCell = ({ row }: { row: Row<Album> }) => {
  const imageUrl = row.original.cover_images[0]?.url;
  const [imageError, setImageError] = useState(false);

  if (!imageUrl || imageError) {
    return (
      <div className="flex h-[70px] w-[70px] items-center justify-center rounded-lg border text-xs">
        <ImageIcon className="text-muted-foreground h-4 w-4" />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={""}
      width={70}
      height={70}
      className="aspect-square rounded object-cover"
      onError={() => setImageError(true)}
    />
  );
};
export default ImageCell;
