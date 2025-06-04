import {
  AlbumItem,
  ArtistItem,
  PlaylistItem,
  TrackItem,
} from "./types/component";

const mockPlaylists: PlaylistItem[] = [
  {
    id: "pl1",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Chill Hits",
    tracks: { href: "https://api.example.com/playlists/pl1/tracks", total: 50 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl1",
  },
  {
    id: "pl2",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Rock Classics",
    tracks: { href: "https://api.example.com/playlists/pl2/tracks", total: 30 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl2",
  },
  {
    id: "pl3",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Pop Party",
    tracks: { href: "https://api.example.com/playlists/pl3/tracks", total: 40 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl3",
  },
  {
    id: "pl4",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Jazz Vibes",
    tracks: { href: "https://api.example.com/playlists/pl4/tracks", total: 25 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl4",
  },
  {
    id: "pl5",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
  {
    id: "pl6",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
  {
    id: "pl7",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
];

const mockAlbums: AlbumItem[] = [
  {
    id: "al1",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Summer Tunes",
    total_tracks: 12,
    type: "album",
    href: "https://api.example.com/albums/al1",
  },
  {
    id: "al2",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Winter Ballads",
    total_tracks: 10,
    type: "album",
    href: "https://api.example.com/albums/al2",
  },
  {
    id: "al3",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "City Lights",
    total_tracks: 15,
    type: "album",
    href: "https://api.example.com/albums/al3",
  },
  {
    id: "al4",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Road Trip",
    total_tracks: 8,
    type: "album",
    href: "https://api.example.com/albums/al4",
  },
  {
    id: "al5",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Night Drive",
    total_tracks: 14,
    type: "album",
    href: "https://api.example.com/albums/al5",
  },
];

const mockArtists: ArtistItem[] = [
  {
    id: "ar1",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "John Doe",
    type: "artist",
    href: "https://api.example.com/artists/ar1",
  },
  {
    id: "ar2",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Jane Smith",
    type: "artist",
    href: "https://api.example.com/artists/ar2",
  },
  {
    id: "ar3",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "The Band",
    type: "artist",
    href: "https://api.example.com/artists/ar3",
  },
  {
    id: "ar4",
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    name: "Emma Wilson",
    type: "artist",
    href: "https://api.example.com/artists/ar4",
  },
];

const mockTracks: TrackItem[] = [
  {
    id: "track1",
    name: "Sunset Dreams",
    album: {
      id: "al1",
      images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
      name: "Summer Tunes",
      total_tracks: 12,
      type: "album",
      href: "https://api.example.com/albums/al1",
    },
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    artists: [
      {
        id: "ar1",
        images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
        name: "John Doe",
        type: "artist",
        href: "https://api.example.com/artists/ar1",
      },
    ],
    duration_ms: 180000, // 3 phút
    explicit: false,
    href: "https://api.example.com/tracks/track1",
    track_number: 1,
    type: "track",
  },
  {
    id: "track2",
    name: "Moonlight Vibes",
    album: {
      id: "al2",
      images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
      name: "Winter Ballads",
      total_tracks: 10,
      type: "album",
      href: "https://api.example.com/albums/al2",
    },
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    artists: [
      {
        id: "ar2",
        images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
        name: "Jane Smith",
        type: "artist",
        href: "https://api.example.com/artists/ar2",
      },
    ],
    duration_ms: 210000, // 3 phút 30 giây
    explicit: true,
    href: "https://api.example.com/tracks/track2",
    track_number: 2,
    type: "track",
  },
  {
    id: "track3",
    name: "City Lights",
    album: {
      id: "al3",
      images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
      name: "City Lights",
      total_tracks: 15,
      type: "album",
      href: "https://api.example.com/albums/al3",
    },
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    artists: [
      {
        id: "ar3",
        images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
        name: "The Band",
        type: "artist",
        href: "https://api.example.com/artists/ar3",
      },
    ],
    duration_ms: 165000, // 2 phút 45 giây
    explicit: false,
    href: "https://api.example.com/tracks/track3",
    track_number: 3,
    type: "track",
  },
  {
    id: "track4",
    name: "Road Trip Anthem",
    album: {
      id: "al4",
      images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
      name: "Road Trip",
      total_tracks: 8,
      type: "album",
      href: "https://api.example.com/albums/al4",
    },
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    artists: [
      {
        id: "ar4",
        images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
        name: "Emma Wilson",
        type: "artist",
        href: "https://api.example.com/artists/ar4",
      },
    ],
    duration_ms: 195000, // 3 phút 15 giây
    explicit: false,
    href: "https://api.example.com/tracks/track4",
    track_number: 1,
    type: "track",
  },
  {
    id: "track5",
    name: "Night Drive",
    album: {
      id: "al5",
      images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
      name: "Night Drive",
      total_tracks: 14,
      type: "album",
      href: "https://api.example.com/albums/al5",
    },
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    artists: [
      {
        id: "ar5",
        images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
        name: "Cool Vibes",
        type: "artist",
        href: "https://api.example.com/artists/ar5",
      },
    ],
    duration_ms: 240000, // 4 phút
    explicit: true,
    href: "https://api.example.com/tracks/track5",
    track_number: 5,
    type: "track",
  },
  {
    id: "track6",
    name: "Night Drive",
    album: {
      id: "al5",
      images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
      name: "Night Drive",
      total_tracks: 14,
      type: "album",
      href: "https://api.example.com/albums/al5",
    },
    images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
    artists: [
      {
        id: "ar5",
        images: [{ url: "https://picsum.photos/200", height: 200, width: 200 }],
        name: "Cool Vibes",
        type: "artist",
        href: "https://api.example.com/artists/ar5",
      },
    ],
    duration_ms: 240000, // 4 phút
    explicit: true,
    href: "https://api.example.com/tracks/track5",
    track_number: 5,
    type: "track",
  },
];

const mockData = [
  {
    id: 1,
    title: "Playlist made for you",
    data: mockPlaylists,
  },
  {
    id: 2,
    title: "You may have interest",
    data: mockTracks,
  },
  {
    id: 3,
    title: "Latest albums",
    data: mockAlbums,
  },
  {
    id: 4,
    title: "Popular artists",
    data: mockArtists,
  },
  {
    id: 5,
    title: "Your playlists",
    data: mockPlaylists,
  },
  {
    id: 6,
    title: "Your saved albums",
    data: mockAlbums,
  },
  {
    id: 7,
    title: "Your saved artists",
    data: mockArtists,
  },
];

export { mockData, mockPlaylists, mockAlbums, mockArtists, mockTracks };
