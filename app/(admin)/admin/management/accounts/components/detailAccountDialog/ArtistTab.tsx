import { ApiErrorResponse } from "@/app/types/api";
import { Artist } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/MultipleSelector";
import formatStringCapital from "@/utils/formatStringCapital";
import { formatUploadTime } from "@/utils/formatUploadTime";
import Image from "next/image";

interface ArtistTabProps {
  artist: Artist | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: ApiErrorResponse | undefined;
}

const ArtistTab = ({ artist, isLoading, isError, error }: ArtistTabProps) => {
  if (!artist) {
    return (
      <ErrorMessage
        message="There is no artist profile linked with this account. Please check the account information or try again later."
        severity="info"
      />
    );
  }

  if (isLoading) return <LoaderSpin />;

  if (isError) {
    return (
      <ErrorMessage
        message={error?.data?.message || "Failed to load artist details"}
      />
    );
  }

  return (
    <div className="flex items-center gap-6 w-full">
      <div className="space-y-2 flex-1">
        <div className="relative w-full aspect-square">
          {artist?.cover_images && artist?.cover_images.length > 0 ? (
            <Image
              src={artist?.cover_images[0].url}
              alt={artist?.name}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="h-32 w-32 bg-muted rounded-full flex items-center justify-center">
              <span className="text-4xl font-semibold uppercase">
                {artist?.name?.charAt(0) || "U"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-[2] space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Artist Name</Label>
          <Input value={artist?.name} disabled className="font-medium" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Genres</Label>
          <MultipleSelector
            value={artist.genres.map((genre: string) => ({
              key: genre,
              value: genre,
              label: formatStringCapital(genre),
            }))}
            disabled
            className="p-1.5"
            badgeClassName="rounded-full !bg-primary !text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Created At</Label>
          <Input
            value={formatUploadTime(artist.createdAt)}
            disabled
            className="font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Last Updated</Label>
          <Input
            value={formatUploadTime(artist.updatedAt)}
            disabled
            className="font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistTab;
