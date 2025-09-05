import { ARTIST_ALBUM_STATUS_OPTIONS, ArtistTrackStatus } from "../constant";

export interface PlaylistItem {
  _id: string;
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  href: string;
  description?: string;
}

export interface AlbumItem {
  total_tracks: number;
  href: string;
  _id: string;
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  type: string;
}

export interface ArtistItem {
  href: string;
  _id: string;
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  type: string;
}

export interface TrackItem {
  album: AlbumItem;
  artists: ArtistItem[];
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  duration_ms: number;
  explicit: boolean;
  href: string;
  _id: string;
  name: string;
  track_number: number;
  type: string;
}

export interface ArtistTrackItem {
  album: AlbumItem;
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  duration_ms: number;
  explicit: boolean;
  href: string;
  _id: string;
  name: string;
  track_number: number;
  type: string;
  uploadTime: string;
  status: ArtistTrackStatus;
}

export interface TrackInArtistAlbum {
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  duration_ms: number;
  _id: string;
  name: string;
  track_number: number;
}

export interface ArtistAlbumItem {
  total_tracks: number;
  href: string;
  _id: string;
  cover_images: {
    url: string;
    height: number;
    width: number;
  }[];
  tracks: TrackInArtistAlbum[];
  name: string;
  type: string;
  uploadTime: string;
  status: ArtistAlbumStatus;
}

export type ArtistAlbumStatus = (typeof ARTIST_ALBUM_STATUS_OPTIONS)[number];
