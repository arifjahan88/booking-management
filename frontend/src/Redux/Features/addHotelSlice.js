import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelInfo: {},
  nearByLocations: {},
  hotelFacilites: {},
  hotelRooms: [],
};

export const hoteldata = createSlice({
  name: "hoteldata",
  initialState,
  reducers: {
    setHotelInfoData: (state, action) => {
      state.hotelInfo = action.payload;
    },

    setNearByLocationsData: (state, action) => {
      state.nearByLocations = action.payload;
    },

    setHotelFacilitesData: (state, action) => {
      state.hotelFacilites = {
        ...state.hotelFacilites,
        ...action.payload,
      };
    },
    setHotelRoomsData: (state, action) => {
      state.hotelRooms = [...state.hotelRooms, action.payload];
    },
  },
});

export const {
  setHotelFacilitesData,
  setHotelInfoData,
  setHotelRoomsData,
  setNearByLocationsData,
} = hoteldata.actions;

export default hoteldata.reducer;
