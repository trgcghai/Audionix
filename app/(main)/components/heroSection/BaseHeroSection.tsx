import { Music } from "lucide-react";
import Image from "next/image";

interface BaseHeroSectionProps {
  title: string;
  coverUrl?: string;
  showCoverImage?: boolean;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const BaseHeroSection = ({
  title,
  coverUrl,
  showCoverImage = true,
  width = 300,
  height = 300,
  children,
}: BaseHeroSectionProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
      <div className="flex-shrink-0 w-full sm:w-auto">
        <div className="aspect-square w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 mx-auto sm:mx-0">
          {showCoverImage && coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              width={width}
              height={height}
              quality={100}
              className="h-full w-full rounded-lg object-cover"
              priority
            />
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
              <Music className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 w-full sm:w-auto">{children}</div>
    </div>
  );
};

export default BaseHeroSection;
