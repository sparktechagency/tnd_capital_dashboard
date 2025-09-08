import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hub_manager_overview = "/leads_and_clients";

const hubManagerLeadsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getHubManagerAllLeads: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: `${hub_manager_overview}`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm
                }
            }),
            providesTags: [tagTypes.hubManagerLeads],
        }),

        deleteLeads: builder.mutation({
            query: (req) => ({
                url: `${hub_manager_overview}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.hubManagerLeads],
        }),

        getAllClientsForHub: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: `${hub_manager_overview}/all_clients`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm
                }
            }),
            providesTags: [tagTypes.hubManagerLeads],
        }),

        hubManagerDeleteClients: builder.mutation({
            query: (req) => ({
                url: `${hub_manager_overview}/delete_client/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.hubManagerLeads],
        })
    }),
});

export const {
    useGetHubManagerAllLeadsQuery,
    useDeleteLeadsMutation,
    useGetAllClientsForHubQuery,
    useHubManagerDeleteClientsMutation
} = hubManagerLeadsApi;
