import { TrackStatus } from "../enums";

export type Track = {
  _id: string;
  title: string;
  duration_ms: string;
  cover_images: [
    {
      url: string;
      width: number;
      height: number;
      key: string;
    },
  ];
  status: TrackStatus;
  album: {
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
