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
