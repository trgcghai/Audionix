import { ArtistTrackStatus } from "../constant";

export interface LibraryItemProps {
  data: PlaylistItem | AlbumItem | ArtistItem;
}

export interface PlaylistItem {
  id: string;
  images: {
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
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  type: string;
}

export interface ArtistItem {
  href: string;
  id: string;
  images: {
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
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  name: string;
  track_number: number;
  type: string;
}

export interface ArtistTrackItem {
  album: AlbumItem;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  name: string;
  track_number: number;
  type: string;
  uploadTime: string;
  status: ArtistTrackStatus;
}
