import { Album, EmbbedTrack, Playlist, Track } from "@/app/types/model";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addTracksToQueue,
  cycleLoopMode,
  PlayingTrack,
  playNext,
  playPrevious,
  setCurrentTrack,
  setIsPlaying,
  setMuted,
  setVolume,
  toggleShuffle,
} from "@/store/slices/queueDrawerSlice";
import { useEffect, useRef, useState } from "react";

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

export const useAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, loopMode, volume, muted, shuffle } =
    useAppSelector((state) => state.queueDrawer);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle audio events
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // Set initial volume with safety checks
    const safeVolume =
      typeof volume === "number" && isFinite(volume) ? volume : 100;
    audioElement.volume = muted
      ? 0
      : Math.min(Math.max(safeVolume / 100, 0), 1);

    // Event handlers
    const handlePlay = () => dispatch(setIsPlaying(true));
    const handlePause = () => dispatch(setIsPlaying(false));
    const handleEnded = () => {
      if (loopMode === "one") {
        audioElement.currentTime = 0;
        audioElement.play().catch(console.error);
      } else {
        dispatch(playNext());
      }
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime * 1000);
    };
    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration * 1000);
    };

    // Add event listeners
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      // Clean up
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [dispatch, loopMode, muted, volume]);

  // Handle track changes
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !currentTrack?.file?.url) return;

    // Audio will load but not play automatically when src changes
    if (isPlaying) {
      audioElement.play().catch((err) => {
        console.error("Failed to play:", err);
        dispatch(setIsPlaying(false));
      });
    }
  }, [currentTrack, isPlaying, dispatch]);

  // Handle play/pause state changes
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !currentTrack) return;

    if (isPlaying && audioElement.paused) {
      audioElement.play().catch((err) => {
        console.error("Failed to play:", err);
        dispatch(setIsPlaying(false));
      });
    } else if (!isPlaying && !audioElement.paused) {
      audioElement.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    const safeVolume =
      typeof volume === "number" && isFinite(volume) ? volume : 100;
    audioRef.current.volume = muted
      ? 0
      : Math.min(Math.max(safeVolume / 100, 0), 1);
  }, [volume, muted]);

  // Player controls
  const togglePlay = () => {
    if (!currentTrack) return;
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const seekTime = value[0];
    audioRef.current.currentTime = seekTime / 1000;
    setCurrentTime(seekTime);
  };

  const handleNextTrack = () => {
    dispatch(playNext());
  };

  const handlePreviousTrack = () => {
    // If we're more than 3 seconds into the track, restart it
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      dispatch(playPrevious());
    }
  };

  const handleToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleCycleLoopMode = () => {
    dispatch(cycleLoopMode());
  };

  const handleToggleMute = () => {
    dispatch(setMuted(!muted));
  };

  const handleVolumeChange = (value: number[]) => {
    dispatch(setVolume(value[0]));

    // If volume is adjusted while muted, unmute
    if (muted && value[0] > 0) {
      dispatch(setMuted(false));
    }
  };

  return {
    // State
    audioRef,
    currentTime,
    duration,
    isPlaying,
    loopMode,
    shuffle,
    volume,
    muted,
    currentTrack,

    // Controls
    togglePlay,
    handleSeek,
    handleNextTrack,
    handlePreviousTrack,
    handleToggleShuffle,
    handleCycleLoopMode,
    handleToggleMute,
    handleVolumeChange,
  };
};
