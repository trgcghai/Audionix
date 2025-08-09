import { Track } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";

interface TracksListProps {
  tracks: Track[];
  title?: string;
  description?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

const TracksList = ({
  tracks,
  title,
  description,
  isLoading,
  isError,
  error,
}: TracksListProps) => {
  if (isLoading) {
    return <LoaderSpin />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error || "An error occurred while loading recommendations"}
      />
    );
  }

  return (
    <div className="mx-0.5 mt-8">
      <p className="text-xl font-bold">{title}</p>
      {description && <p className="text-gray-500">{description}</p>}
      <SimpleTrackTable
        tracks={tracks}
        showHeader={false}
        variant="addToPlaylist"
        className="mt-4"
      />
    </div>
  );
};
export default TracksList;
