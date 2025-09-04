import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";


const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionChart: builder.query({
      query: ({ year }) => ({
        url: `/dashboard/collection_report?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminOverview],
    }),

    getAdminCounts: builder.query({
      query: () => ({
        url: `/dashboard/admin_dashboard_count`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminOverview],
    }),

    getAdminLoanApprovalReport: builder.query({
      query: ({ year }) => ({
        url: `/dashboard/loan_approval_report?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminOverview],
    }),

    getRecentOfficerCollection: builder.query({
      query: () => ({
        url: `/dashboard/all_field_officer_collection?limit=5`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminOverview],
    }),
  }),
});

export const {
  useGetCollectionChartQuery,
  useGetAdminCountsQuery,
  useGetAdminLoanApprovalReportQuery,
  useGetRecentOfficerCollectionQuery,
} = overviewApi;
