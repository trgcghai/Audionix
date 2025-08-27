import { AlbumStatus, TrackStatus } from "../enums";

export type Track = {
  _id: string;
  title: string;
  type: "track";
  duration_ms: number;
  cover_images: [
    {
      url: string;
      width: number;
      height: number;
      key: string;
    },
  ];
  status: TrackStatus;
  albums: {
    _id: string;
    title: string;
    cover_images: [
      {
        url: string;
        width: number;
        height: number;
        key: string;
      },
    ];
  }[];
  artist: {
    _id: string;
    name: string;
    cover_images: [
      {
        url: string;
        width: number;
        height: number;
        key: string;
      },
    ];
  };
  genres: string[];
  file: {
    url: string;
    key: string;
    size: number;
    mimetype: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type EmbbedTrack = {
  _id: string;
  title: string;
  type: "track";
  duration_ms: number;
  cover_images: [
    {
      url: string;
      width: number;
      height: number;
      key: string;
    },
  ];
  artist: {
    _id: string;
    name: string;
  };
  albums: {
    _id: string;
    title: string;
  }[];
  genres: string[];
  file: {
    url: string;
    key: string;
    size: number;
    mimetype: string;
  };
  timeAdded?: string;
};

export type Account = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Artist = {
  _id: string;
  name: string;
  cover_images: [
    {
      url: string;
      width: number;
      height: number;
      key: string;
    },
  ];
  type: "artist";
  genres: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Playlist = {
  _id: string;
  title: string;
  owner?: string;
  status: string;
  type: "playlist";
  description: string;
  cover_images: [
    {
      url: string;
      width: number;
      height: number;
      key: string;
    },
  ];
  tracks: EmbbedTrack[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Album = {
  _id: string;
  title: string;
  artist: {
    _id: string;
    name: string;
    cover_images: [
      {
        url: string;
        width: number;
        height: number;
        key: string;
      },
    ];
  };
  description: string;
  status: AlbumStatus;
  cover_images: [
    {
      url: string;
      width: number;
      height: number;
      key: string;
    },
  ];
  tracks: EmbbedTrack[];
  genres: string[];
  number_of_followers: number;
  type: "album";
  createdAt: string;
  updatedAt: string;
  __v: number;
};
