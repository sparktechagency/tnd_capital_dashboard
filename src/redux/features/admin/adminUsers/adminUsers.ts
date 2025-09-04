import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const admin_users = "/users";

const adminUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page, limit, searchTerm, role }) => ({
                url: `${admin_users}`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    role
                },
            }),
            providesTags: [tagTypes.user],
        }),


        updateUser: builder.mutation({
            query: (req) => ({
                url: `${admin_users}/update_users/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.user],
        }),


        userAction: builder.mutation({
            query: (req) => ({
                url: `${admin_users}/actions/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.user],
        }),

        deleteUser: builder.mutation({
            query: (req) => ({
                url: `${admin_users}/delete_users/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.user],
        }),

    }),
});

export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useUserActionMutation,
    useDeleteUserMutation
} = adminUsersApi;
