"use client";
import MediaList from "@/components/common/MediaList";
import { mockData } from "@/app/sampleData";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { ApiErrorResponse } from "@/app/types/api";

export default function Home() {
  const {
    data: trackData,
    isLoading: trackLoading,
    isError: trackError,
    error: trackErrorData,
  } = useGetTracksQuery({
    limit: 7,
  });

  return (
    <div className="space-y-8 first:mt-2">
      {trackData && trackData.data.items && (
        <MediaList
          title={"You may have interest"}
          data={trackData.data.items}
          isLoading={trackLoading}
          isError={trackError}
          error={(trackErrorData as ApiErrorResponse)?.message}
        />
      )}
      {mockData
        .filter((item) => item.title != "You may have interest")
        .map((item) => {
          return (
            <MediaList key={item._id} title={item.title} data={item.data} />
          );
        })}
    </div>
  );
}
