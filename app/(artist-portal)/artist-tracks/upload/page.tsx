"use client";
import { createTrackValues } from "../components/form/schemas";
import UploadTrackForm from "../components/form/UploadTrackForm";

const UploadTrackPage = () => {
  const handleCreateTrack = (data: createTrackValues) => {
    // Handle the track creation logic here
    console.log("Track data submitted:", data);
    // You can call an API or perform any other actions with the data
  };
  return (
    <div className="w-4xl mx-auto">
      <UploadTrackForm onSubmit={handleCreateTrack} />
    </div>
  );
};
export default UploadTrackPage;
