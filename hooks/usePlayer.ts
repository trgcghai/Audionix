import { Album, EmbbedTrack, Playlist, Track } from "@/app/types/model";
import { useAppDispatch } from "@/hooks/redux";
import {
  addTracksToQueue,
  PlayingTrack,
  setCurrentTrack,
  setIsPlaying,
} from "@/store/slices/queueDrawerSlice";

const convertToPlayingTrack = (track: Track | EmbbedTrack): PlayingTrack => ({
  _id: track._id,
  title: track.title,
  duration_ms: track.duration_ms,
  cover_images: track.cover_images || [],
  artist: {
    _id: track.artist._id,
    name: track.artist.name,
  },
  albums: track.albums
    ? track.albums.map((album) => ({
        _id: album._id,
        title: album.title,
      }))
    : [],
  genres: track.genres || [],
  file: track.file,
});

export const usePlayer = () => {
  const dispatch = useAppDispatch();

  // Play a single track
  const playTrack = (track: Track) => {
    const playingTrack = convertToPlayingTrack(track);
    dispatch(
      addTracksToQueue({
        tracks: [playingTrack],
        clearQueue: true,
      }),
    );
    dispatch(setIsPlaying(true));
  };

  // Play a specific track within a collection
  const playTrackFromCollection = (tracks: Track[], trackId: string) => {
    const playingTracks = tracks.map(convertToPlayingTrack);
    dispatch(
      addTracksToQueue({
        tracks: playingTracks,
        clearQueue: true,
      }),
    );

    // Find and set the current track
    const trackToPlay = playingTracks.find((t) => t._id === trackId);
    if (trackToPlay) {
      dispatch(setCurrentTrack(trackToPlay));
    }

    dispatch(setIsPlaying(true));
  };

  // Play an album
  const playAlbum = (album: Album) => {
    if (!album.tracks || album.tracks.length === 0) return;

    const playingTracks = album.tracks.map(convertToPlayingTrack);
    dispatch(
      addTracksToQueue({
        tracks: playingTracks,
        clearQueue: true,
      }),
    );
  };

  // Play a playlist
  const playPlaylist = (playlist: Playlist) => {
    if (!playlist.tracks || playlist.tracks.length === 0) return;

    const playingTracks = playlist.tracks.map(convertToPlayingTrack);
    dispatch(
      addTracksToQueue({
        tracks: playingTracks,
        clearQueue: true,
      }),
    );

    dispatch(setIsPlaying(true));
  };

  // Add track(s) to queue
  const addToQueue = (tracks: Track[]) => {
    const playingTracks = tracks.map(convertToPlayingTrack);
    dispatch(
      addTracksToQueue({
        tracks: playingTracks,
        clearQueue: false,
      }),
    );

    dispatch(setIsPlaying(true));
  };

  return {
    playTrack,
    playTrackFromCollection,
    playAlbum,
    playPlaylist,
    addToQueue,
  };
};
