import { baseApi } from "../../../api/baseApi";
import { tagTypes } from "../../../tagTypes";


const location_profiles_url = "/location_profile";

const adminLocationProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createLocationProfile: builder.mutation({
            query: (req) => ({
                url: `${location_profiles_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLocationProfile],
        }),

        getLocationProfile: builder.query({
            query: () => ({
                url: `${location_profiles_url}`,
                method: "GET",
            }),
            providesTags: [tagTypes.adminLocationProfile],
        }),

        deleteLocationProfile: builder.mutation({
            query: (req) => ({
                url: `${location_profiles_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.adminLocationProfile],
        }),

        updateLocationProfile: builder.mutation({
            query: (req) => ({
                url: `${location_profiles_url}/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.adminLocationProfile],
        })
    }),
});

export const {
    useCreateLocationProfileMutation,
    useGetLocationProfileQuery,
    useDeleteLocationProfileMutation,
    useUpdateLocationProfileMutation
} = adminLocationProfileApi;
