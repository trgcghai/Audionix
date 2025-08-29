import { Volume } from "@/app/enums";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlayingTrack = {
  _id: string;
  title: string;
  duration_ms: number;
  cover_images: {
    url: string;
    width: number;
    height: number;
    key: string;
  }[];
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
};

type LoopMode = "off" | "all" | "one";

interface QueueDrawerState {
  isOpen: boolean;
  queue: PlayingTrack[];
  originalQueue: PlayingTrack[];
  currentTrack: PlayingTrack | null;
  loopMode: LoopMode;
  shuffle: boolean;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
}

const initialState: QueueDrawerState = {
  isOpen: false,
  queue: [],
  originalQueue: [],
  currentTrack: null,
  loopMode: "off",
  shuffle: false,
  isPlaying: false,
  volume: Volume.DEFAULT,
  muted: false,
};

export const queueDrawerSlice = createSlice({
  name: "queueDrawer",
  initialState,
  reducers: {
    // Drawer actions
    openQueueDrawer: (state) => {
      state.isOpen = true;
    },
    closeQueueDrawer: (state) => {
      state.isOpen = false;
    },
    toggleQueueDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },

    // Queue
    addTracksToQueue: (
      state,
      action: PayloadAction<{ tracks: PlayingTrack[]; clearQueue?: boolean }>,
    ) => {
      const validTracks = action.payload.tracks.filter(
        (track) => track._id && track.file?.url, // Basic validation
      );
      if (validTracks.length === 0) return;

      let newTracks: PlayingTrack[] = [];
      if (state.queue && state.queue.length > 0) {
        newTracks = action.payload.tracks.filter(
          (track) => !state.queue.some((t) => t._id === track._id), // Avoid duplicates
        );
      } else {
        newTracks = action.payload.tracks;
      }
      if (action.payload.clearQueue) {
        state.queue = newTracks;
        state.currentTrack = newTracks[0];
      } else {
        state.queue.push(...newTracks);
        if (!state.currentTrack) {
          state.currentTrack = newTracks[0];
        }
      }
    },

    removeTrackFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((t) => t._id !== action.payload);
      if (state.currentTrack?._id === action.payload) {
        state.currentTrack = state.queue[0] || null;
      }
    },

    clearQueue: (state) => {
      state.queue = [];
      state.currentTrack = null;
    },

    setCurrentTrack: (state, action: PayloadAction<PlayingTrack>) => {
      state.currentTrack = action.payload;
    },

    // Shuffle
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
      if (state.shuffle) {
        // Save original queue if not already saved
        if (state.originalQueue.length === 0) {
          state.originalQueue = [...state.queue];
        }
        // Create shuffled queue
        const shuffled = [...state.queue].sort(() => Math.random() - 0.5);
        state.queue = shuffled;
        if (state.currentTrack) {
          // Ensure current track is in the shuffled queue
          state.queue = [
            state.currentTrack,
            ...shuffled.filter((t) => t._id !== state.currentTrack?._id),
          ];
        }
      } else {
        // Restore original queue
        state.queue = [...state.originalQueue];
        state.originalQueue = []; // Reset original queue
      }
    },

    // Loop
    cycleLoopMode: (state) => {
      if (state.loopMode === "off") state.loopMode = "all";
      else if (state.loopMode === "all") state.loopMode = "one";
      else state.loopMode = "off";
    },

    // Play control
    playNext: (state) => {
      if (!state.currentTrack) return;

      const index = state.queue.findIndex(
        (t) => t._id === state.currentTrack?._id,
      );

      if (state.loopMode === "one") {
        return;
      }

      if (state.shuffle) {
        const remaining = state.queue.filter(
          (t) => t._id !== state.currentTrack?._id,
        );
        if (remaining.length > 0) {
          const random =
            remaining[Math.floor(Math.random() * remaining.length)];
          state.currentTrack = random;
        } else if (state.loopMode === "all") {
          state.queue = [...state.originalQueue].sort(
            () => Math.random() - 0.5,
          );
          state.currentTrack = state.queue[0] || null;
        } else {
          state.currentTrack = null;
        }
        return;
      }

      if (index >= 0 && index < state.queue.length - 1) {
        state.currentTrack = state.queue[index + 1];
      } else if (state.loopMode === "all") {
        state.currentTrack = state.queue[0] || null;
      } else {
        state.currentTrack = null;
      }
    },

    playPrevious: (state) => {
      if (!state.currentTrack) return;

      const index = state.queue.findIndex(
        (t) => t._id === state.currentTrack?._id,
      );
      if (index > 0) {
        state.currentTrack = state.queue[index - 1];
      } else if (state.loopMode === "all") {
        state.currentTrack = state.queue[state.queue.length - 1]; // quay về bài cuối
      }
    },

    // player actions
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },

    setMuted: (state, action: PayloadAction<boolean>) => {
      state.muted = action.payload;
    },
  },
});

export const {
  openQueueDrawer,
  closeQueueDrawer,
  toggleQueueDrawer,
  addTracksToQueue,
  clearQueue,
  cycleLoopMode,
  playNext,
  playPrevious,
  removeTrackFromQueue,
  setCurrentTrack,
  toggleShuffle,
  setIsPlaying,
  setVolume,
  setMuted,
} = queueDrawerSlice.actions;

export const useQueueDrawer = () =>
  useAppSelector((state) => state.queueDrawer);

export default queueDrawerSlice.reducer;
