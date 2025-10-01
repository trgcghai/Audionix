import { api } from "@/services/api";
import albumManagementReducer from "@/store/slices/albumManagement";
import detailAlbumReducer from "@/store/slices/detailAlbumSlice";
import detailPlaylistReducer from "@/store/slices/detailPlaylistSlice";
import detailTrackReducer from "@/store/slices/detailTrackSlice";
import playlistManagementReducer from "@/store/slices/playlistManagement";
import queueDrawerReducer from "@/store/slices/queueDrawerSlice";
import trackManagementReducer from "@/store/slices/trackManagement";
import userManagementReducer from "@/store/slices/userManagement";
import userReducer from "@/store/slices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "queueDrawer",
    "detailAlbum",
    "detailTrack",
    "detailPlaylist",
    "user",
    "trackManagement",
    "albumManagement",
    "userManagement",
    "playlistManagement",
  ], // Only persist these slices
  blacklist: [api.reducerPath],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    queueDrawer: queueDrawerReducer,
    detailAlbum: detailAlbumReducer,
    detailTrack: detailTrackReducer,
    trackManagement: trackManagementReducer,
    albumManagement: albumManagementReducer,
    userManagement: userManagementReducer,
    playlistManagement: playlistManagementReducer,
    detailPlaylist: detailPlaylistReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);
  },
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
