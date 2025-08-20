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
        <div className="bg-muted flex h-[220px] w-[220px] items-center justify-center rounded-lg">
          <ImageIcon className="h-20 w-20" />
        </div>
      )}
      {children}
    </div>
  );
};

export default BaseHeroSection;
