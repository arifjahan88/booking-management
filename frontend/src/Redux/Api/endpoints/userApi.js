import baseApi from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userlogin: builder.mutation({
      query: (payload) => ({
        url: `/users/login-user`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    superUserLogin: builder.mutation({
      query: (payload) => ({
        url: `/users/login-superuser`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    userRegister: builder.mutation({
      query: (payload) => ({
        url: `/users/register-user`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users/get-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getAllUsersCompanyName: builder.query({
      query: () => ({
        url: "/users/get-allusers-company",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useUserloginMutation,
  useUserRegisterMutation,
  useGetAllUsersQuery,
  useSuperUserLoginMutation,
  useGetAllUsersCompanyNameQuery,
} = userApi;
