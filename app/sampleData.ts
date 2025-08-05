import {
  AlbumItem,
  ArtistAlbumItem,
  ArtistItem,
  ArtistTrackItem,
  PlaylistItem,
  TrackItem,
} from "./types/component";

const mockPlaylists: PlaylistItem[] = [
  {
    _id: "pl1",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Chill Hits",
    tracks: { href: "https://api.example.com/playlists/pl1/tracks", total: 0 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl1",
  },
  {
    _id: "pl2",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Rock Classics",
    tracks: { href: "https://api.example.com/playlists/pl2/tracks", total: 30 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl2",
  },
  {
    _id: "pl3",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Pop Party",
    tracks: { href: "https://api.example.com/playlists/pl3/tracks", total: 40 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl3",
  },
  {
    _id: "pl4",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Jazz Vibes",
    tracks: { href: "https://api.example.com/playlists/pl4/tracks", total: 25 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl4",
  },
  {
    _id: "pl5",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
  {
    _id: "pl6",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
  {
    _id: "pl7",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Indie Mix",
    tracks: { href: "https://api.example.com/playlists/pl5/tracks", total: 35 },
    type: "playlist",
    href: "https://api.example.com/playlists/pl5",
  },
];

const mockAlbums: AlbumItem[] = [
  {
    _id: "al1",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Summer Tunes",
    total_tracks: 12,
    type: "album",
    href: "https://api.example.com/albums/al1",
  },
  {
    _id: "al2",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Winter Ballads",
    total_tracks: 10,
    type: "album",
    href: "https://api.example.com/albums/al2",
  },
  {
    _id: "al3",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "City Lights",
    total_tracks: 15,
    type: "album",
    href: "https://api.example.com/albums/al3",
  },
  {
    _id: "al4",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Road Trip",
    total_tracks: 8,
    type: "album",
    href: "https://api.example.com/albums/al4",
  },
  {
    _id: "al5",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Night Drive",
    total_tracks: 14,
    type: "album",
    href: "https://api.example.com/albums/al5",
  },
];

const mockArtists: ArtistItem[] = [
  {
    _id: "ar1",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "John Doe",
    type: "artist",
    href: "https://api.example.com/artists/ar1",
  },
  {
    _id: "ar2",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Jane Smith",
    type: "artist",
    href: "https://api.example.com/artists/ar2",
  },
  {
    _id: "ar3",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "The Band",
    type: "artist",
    href: "https://api.example.com/artists/ar3",
  },
  {
    _id: "ar4",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    name: "Emma Wilson",
    type: "artist",
    href: "https://api.example.com/artists/ar4",
  },
];

const mockTracks: TrackItem[] = [
  {
    _id: "track1",
    name: "Sunset Dreams",
    album: {
      _id: "al1",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Summer Tunes",
      total_tracks: 12,
      type: "album",
      href: "https://api.example.com/albums/al1",
    },
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    artists: [
      {
        _id: "ar1",
        cover_images: [
          { url: "https://picsum.photos/200", height: 200, width: 200 },
        ],
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
    _id: "track2",
    name: "Moonlight Vibes",
    album: {
      _id: "al2",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Winter Ballads",
      total_tracks: 10,
      type: "album",
      href: "https://api.example.com/albums/al2",
    },
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    artists: [
      {
        _id: "ar2",
        cover_images: [
          { url: "https://picsum.photos/200", height: 200, width: 200 },
        ],
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
    _id: "track3",
    name: "City Lights",
    album: {
      _id: "al3",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "City Lights",
      total_tracks: 15,
      type: "album",
      href: "https://api.example.com/albums/al3",
    },
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    artists: [
      {
        _id: "ar3",
        cover_images: [
          { url: "https://picsum.photos/200", height: 200, width: 200 },
        ],
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
    _id: "track4",
    name: "Road Trip Anthem",
    album: {
      _id: "al4",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Road Trip",
      total_tracks: 8,
      type: "album",
      href: "https://api.example.com/albums/al4",
    },
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    artists: [
      {
        _id: "ar4",
        cover_images: [
          { url: "https://picsum.photos/200", height: 200, width: 200 },
        ],
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
    _id: "track5",
    name: "Night Drive",
    album: {
      _id: "al5",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Night Drive",
      total_tracks: 14,
      type: "album",
      href: "https://api.example.com/albums/al5",
    },
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    artists: [
      {
        _id: "ar5",
        cover_images: [
          { url: "https://picsum.photos/200", height: 200, width: 200 },
        ],
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
    _id: "track6",
    name: "Night Drive",
    album: {
      _id: "al5",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Night Drive",
      total_tracks: 14,
      type: "album",
      href: "https://api.example.com/albums/al5",
    },
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    artists: [
      {
        _id: "ar5",
        cover_images: [
          { url: "https://picsum.photos/200", height: 200, width: 200 },
        ],
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
    _id: 1,
    title: "Playlist made for you",
    data: mockPlaylists,
  },
  {
    _id: 2,
    title: "You may have interest",
    data: mockTracks,
  },
  {
    _id: 3,
    title: "Latest albums",
    data: mockAlbums,
  },
  {
    _id: 4,
    title: "Popular artists",
    data: mockArtists,
  },
  {
    _id: 5,
    title: "Your playlists",
    data: mockPlaylists,
  },
  {
    _id: 6,
    title: "Your saved albums",
    data: mockAlbums,
  },
  {
    _id: 7,
    title: "Your saved artists",
    data: mockArtists,
  },
];

const mockArtistTracks: ArtistTrackItem[] = [
  {
    _id: "at_01",
    name: "Midnight Dreams",
    type: "track",
    href: "/tracks/at_01",
    duration_ms: 237000, // 3:57
    explicit: false,
    track_number: 1,
    uploadTime: "2025-05-10T14:23:45Z",
    status: "active",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    album: {
      _id: "al1",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Summer Tunes",
      total_tracks: 12,
      type: "album",
      href: "https://api.example.com/albums/al1",
    },
  },
  {
    _id: "at_02",
    name: "Ocean Waves",
    type: "track",
    href: "/tracks/at_02",
    duration_ms: 184000, // 3:04
    explicit: false,
    track_number: 3,
    uploadTime: "2025-06-02T09:12:30Z",
    status: "inactive",
    cover_images: [
      { url: "https://picsum.photos/200s", height: 200, width: 200 },
    ],
    album: {
      _id: "al2",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Winter Ballads",
      total_tracks: 10,
      type: "album",
      href: "https://api.example.com/albums/al2",
    },
  },
  {
    _id: "at_03",
    name: "Electric Soul",
    type: "track",
    href: "/tracks/at_03",
    duration_ms: 305000, // 5:05
    explicit: true,
    track_number: 2,
    uploadTime: "2025-05-28T16:45:12Z",
    status: "active",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    album: {
      _id: "al3",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "City Lights",
      total_tracks: 15,
      type: "album",
      href: "https://api.example.com/albums/al3",
    },
  },
  {
    _id: "at_04",
    name: "Lost Highway",
    type: "track",
    href: "/tracks/at_04",
    duration_ms: 219000, // 3:39
    explicit: false,
    track_number: 5,
    uploadTime: "2025-06-05T10:30:00Z",
    status: "active",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    album: {
      _id: "al4",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Road Trip",
      total_tracks: 8,
      type: "album",
      href: "https://api.example.com/albums/al4",
    },
  },
  {
    _id: "at_05",
    name: "Neon Lights",
    type: "track",
    href: "/tracks/at_05",
    duration_ms: 268000, // 4:28
    explicit: true,
    track_number: 1,
    uploadTime: "2025-06-01T20:15:45Z",
    status: "inactive",
    cover_images: [
      { url: "https://picsum.photos/200", height: 200, width: 200 },
    ],
    album: {
      _id: "al4",
      cover_images: [
        { url: "https://picsum.photos/200", height: 200, width: 200 },
      ],
      name: "Road Trip",
      total_tracks: 8,
      type: "album",
      href: "https://api.example.com/albums/al4",
    },
  },
];

const mockArtistAlbums: ArtistAlbumItem[] = [
  {
    _id: "alb_001",
    name: "Midnight Memories",
    total_tracks: 3,
    href: "/album/midnight-memories",
    cover_images: [
      {
        url: "https://picsum.photos/200",
        height: 200,
        width: 200,
      },
    ],
    tracks: [
      {
        cover_images: mockTracks[0].cover_images,
        duration_ms: mockTracks[0].duration_ms,
        _id: mockTracks[0]._id,
        name: mockTracks[0].name,
        track_number: mockTracks[0].track_number,
      },
      {
        cover_images: mockTracks[1].cover_images,
        duration_ms: mockTracks[1].duration_ms,
        _id: mockTracks[1]._id,
        name: mockTracks[1].name,
        track_number: mockTracks[1].track_number,
      },
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
    ],
    type: "album",
    uploadTime: "2023-06-15T08:30:00.000Z",
    status: "published",
  },
  {
    _id: "alb_002",
    name: "Acoustic Sessions",
    total_tracks: 4,
    href: "/album/acoustic-sessions",
    cover_images: [
      {
        url: "https://picsum.photos/200",
        height: 200,
        width: 200,
      },
    ],
    tracks: [
      {
        cover_images: mockTracks[1].cover_images,
        duration_ms: mockTracks[1].duration_ms,
        _id: mockTracks[1]._id,
        name: mockTracks[1].name,
        track_number: mockTracks[1].track_number,
      },
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
      {
        cover_images: mockTracks[3].cover_images,
        duration_ms: mockTracks[3].duration_ms,
        _id: mockTracks[3]._id,
        name: mockTracks[3].name,
        track_number: mockTracks[3].track_number,
      },
      {
        cover_images: mockTracks[4].cover_images,
        duration_ms: mockTracks[4].duration_ms,
        _id: mockTracks[4]._id,
        name: mockTracks[4].name,
        track_number: mockTracks[4].track_number,
      },
    ],
    type: "album",
    uploadTime: "2023-09-20T14:45:00.000Z",
    status: "published",
  },
  {
    _id: "alb_003",
    name: "Electronic Dreams",
    total_tracks: 5,
    href: "/album/electronic-dreams",
    cover_images: [
      {
        url: "https://picsum.photos/200",
        height: 200,
        width: 200,
      },
    ],
    tracks: [
      {
        cover_images: mockTracks[0].cover_images,
        duration_ms: mockTracks[0].duration_ms,
        _id: mockTracks[0]._id,
        name: mockTracks[0].name,
        track_number: mockTracks[0].track_number,
      },
      {
        cover_images: mockTracks[1].cover_images,
        duration_ms: mockTracks[1].duration_ms,
        _id: mockTracks[1]._id,
        name: mockTracks[1].name,
        track_number: mockTracks[1].track_number,
      },
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
      {
        cover_images: mockTracks[3].cover_images,
        duration_ms: mockTracks[3].duration_ms,
        _id: mockTracks[3]._id,
        name: mockTracks[3].name,
        track_number: mockTracks[3].track_number,
      },
      {
        cover_images: mockTracks[4].cover_images,
        duration_ms: mockTracks[4].duration_ms,
        _id: mockTracks[4]._id,
        name: mockTracks[4].name,
        track_number: mockTracks[4].track_number,
      },
      {
        cover_images: mockTracks[0].cover_images,
        duration_ms: mockTracks[0].duration_ms,
        _id: mockTracks[0]._id,
        name: mockTracks[0].name,
        track_number: mockTracks[0].track_number,
      },
      {
        cover_images: mockTracks[1].cover_images,
        duration_ms: mockTracks[1].duration_ms,
        _id: mockTracks[1]._id,
        name: mockTracks[1].name,
        track_number: mockTracks[1].track_number,
      },
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
      {
        cover_images: mockTracks[3].cover_images,
        duration_ms: mockTracks[3].duration_ms,
        _id: mockTracks[3]._id,
        name: mockTracks[3].name,
        track_number: mockTracks[3].track_number,
      },
      {
        cover_images: mockTracks[4].cover_images,
        duration_ms: mockTracks[4].duration_ms,
        _id: mockTracks[4]._id,
        name: mockTracks[4].name,
        track_number: mockTracks[4].track_number,
      },
      {
        cover_images: mockTracks[0].cover_images,
        duration_ms: mockTracks[0].duration_ms,
        _id: mockTracks[0]._id,
        name: mockTracks[0].name,
        track_number: mockTracks[0].track_number,
      },
      {
        cover_images: mockTracks[1].cover_images,
        duration_ms: mockTracks[1].duration_ms,
        _id: mockTracks[1]._id,
        name: mockTracks[1].name,
        track_number: mockTracks[1].track_number,
      },
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
      {
        cover_images: mockTracks[3].cover_images,
        duration_ms: mockTracks[3].duration_ms,
        _id: mockTracks[3]._id,
        name: mockTracks[3].name,
        track_number: mockTracks[3].track_number,
      },
      {
        cover_images: mockTracks[4].cover_images,
        duration_ms: mockTracks[4].duration_ms,
        _id: mockTracks[4]._id,
        name: mockTracks[4].name,
        track_number: mockTracks[4].track_number,
      },
    ],
    type: "album",
    uploadTime: "2024-01-08T10:15:00.000Z",
    status: "hidden",
  },
  {
    _id: "alb_004",
    name: "Summer Vibes",
    total_tracks: 3,
    href: "/album/summer-vibes",
    cover_images: [
      {
        url: "https://picsum.photos/200",
        height: 200,
        width: 200,
      },
    ],
    tracks: [
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
      {
        cover_images: mockTracks[3].cover_images,
        duration_ms: mockTracks[3].duration_ms,
        _id: mockTracks[3]._id,
        name: mockTracks[3].name,
        track_number: mockTracks[3].track_number,
      },
      {
        cover_images: mockTracks[4].cover_images,
        duration_ms: mockTracks[4].duration_ms,
        _id: mockTracks[4]._id,
        name: mockTracks[4].name,
        track_number: mockTracks[4].track_number,
      },
    ],
    type: "EP",
    uploadTime: "2024-03-22T16:20:00.000Z",
    status: "published",
  },
  {
    _id: "alb_005",
    name: "Unreleased Collection",
    total_tracks: 4,
    href: "/album/unreleased-collection",
    cover_images: [
      {
        url: "https://picsum.photos/200",
        height: 200,
        width: 200,
      },
    ],
    tracks: [
      {
        cover_images: mockTracks[5].cover_images,
        duration_ms: mockTracks[5].duration_ms,
        _id: mockTracks[5]._id,
        name: mockTracks[5].name,
        track_number: mockTracks[5].track_number,
      },
      {
        cover_images: mockTracks[0].cover_images,
        duration_ms: mockTracks[0].duration_ms,
        _id: mockTracks[0]._id,
        name: mockTracks[0].name,
        track_number: mockTracks[0].track_number,
      },
      {
        cover_images: mockTracks[1].cover_images,
        duration_ms: mockTracks[1].duration_ms,
        _id: mockTracks[1]._id,
        name: mockTracks[1].name,
        track_number: mockTracks[1].track_number,
      },
      {
        cover_images: mockTracks[2].cover_images,
        duration_ms: mockTracks[2].duration_ms,
        _id: mockTracks[2]._id,
        name: mockTracks[2].name,
        track_number: mockTracks[2].track_number,
      },
    ],
    type: "compilation",
    uploadTime: "2024-05-10T09:00:00.000Z",
    status: "hidden",
  },
];

export {
  mockData,
  mockPlaylists,
  mockAlbums,
  mockArtists,
  mockTracks,
  mockArtistTracks,
  mockArtistAlbums,
};
