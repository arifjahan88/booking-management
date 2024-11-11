import baseApi from "../../baseApi";

const onlineBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOnlineHotelBookings: builder.query({
      query: (hotelid) => ({
        url: `/booking/get-online-hotelbookings-byid/${hotelid}`,
        method: "GET",
        providesTags: ["booking"],
      }),
    }),

    getOnlineRoomNumbers: builder.query({
      query: ({ hotelid, roomNames }) => ({
        url: `/booking/get-online-hotelbookings-roomnumbers?hotelid=${hotelid}&roomnames=${roomNames}`,
        method: "GET",
        providesTags: ["booking"],
      }),
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const { useGetOnlineHotelBookingsQuery, useGetOnlineRoomNumbersQuery } = onlineBookingApi;
