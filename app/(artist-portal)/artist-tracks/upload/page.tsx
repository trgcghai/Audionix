"use client";
import { useCreateTrackMutation } from "@/services/tracks/trackApi";
import { createTrackValues } from "../components/form/schemas";
import UploadTrackForm from "../components/form/UploadTrackForm";
import { ApiErrorResponse } from "@/app/types/api";
import useToast from "@/hooks/useToast";

const UploadTrackPage = () => {
  const [createTrack, { isLoading, isError, error }] = useCreateTrackMutation();
  const { showSuccessToast, showErrorToast } = useToast();

  const transformToPayload = (data: createTrackValues) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.albums && data.albums.length > 0) {
      formData.append(
        "albumIds",
        JSON.stringify(data.albums.map((album) => album.value)),
      );
    }

    formData.append(
      "genres",
      JSON.stringify(data.genres.map((genre) => genre.value)),
    );

    formData.append("cover_image", data.cover_image[0]);

    formData.append("audio", data.audio[0]);

    return formData;
  };

  const handleCreateTrack = async (data: createTrackValues) => {
    console.log("Track data submitted:", data);

    try {
      const payload = transformToPayload(data);

      await createTrack(payload).unwrap();

      showSuccessToast("Track uploaded successfully!");
    } catch (err) {
      console.error("Error creating track:", err);
      showErrorToast("Upload track failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-4xl">
      <UploadTrackForm
        onSubmit={handleCreateTrack}
        isLoading={isLoading}
        isError={isError}
        error={
          (error as ApiErrorResponse)?.message ||
          "An error occurred while uploading the track."
        }
      />
    </div>
  );
};
export default UploadTrackPage;
