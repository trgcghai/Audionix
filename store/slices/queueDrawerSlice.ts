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
  currentTrackIndex: number;
  loopMode: LoopMode;
  shuffle: boolean;
  isPlaying: boolean;
}

const initialState: QueueDrawerState = {
  isOpen: false,
  queue: [],
  currentTrackIndex: 0,
  loopMode: "off",
  shuffle: false,
  isPlaying: false,
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
      action: PayloadAction<PlayingTrack | PlayingTrack[]>,
    ) => {
      if (Array.isArray(action.payload)) {
        state.queue.push(...action.payload);
      } else {
        state.queue.push(action.payload);
      }
    },

    removeTrackFromQueue: (state, action: PayloadAction<string>) => {
      if (state.queue.length === 0) return;

      state.queue = state.queue.filter((t) => t._id !== action.payload);
    },

    clearQueue: (state) => {
      state.queue = [];
      state.currentTrackIndex = -1;
    },

    setCurrentTrack: (state, action: PayloadAction<PlayingTrack>) => {
      state.currentTrackIndex = state.queue.findIndex(
        (track) => track._id === action.payload._id,
      );
    },

    setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
    },

    // Shuffle
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },

    // Loop
    cycleLoopMode: (state) => {
      if (state.loopMode === "off") state.loopMode = "all";
      else if (state.loopMode === "all") state.loopMode = "one";
      else state.loopMode = "off";
    },

    // Play control
    playNext: (state) => {
      if (state.queue.length === 0) return;

      if (state.loopMode === "one") return;

      if (state.loopMode === "off") {
        if (state.currentTrackIndex == state.queue.length - 1) {
          state.currentTrackIndex = -1;
          state.isPlaying = false;
        } else {
          state.currentTrackIndex++;
        }

        return;
      }

      if (state.loopMode === "all") {
        if (state.shuffle) {
          let randInt = -1;
          do {
            randInt = Math.floor(Math.random() * state.queue.length);
          } while (randInt === state.currentTrackIndex);
          state.currentTrackIndex = randInt;
        } else {
          if (state.queue.length === 1) return;

          if (state.currentTrackIndex == state.queue.length - 1) {
            state.currentTrackIndex = 0;
          } else {
            state.currentTrackIndex++;
          }
        }
      }
    },

    playPrevious: (state) => {
      if (state.queue.length === 0) return;

      if (state.loopMode === "one") return;

      if (state.loopMode === "off") {
        if (state.currentTrackIndex == 0) return;

        state.currentTrackIndex--;
        return;
      }

      if (state.loopMode === "all") {
        if (state.shuffle) {
          let randInt = -1;
          do {
            randInt = Math.floor(Math.random() * state.queue.length);
          } while (randInt === state.currentTrackIndex);
          state.currentTrackIndex = randInt;
        } else {
          if (state.queue.length === 1) return;

          if (state.currentTrackIndex == 0) {
            state.currentTrackIndex = state.queue.length - 1;
          } else {
            state.currentTrackIndex--;
          }
        }
      }
    },

    // player actions
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
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
  setCurrentTrackIndex,
  toggleShuffle,
  setIsPlaying,
} = queueDrawerSlice.actions;

export const useQueueDrawer = () =>
  useAppSelector((state) => state.queueDrawer);

export default queueDrawerSlice.reducer;
