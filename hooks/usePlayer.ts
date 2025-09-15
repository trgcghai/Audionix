import { Album, EmbbedTrack, Track } from "@/app/types/model";
import { useAppDispatch } from "@/hooks/redux";
import {
  addTracksToQueue,
  clearQueue,
  PlayingTrack,
  setCurrentTrackIndex,
  setIsPlaying,
  useQueueDrawer,
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

const convertToPlayingTracksFromAlbum = (
  track: Album["tracks"][number],
): PlayingTrack => ({
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
  const { currentTrackIndex, loopMode, queue, shuffle } = useQueueDrawer();

  const currentTrack = queue[currentTrackIndex];
  const hasNext =
    shuffle ||
    loopMode === "all" ||
    currentTrackIndex < (queue ? queue.length : 0) - 1;
  const hasPrevious = shuffle || loopMode === "all" || currentTrackIndex > 0;
  const hasOneItem = (queue ? queue.length : 0) === 1;

  // Play a single track
  const playTrack = (track: Track) => {
    const playingTrack = convertToPlayingTrack(track);
    dispatch(clearQueue());
    dispatch(addTracksToQueue(playingTrack));
    dispatch(setCurrentTrackIndex(0));
    dispatch(setIsPlaying(true));
  };

  // Play an album or playlist
  const playTracks = (tracks: (Track | EmbbedTrack)[]) => {
    if (!tracks || tracks.length === 0) return;

    const playingTracks = tracks.map(convertToPlayingTrack);
    dispatch(clearQueue());
    dispatch(addTracksToQueue(playingTracks));
    dispatch(setCurrentTrackIndex(0));
    dispatch(setIsPlaying(true));
  };

  const playTracksFromAlbum = (tracks: Album["tracks"]) => {
    if (!tracks || tracks.length === 0) return;

    const playingTracks = tracks.map(convertToPlayingTracksFromAlbum);
    dispatch(clearQueue());
    dispatch(addTracksToQueue(playingTracks));
    dispatch(setCurrentTrackIndex(0));
    dispatch(setIsPlaying(true));
  };

  return {
    // actions to add track(s) to queue
    playTrack,
    playTracks,
    playTracksFromAlbum,

    // variables for uses
    currentTrack,
    hasNext,
    hasPrevious,
    hasOneItem,
  };
};
