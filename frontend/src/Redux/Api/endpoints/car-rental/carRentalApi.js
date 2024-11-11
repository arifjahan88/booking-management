import baseApi from "../../baseApi";

const RentalCompany = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddRentalCompany: builder.mutation({
      query: (payload) => ({
        url: "/car-rent/add-company",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["rental"],
    }),

    getCompanyAllCar: builder.query({
      query: ({ start, end }) => ({
        url: `/car-rent/get-company-cars?startdate=${start}&enddate=${end}`,
        method: "GET",
      }),
      providesTags: ["rental"],
    }),

    carRentalBooking: builder.mutation({
      query: (payload) => ({
        url: "/car-rent/add-booking-cars",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["rental"],
    }),

    getAllRunningCar: builder.query({
      query: () => ({
        url: `/car-rent/get-running-cars`,
        method: "GET",
      }),
      providesTags: ["rental"],
    }),

    deletecarRentalBooking: builder.mutation({
      query: (bookindid) => ({
        url: `/car-rent/delete-running-cars/${bookindid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rental"],
    }),

    updateBookedCar: builder.mutation({
      query: (bookindid) => ({
        url: `/car-rent/update-booked-cars/${bookindid}`,
        method: "PUT",
      }),
      invalidatesTags: ["rental"],
    }),

    getAllPreviousCar: builder.query({
      query: () => ({
        url: "/car-rent/get-previous-cars",
        method: "GET",
      }),
      providesTags: ["rental"],
    }),
  }),
});

export const {
  useAddRentalCompanyMutation,
  useGetCompanyAllCarQuery,
  useCarRentalBookingMutation,
  useGetAllRunningCarQuery,
  useDeletecarRentalBookingMutation,
  useUpdateBookedCarMutation,
  useGetAllPreviousCarQuery,
} = RentalCompany;
