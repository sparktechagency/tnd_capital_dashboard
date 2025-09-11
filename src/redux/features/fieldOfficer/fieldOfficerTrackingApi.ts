import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const fieldOfficerReportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getFieldOfficerCollectionReport: builder.query({
            query: ({ year }) => ({
                url: `/dashboard/collection_report`,
                method: "GET",
                params: {
                    year
                }
            }),
            providesTags: [tagTypes.fieldOfficerRepayment],
        }),

        getFieldOfficerLoanApprovalReport: builder.query({
            query: ({ year }) => ({
                url: `/dashboard/loan_approval_report`,
                method: "GET",
                params: {
                    year
                }
            }),
            providesTags: [tagTypes.fieldOfficerRepayment],
        }),

        getFieldOfficerAllFieldOfficerCollection: builder.query({
            query: () => ({
                url: `/dashboard/all_field_officer_collection`,
                method: "GET",
            }),
            providesTags: [tagTypes.fieldOfficerRepayment],
        })
    }),
});

export const {
    useGetFieldOfficerCollectionReportQuery,
    useGetFieldOfficerLoanApprovalReportQuery,
    useGetFieldOfficerAllFieldOfficerCollectionQuery
} = fieldOfficerReportApi;
