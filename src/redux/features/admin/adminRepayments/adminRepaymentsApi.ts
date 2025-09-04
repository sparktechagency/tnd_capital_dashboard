import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const admin_repayments_url = "/repayments";

const adminRepayments = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRepayments: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: `${admin_repayments_url}`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                },
            }),
            providesTags: [tagTypes.adminLeads],
        }),

        deleteRepayments: builder.mutation({
            query: (req) => ({
                url: `${admin_repayments_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLeads],
        }),

        repaymentCount: builder.query({
            query: () => ({
                url: `/dashboard/repayments_count`,
                method: "GET",
            }),
            providesTags: [tagTypes.adminLeads],
        }),


    }),
});

export const {
    useGetAllRepaymentsQuery,
    useDeleteRepaymentsMutation,
    useRepaymentCountQuery
} = adminRepayments;
