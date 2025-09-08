import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const admin_users = "/users";
const users_field = "/users_field"


const adminUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createUser: builder.mutation({
            query: (req) => ({
                url: `${admin_users}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.user],
        }),

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
            invalidatesTags: [tagTypes.user, tagTypes.hubManageSpokeManager],
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
            invalidatesTags: [tagTypes.user,],
        }),

        getAllManagers: builder.query({
            query: ({ page, limit, searchTerm, }) => ({
                url: `${admin_users}/all_managers`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                },
            }),
            providesTags: [tagTypes.user],
        }),
        // field related api calling

        createUserField: builder.mutation({
            query: (req) => ({
                url: `${users_field}/add_field`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.userField],
        }),

        getAllUsersRelatedField: builder.query({
            query: () => ({
                url: `${users_field}/get_users_fields`,
                method: "GET",
            }),
            providesTags: [tagTypes.userField],
        }),

        updateUserField: builder.mutation({
            query: (req) => ({
                url: `${users_field}/update_field`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.userField],
        }),

        deleteUserField: builder.mutation({
            query: (req) => ({
                url: `${users_field}/delete_field/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.userField],
        }),


    }),
});

export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    useUserActionMutation,
    useDeleteUserMutation,
    useGetAllManagersQuery,
    //
    useGetAllUsersRelatedFieldQuery,
    useCreateUserFieldMutation,
    useUpdateUserFieldMutation,
    useDeleteUserFieldMutation
} = adminUsersApi;
