import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";


const supervisorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        supervisorOverview: builder.query({
            query: ({ year}) => ({
                url: `/dashboard/supervisor_dashboard_overview?year=${year}`,
                method: "GET",
            }),
            providesTags: [tagTypes.supervisorOverview],
        }),
    }),
});

export const {
    useSupervisorOverviewQuery
} = supervisorApi;
