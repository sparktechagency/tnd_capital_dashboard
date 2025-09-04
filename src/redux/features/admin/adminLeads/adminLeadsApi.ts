import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const leads_and_clients_url = "/leads_and_clients";
const leads_and_clients_field_url = "/leads_and_clients_field";

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


        // field 
        getAllLeadsRelatedField: builder.query({
            query: () => ({
                url: leads_and_clients_field_url,
                method: "GET",

            }),
            providesTags: [tagTypes.adminLeadsField],
        }),

        createLeadsField: builder.mutation({
            query: (req) => ({
                url: `${leads_and_clients_field_url}/add_field`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLeadsField],
        }),

        updateLeadsField: builder.mutation({
            query: (req) => ({
                url: leads_and_clients_field_url,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLeadsField],
        }),

        deleteLeadsField: builder.mutation({
            query: (req) => ({
                url: `${leads_and_clients_field_url}/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLeadsField],
        })
    }),
});

export const {
    useGetAllLeadsQuery,
    useDeleteLeadsMutation,
    useGetAllLeadsRelatedFieldQuery,
    useCreateLeadsFieldMutation,
    useUpdateLeadsFieldMutation,
    useDeleteLeadsFieldMutation
} = adminLeadsApi;
