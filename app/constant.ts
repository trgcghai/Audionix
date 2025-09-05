import { Option } from "@/components/ui/MultipleSelector";
import { AlbumStatus, TrackStatus } from "./enums";

export const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30, 35, 40] as const;

export const ARTIST_TRACK_STATUS_OPTIONS = ["active", "inactive"];

export const TrackStatusValues = Object.entries(TrackStatus).map(
  ([key, value]) => ({
    key,
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " "),
  }),
);

export const AlbumStatusValues = Object.entries(AlbumStatus).map(
  ([key, value]) => ({
    key,
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " "),
  }),
);

export const ARTIST_ALBUM_STATUS_OPTIONS = ["published", "hidden"];

export const COVER_IMAGE_ACCEPT_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
};

export const AUDIO_FILE_ACCEPT_TYPES = {
  "audio/mpeg": [".mp3"],
  "audio/wav": [".wav"],
  "audio/ogg": [".ogg"],
  "audio/flac": [".flac"],
  "audio/aac": [".aac"],
  "audio/x-m4a": [".m4a"],
};

export const DEFAULT_GENRES: Option[] = [
  {
    value: "pop",
    label: "Pop",
  },
  {
    value: "rock",
    label: "Rock",
  },
  {
    value: "hip-hop",
    label: "Hip-Hop",
  },
  {
    value: "jazz",
    label: "Jazz",
  },
  {
    value: "classical",
    label: "Classical",
  },
  {
    value: "electronic",
    label: "Electronic",
  },
  {
    value: "country",
    label: "Country",
  },
  {
    value: "reggae",
    label: "Reggae",
  },
  {
    value: "blues",
    label: "Blues",
  },
  {
    value: "metal",
    label: "Metal",
  },
  {
    value: "folk",
    label: "Folk",
  },
  {
    value: "latin",
    label: "Latin",
  },
  {
    value: "indie",
    label: "Indie",
  },
];

export const MAX_FILE_SIZE_MB = 25; // 25MB

export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // convert to bytes

export const ITEM_PER_MEDIA_ROW = 6;
