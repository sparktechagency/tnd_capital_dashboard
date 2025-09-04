import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";

const admin_repayments_url = "/repayments";
const repayments_field_url = "/repayments_field";

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
            providesTags: [tagTypes.adminRepayments],
        }),

        deleteRepayments: builder.mutation({
            query: (req) => ({
                url: `${admin_repayments_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminRepayments],
        }),

        repaymentCount: builder.query({
            query: () => ({
                url: `/dashboard/repayments_count`,
                method: "GET",
            }),
            providesTags: [tagTypes.adminRepayments],
        }),


        // field related api
        createRepaymentsField: builder.mutation({
            query: (req) => ({
                url: `${repayments_field_url}/add_field`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminRepayments],
        }),

        getAllRepaymentsField: builder.query({
            query: () => ({
                url: `${repayments_field_url}`,
                method: "GET",
            }),
            providesTags: [tagTypes.adminRepayments],
        }),

        deleteRepaymentsField: builder.mutation({
            query: (req) => ({
                url: `${repayments_field_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminRepayments],
        }),

        updateRepaymentsField: builder.mutation({
            query: (req) => ({
                url: `${repayments_field_url}/update/${req?.params}`,
                method: "PUT",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminRepayments],
        }),


    }),
});

export const {
    useGetAllRepaymentsQuery,
    useDeleteRepaymentsMutation,
    useRepaymentCountQuery,
    useCreateRepaymentsFieldMutation,
    useGetAllRepaymentsFieldQuery,
    useDeleteRepaymentsFieldMutation,
    useUpdateRepaymentsFieldMutation
} = adminRepayments;
