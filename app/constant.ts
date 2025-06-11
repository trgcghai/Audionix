export const SIMPLE_TABLE_TRACKS_VARIANTS = [
  "default",
  "artistTrack",
  "addToPlaylist",
] as const;

export const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30, 35, 40] as const;

export const ARTIST_TRACK_STATUS_OPTIONS = ["active", "inactive"];

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
