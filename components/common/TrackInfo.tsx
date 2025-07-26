import { TrackItem } from "@/app/types/component";
import Image from "next/image";

const TrackInfo = ({ track, active = false }: { track: TrackItem, active?: boolean }) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width={50}
        height={50}
        className="rounded shadow-sm"
      />
      <div className="min-w-0">
        <p className={`text-md font-semibold truncate ${active ? "text-primary" : ""}`}>{track.name}</p>
        <p className="text-sm text-muted-foreground truncate">
          {track.artists[0].name}
        </p>
      </div>
    </div>
  );
};
export default TrackInfo;
