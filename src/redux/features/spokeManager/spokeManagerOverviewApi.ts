import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const spoke_manager_overview = "/dashboard";

const spokeManagerOverviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpokeMangerCounts: builder.query({
            query: () => ({
                url: `${spoke_manager_overview}/repayments_count`,
                method: "GET",
            }),
            providesTags: [tagTypes.spokeManagerOverview],
        }),

        spokeManageCollectionReport: builder.query({
            query: ({ year }) => ({
                url: `${spoke_manager_overview}/collection_report?year=${year}`,
                method: "GET",
            }),
            providesTags: [tagTypes.spokeManagerOverview],
        }),

        spokeManagerFieldOfficerCollection: builder.query({
            query: () => ({
                url: `${spoke_manager_overview}/all_field_officer_collection?limit=5`,
                method: "GET",
            }),
            providesTags: [tagTypes.spokeManagerOverview],
        }),

        allFieldOfficerInfo: builder.query({
            query: ({
                page,
                limit,
                searchTerm,
                filtering
            }) => ({
                url: `/users?role=fieldOfficer`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                }
            }),
            providesTags: [tagTypes.spokeManagerOverview],
        })
    }),
});

export const {
    useGetSpokeMangerCountsQuery,
    useSpokeManageCollectionReportQuery,
    useSpokeManagerFieldOfficerCollectionQuery,
    useAllFieldOfficerInfoQuery
} = spokeManagerOverviewApi;
