"use client";
import UploadTrackForm from "@/app/_components/Form/UploadTrackForm";
import { mockArtistTracks } from "@/app/sampleData";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateTrackPage = () => {
  const { id } = useParams();
  const track = useMemo(
    () => mockArtistTracks.find((track) => track.id === id),
    [id]
  );
  return (
    <div className="">
      <UploadTrackForm track={track} />
    </div>
  );
};
export default UpdateTrackPage;
