import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hubManagerSpokeManagerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSpokeManger: builder.query({
            query: ({ page, limit, searchTerm }) => ({
                url: `/users?role=spokeManager`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                },
            }),
            providesTags: [tagTypes.hubManageRepayments],
        })
    }),
});

export const {
    useGetAllSpokeMangerQuery
} = hubManagerSpokeManagerApi;
