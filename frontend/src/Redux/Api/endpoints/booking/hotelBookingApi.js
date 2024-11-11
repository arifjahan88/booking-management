import baseApi from "../../baseApi";

const hotelBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addHotelBooking: builder.mutation({
      query: (payload) => ({
        url: `/booking/add-hotelbooking`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["booking", "onlinebooking"],
    }),

    getBookedRoomNumbers: builder.query({
      query: ({ marchentid, formatDate }) => ({
        url: `/booking/get-bookedroom?id=${marchentid}&date=${formatDate}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    getavailableroomnumbers: builder.query({
      query: ({ id, date, roomName }) => ({
        url: `/booking/get-bookedroomnumbers?id=${id}&date=${date}&roomName=${roomName}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    getAllCurrentHotelBooking: builder.query({
      query: (hotelid) => ({
        url: `/booking/get-current-hotelBooking/${hotelid}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    getpreviousbooking: builder.query({
      query: (hotelid) => ({
        url: `/booking/get-previous-bookings/${hotelid}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    deletebooking: builder.mutation({
      query: ({ bookingid, hotelid }) => ({
        url: `/booking/delete-booking?bookingid=${bookingid}&hotelid=${hotelid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),

    updateDuePayment: builder.mutation({
      query: (payload) => ({
        url: `/booking/udpate-payment`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["booking"],
    }),

    updateCheckIn: builder.mutation({
      query: (bookingid) => ({
        url: `/booking/udpate-checkin/${bookingid}`,
        method: "PUT",
      }),
      invalidatesTags: ["booking"],
    }),

    getAllBookingsbyHotelId: builder.query({
      query: (hotelid) => ({
        url: `/booking/get-allbookings/${hotelid}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    getgueastDetails: builder.query({
      query: ({ roomnumber, hotelId, date }) => ({
        url: `/booking/get-guestDatabyroomnumber?roomnumber=${roomnumber}&hotelId=${hotelId}&date=${date}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    addAddons: builder.mutation({
      query: ({ bookingid, payload }) => ({
        url: `/booking/add-addons/${bookingid}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["booking"],
    }),

    getAllCustomerPhone: builder.query({
      query: (hotelid) => ({
        url: `/booking/get-hotelallphonenumber/${hotelid}`,
        method: "GET",
      }),
    }),

    getCustomerbyphone: builder.query({
      query: ({ hotelid, phone }) => ({
        url: `/booking/get-guestinfo-byphone?hotelid=${hotelid}&phone=${phone}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddHotelBookingMutation,
  useGetBookedRoomNumbersQuery,
  useGetavailableroomnumbersQuery,
  useGetAllCurrentHotelBookingQuery,
  useGetpreviousbookingQuery,
  useDeletebookingMutation,
  useUpdateDuePaymentMutation,
  useUpdateCheckInMutation,
  useGetAllBookingsbyHotelIdQuery,
  useGetgueastDetailsQuery,
  useAddAddonsMutation,
  useGetCustomerbyphoneQuery,
  useGetAllCustomerPhoneQuery,
} = hotelBookingApi;
