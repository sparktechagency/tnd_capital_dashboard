import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const loan_application_url = "/loan_application";

const fieldOfficerLoanApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createLoanApplication: builder.mutation({
            query: (req) => ({
                url: `${loan_application_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.fieldOfficerLoanApplication],
        }),

        getAllLoanApplication: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: `${loan_application_url}/all_loan_application`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                },
            }),
            providesTags: [tagTypes.fieldOfficerLoanApplication],
        }),

        updateLoanApplication: builder.mutation({
            query: (req) => ({
                url: `${loan_application_url}/update/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.fieldOfficerLoanApplication],
        }),

        getAllClients: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: `/leads_and_clients/all_clients`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                },
            }),
            providesTags: [tagTypes.fieldOfficerLoanApplication],
        })

    }),
});

export const {
    useGetAllLoanApplicationQuery,
    useCreateLoanApplicationMutation,
    useUpdateLoanApplicationMutation,
    useGetAllClientsQuery
} = fieldOfficerLoanApplicationApi;
