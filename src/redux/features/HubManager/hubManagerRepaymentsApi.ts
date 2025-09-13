import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hub_manager_repayments = "/repayments";

const hubManagerRepaymentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllHubManagerRepayments: builder.query({
            query: ({ page, limit, searchTerm, filtering }) => ({
                url: `${hub_manager_repayments}?isConfirm=true`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                },
            }),
            providesTags: [tagTypes.hubManageRepayments],
        })
    }),
});

export const {
    useGetAllHubManagerRepaymentsQuery
} = hubManagerRepaymentsApi;
