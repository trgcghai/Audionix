import { cn } from "@/libs/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

export interface BaseHeroSectionProps {
  title: string;
  coverUrl: string;
  showCoverImage: boolean;
  isRoundImage?: boolean;
  children?: ReactNode;
  className?: string;
  width?: number;
  height?: number;
}

const BaseHeroSection = ({
  title,
  coverUrl,
  showCoverImage,
  isRoundImage = false,
  children,
  className,
  width,
  height,
}: BaseHeroSectionProps) => {
  return (
    <div className={cn("flex items-end gap-4", className)}>
      {showCoverImage ? (
        <Image
          src={coverUrl}
          alt={title}
          width={width || 500}
          height={height || 500}
          className={cn(
            "aspect-square object-cover w-1/5",
            isRoundImage ? "rounded-full" : "rounded-lg",
          )}
        />
      ) : (
        <div
          className={cn(
            "bg-muted flex aspect-square items-center w-1/5 justify-center",
            isRoundImage ? "rounded-full" : "rounded-lg",
          )}
        >
          <ImageIcon
            className={cn(
              "h-20 w-20",
              isRoundImage ? "rounded-full" : "rounded-lg",
            )}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default BaseHeroSection;
