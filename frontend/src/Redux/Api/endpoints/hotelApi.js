import baseApi from "../baseApi";

const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addHotel: builder.mutation({
      query: (payload) => ({
        url: "/hotel/add-hotel",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["hotel"],
    }),

    getAllHotelName: builder.query({
      query: () => ({
        url: "/hotel/get-allhotelName",
        method: "GET",
      }),
      providesTags: ["hotel"],
    }),

    getHotelbyId: builder.query({
      query: (id) => ({
        url: `/hotel/get-hotelbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["hotel"],
    }),

    updateHotel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hotel/updatehotel/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotel"],
    }),

    setRoomOfferPrice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hotel/set-offerprice/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotel"],
    }),
  }),
});

export const {
  useAddHotelMutation,
  useGetAllHotelNameQuery,
  useGetHotelbyIdQuery,
  useUpdateHotelMutation,
  useSetRoomOfferPriceMutation,
} = hotelApi;
