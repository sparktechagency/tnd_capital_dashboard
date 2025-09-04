import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const loan_url = "/loans";

const adminLoanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createLoan: builder.mutation({
            query: (req) => ({
                url: `${loan_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLoanApplication],
        }),

        getAllLoans: builder.query({
            query: () => ({
                url: `${loan_url}`,
                method: "GET",

            }),
            providesTags: [tagTypes.adminLoanApplication],
        }),

        deleteLoans: builder.mutation({
            query: (req) => ({
                url: `${loan_url}/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLoanApplication],
        }),

        editLoan: builder.mutation({
            query: (req) => ({
                url: `${loan_url}/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLoanApplication],
        }),


    }),
});

export const {
    useGetAllLoansQuery,
    useDeleteLoansMutation,
    useCreateLoanMutation,
    useEditLoanMutation
} = adminLoanApi;
