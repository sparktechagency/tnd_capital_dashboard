import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const hubManagerSpokeManagerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSpokeManger: builder.query({
            query: ({ page, limit, searchTerm, filtering }) => ({
                url: `/users?role=spokeManager`,
                method: "GET",
                params: {
                    page,
                    limit,
                    searchTerm,
                    filtering
                },
            }),
            providesTags: [tagTypes.hubManageSpokeManager,],
        })
    }),
});

export const {
    useGetAllSpokeMangerQuery
} = hubManagerSpokeManagerApi;
