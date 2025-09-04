import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const loan_application_url = "/loan_application";

const adminApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
            providesTags: [tagTypes.adminLoanApplication],
        }),

        deleteLoanApplication: builder.mutation({
            query: (req) => ({
                url: `${loan_application_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLoanApplication],
        }),



    }),
});

export const {
    useGetAllLoanApplicationQuery,
    useDeleteLoanApplicationMutation
} = adminApplicationApi;
