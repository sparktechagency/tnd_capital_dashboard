import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const field_officer_repayments_url = "/repayments";

const fieldOfficerRepaymentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRepayement: builder.mutation({
            query: (req) => ({
                url: `${field_officer_repayments_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.fieldOfficerRepayment],
        }),

        getAllRepayments: builder.query({
            query: ({ page, limit, searchTerm, filtering }) => ({
                url: `${field_officer_repayments_url}`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                }
            }),
            providesTags: [tagTypes.fieldOfficerRepayment],
        }),

        confirmRepayments: builder.mutation({
            query: (req) => ({
                url: `${field_officer_repayments_url}/confirm/${req?.params}`,
                method: "PATCH",
            }),
            invalidatesTags: [tagTypes.fieldOfficerRepayment],
        }),

        trackingCounts: builder.query({
            query: () => ({
                url: `/dashboard/repayments_count`,
                method: "GET",
            }),
            providesTags: [tagTypes.fieldOfficerRepayment],
        }),

    }),
});

export const {
    useCreateRepayementMutation,
    useGetAllRepaymentsQuery,
    useConfirmRepaymentsMutation,
    useTrackingCountsQuery
} = fieldOfficerRepaymentsApi;
