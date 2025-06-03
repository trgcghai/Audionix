interface User {
  user_id: string;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  profile_picture?: string;
  bio?: string;
  followed_artists: string[];
  followed_albums: string[];
  favorite_songs: string[];
  created_at: Date;
  updated_at: Date;
}

interface Song {
  song_id: string;
  title: string;
  artist_id: string[];
  cover_url?: string;
  album_id?: string;
  genre: string;
  duration: number;
  audio_url: string;
  release_date: Date;
  play_count: number;
  created_at: Date;
}

interface Album {
  album_id: string;
  title: string;
  artist_id: string[];
  release_date: Date;
  cover_url: string;
  songs: string[];
  genre: string;
  created_at: Date;
}

interface Artist {
  artist_id: string;
  name: string;
  bio?: string;
  profile_picture?: string;
  genres: string[];
  created_at: Date;
}

interface Playlist {
  playlist_id: string;
  user_id: string;
  title: string;
  description?: string;
  cover_url?: string;
  songs: string[];
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}
