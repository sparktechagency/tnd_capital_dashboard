import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";


const leads_and_clients_url = "/leads_and_clients";

const adminLeadsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLeads: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: leads_and_clients_url,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                },
            }),
            providesTags: [tagTypes.adminLeads],
        }),

        deleteLeads: builder.mutation({
            query: (req) => ({
                url: `${leads_and_clients_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLeads],
        }),

    }),
});

export const {
    useGetAllLeadsQuery,
    useDeleteLeadsMutation
} = adminLeadsApi;
