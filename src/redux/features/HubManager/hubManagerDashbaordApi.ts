import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hub_manager_overview = "/dashboard";

const hubManagerOverviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHubManagerCounts: builder.query({
            query: () => ({
                url: `${hub_manager_overview}/hub_manager_dashboard_count`,
                method: "GET",
            }),
            providesTags: [tagTypes.hubManagerOverview],
        }),

        getHubManagerCollectionReport: builder.query({
            query: ({ year }) => ({
                url: `${hub_manager_overview}/collection_report?year=${year}`,
                method: "GET",
            }),
            providesTags: [tagTypes.hubManagerOverview],
        }),

        getHubManagerApprovalReport: builder.query({
            query: ({ year }) => ({
                url: `${hub_manager_overview}/loan_approval_report?year=${year}`,
                method: "GET",
            }),
            providesTags: [tagTypes.hubManagerOverview],
        }),

        getHubManageFieldOfficerCollection: builder.query({
            query: () => ({
                url: `${hub_manager_overview}/all_field_officer_collection?limit=5`,
                method: "GET",
            }),
            providesTags: [tagTypes.hubManagerOverview],
        }),
    }),
});

export const {
    useGetHubManagerCountsQuery,
    useGetHubManagerCollectionReportQuery,
    useGetHubManagerApprovalReportQuery,
    useGetHubManageFieldOfficerCollectionQuery,
} = hubManagerOverviewApi;
