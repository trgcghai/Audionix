import Image from "next/image";
import { ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/libs/utils";

export interface BaseHeroSectionProps {
  title: string;
  coverUrl: string;
  showCoverImage: boolean;
  isRoundImage?: boolean;
  children?: ReactNode;
  className?: string;
}

const BaseHeroSection = ({
  title,
  coverUrl,
  showCoverImage,
  isRoundImage = false,
  children,
  className,
}: BaseHeroSectionProps) => {
  return (
    <div className={cn("flex items-end gap-4", className)}>
      {showCoverImage ? (
        <Image
          src={coverUrl}
          alt={title}
          width={220}
          height={220}
          className={cn(
            "aspect-square object-cover",
            isRoundImage ? "rounded-full" : "rounded-lg",
          )}
        />
      ) : (
        <div
          className={cn(
            "bg-muted flex h-[220px] w-[220px] items-center justify-center",
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
