import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const loan_application_url = "/loan_application";

const hubManagerApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllHubManagerLoanApplication: builder.query({
            query: ({ page, limit, searchTerm, supervisorApproval, hubManagerApproval, filtering }) => ({
                url: `${loan_application_url}/all_loan_application`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    supervisorApproval,
                    hubManagerApproval,
                    filtering
                },
            }),
            providesTags: [tagTypes.adminLoanApplication],
        }),

        deleteHubManagerLoanApplication: builder.mutation({
            query: (req) => ({
                url: `${loan_application_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLoanApplication],
        }),

        applicationAction: builder.mutation({
            query: (req) => ({
                url: `${loan_application_url}/action`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLoanApplication],
        })

    }),
});

export const {
    useGetAllHubManagerLoanApplicationQuery,
    useDeleteHubManagerLoanApplicationMutation,
    useApplicationActionMutation
} = hubManagerApplicationApi;
