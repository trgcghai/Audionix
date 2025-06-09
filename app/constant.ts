// Define the array of valid variant values
export const SIMPLE_TABLE_TRACKS_VARIANTS = [
  "default",
  "artistTrack",
  "addToPlaylist",
] as const;

// Create a type from the array values
export type SimpleTrackTablesVariant =
  (typeof SIMPLE_TABLE_TRACKS_VARIANTS)[number];

export const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30, 35, 40] as const;

export const ARTIST_TRACK_STATUS_OPTIONS = ["active", "inactive"];

export type ArtistTrackStatus = (typeof ARTIST_TRACK_STATUS_OPTIONS)[number];
