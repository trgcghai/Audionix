import { Track } from "@/app/types/model";
import Image from "next/image";

const TrackInfo = ({
  track,
  active = false,
}: {
  track?: Track;
  active?: boolean;
}) => {
  if (!track) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <Image
        src={track.cover_images[0].url}
        alt={track.title}
        width={50}
        height={50}
        className="rounded shadow-sm"
      />
      <div className="min-w-0">
        <p
          className={`text-md truncate ${active ? "text-primary font-semibold" : ""}`}
        >
          {track.title}
        </p>
        <p className="text-muted-foreground truncate text-sm">
          {track.artist?.name}
        </p>
      </div>
    </div>
  );
};
export default TrackInfo;
