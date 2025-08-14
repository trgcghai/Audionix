import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
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
import { setupListeners } from "@reduxjs/toolkit/query";
import queueDrawerReducer from "@/store/slices/queueDrawerSlice";
import detailAlbumReducer from "@/store/slices/detailAlbumSlice";
import trackManagementReducer from "@/store/slices/trackManagement";
import albumManagementReducer from "@/store/slices/albumManagement";
import userReducer from "@/store/slices/userSlice";
import { api } from "@/services/api";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "queueDrawer",
    "detailAlbum",
    "user",
    "trackManagement",
    "albumManagement",
  ], // Only persist these slices
  blacklist: [api.reducerPath],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    queueDrawer: queueDrawerReducer,
    detailAlbum: detailAlbumReducer,
    trackManagement: trackManagementReducer,
    albumManagement: albumManagementReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
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
