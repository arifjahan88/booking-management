import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelDataReducer from "./Features/addHotelSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import baseApi from "./Api/baseApi";
import userReducer from "./Features/userInfoSlice";

const rootReducer = combineReducers({
  hoteldata: hotelDataReducer,
  userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "session",
  version: "1",
  storage,
  blacklist: ["hoteldata", baseApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
