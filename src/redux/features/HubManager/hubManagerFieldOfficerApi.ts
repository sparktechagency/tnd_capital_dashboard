import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hub_manger_field_officer_url = "/hub_manager";

const hubManagerFieldOfficerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllHubManagerFieldOfficer: builder.query({
            query: ({ page, limit, searchTerm, filtering }) => ({
                url: `${hub_manger_field_officer_url}/field_officer_request`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                },
            }),
            providesTags: [tagTypes.hubManagerFieldOfficer],
        }),

        assignSpokeToFieldOfficer: builder.mutation({
            query: (req) => ({
                url: `/users/assign_spoke`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.hubManagerFieldOfficer],
        }),

        getAllFieldOfficers: builder.query({
            query: ({ page, limit, searchTerm, filtering }) => ({
                url: `/hub_manager/field_officer_request?isAssignSpoke=true`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                }
            }),
            providesTags: [tagTypes.hubManagerFieldOfficer],
        }),

    }),
});

export const {
    useGetAllHubManagerFieldOfficerQuery,
    useAssignSpokeToFieldOfficerMutation,
    useGetAllFieldOfficersQuery
} = hubManagerFieldOfficerApi;
