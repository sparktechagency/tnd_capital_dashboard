import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const leads_and_clients_url = "/leads_and_clients";

const adminClients = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query({
            query: ({ page, limit, searchTerm, filtering }) => ({
                url: `${leads_and_clients_url}/all_clients`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                },
            }),
            providesTags: [tagTypes.adminLeads],
        }),

        deleteClients: builder.mutation({
            query: (req) => ({
                url: `${leads_and_clients_url}/delete_client/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLeads],
        }),



    }),
});

export const {
    useGetAllClientsQuery,
    useDeleteClientsMutation
} = adminClients;
