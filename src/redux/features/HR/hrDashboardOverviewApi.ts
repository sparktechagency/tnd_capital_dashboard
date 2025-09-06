import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hr_overview = "/dashboard";

const adminApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        hrDashboardOverview: builder.query({
            query: ({ year }) => ({
                url: `${hr_overview}/hr_dashboard_overview`,
                method: "GET",
                params: {
                    year
                },
            }),
            providesTags: [tagTypes.hrDashboardOverview],
        }),

        deleteLoanApplication: builder.mutation({
            query: (req) => ({
                url: `${hr_overview}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.hrDashboardOverview],
        }),



    }),
});

export const {
    useHrDashboardOverviewQuery,
    useDeleteLoanApplicationMutation
} = adminApplicationApi;
