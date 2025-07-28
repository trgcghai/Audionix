"use client";
import { mockArtistTracks } from "@/app/sampleData";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateTrackPage = () => {
  const { id } = useParams();
  const track = useMemo(
    () => mockArtistTracks.find((track) => track.id === id),
    [id]
  );
  return <div className="w-4xl mx-auto">{track?.name}</div>;
};
export default UpdateTrackPage;
