import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const leads_and_clients = "/leads_and_clients";

const fieldOfficerLeadsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allLeads: builder.query({
            query: () => ({
                url: leads_and_clients,
                method: "GET",
            }),
            providesTags: [tagTypes.fieldOfficerLeads],
        }),

        updateFieldOfficerLeads: builder.mutation({
            query: (req) => ({
                url: `${leads_and_clients}/update/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.fieldOfficerLeads],
        }),

        deleteFieldOfficerLeads: builder.mutation({
            query: (req) => ({
                url: `${leads_and_clients}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.fieldOfficerLeads],
        }),


        /// field

        getAllLeadsField: builder.query({
            query: () => ({
                url: "/leads_and_clients_field",
                method: "GET",
            }),
            providesTags: [tagTypes.fieldOfficerLeads],
        })
    }),
});

export const {
    useAllLeadsQuery,
    useUpdateFieldOfficerLeadsMutation,
    useDeleteFieldOfficerLeadsMutation,
    useGetAllLeadsFieldQuery
} = fieldOfficerLeadsApi;
