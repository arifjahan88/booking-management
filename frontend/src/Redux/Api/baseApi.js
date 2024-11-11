import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://booking-management-backend.vercel.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userReducer?.userInfo?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["hotel", "user", "booking", "onlinebooking", "rental"],
  endpoints: () => ({}),
});

export default baseApi;
