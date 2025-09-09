import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const field_officer_overview = "/dashboard";

const fieldOfficerOverviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFieldOfficerOverview: builder.query({
            query: () => ({
                url: `${field_officer_overview}/field_officer_dashboard_count`,
                method: "GET",
            }),
            providesTags: [tagTypes.fieldOfficerOverview],
        }),

        fieldOfficerLeadsReportChart: builder.query({
            query: ({ year }) => ({
                url: `${field_officer_overview}/leads_chart?year=${year}`,
                method: "GET",
            }),
            providesTags: [tagTypes.fieldOfficerOverview],
        }),
    }),
});

export const {
    useGetFieldOfficerOverviewQuery,
    useFieldOfficerLeadsReportChartQuery,
} = fieldOfficerOverviewApi;
