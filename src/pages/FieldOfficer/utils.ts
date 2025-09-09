export const getInput = (applicantStatus: string) => {
    const inputStructure = [
        // Only render the name, email, and phone number fields if the status is not "From Leads"
        ...(applicantStatus !== "From Leads"
            ? [
                {
                    name: "name",
                    inputType: "text",
                    placeholder: "Full Name",
                    label: "Full Name",
                    labelClassName: "!font-normal !text-sm",
                    rules: [{ required: true, message: "Name is required" }],
                },
                {
                    name: "email",
                    inputType: "email",
                    label: "Email",
                    placeholder: "Email",
                    labelClassName: "!font-normal !text-sm",
                    rules: [{ required: true, message: "Email is required" }],
                },
                {
                    name: "phoneNumber",
                    inputType: "text",
                    label: "Phone Number",
                    placeholder: "Phone Number",
                    labelClassName: "!font-normal !text-sm",
                    rules: [{ required: true, message: "Phone Number is required" }],
                },
                {
                    name: "homeAddress",
                    inputType: "text",
                    label: "Home Address",
                    placeholder: "Home Address",
                    labelClassName: "!font-normal !text-sm",
                    rules: [{ required: true, message: "Home Address is required" }],
                },
                {
                    name: "nid",
                    inputType: "text",
                    label: "NID",
                    placeholder: "NID Number",
                    labelClassName: "!font-normal !text-sm",
                    rules: [{ required: true, message: "NID is required" }],
                },
            ]
            : [
                {
                    name: "leadUid",
                    inputType: "text",
                    label: "Lead ID",
                    placeholder: "Enter Lead ID",
                    labelClassName: "!font-normal !text-sm",
                    rules: [{ required: true, message: "Lead ID is required" }],
                },
            ]),

        {
            options: [
                {
                    label: "Cost plus profit (CPP) Murabaha Personal",
                    value: "Cost plus profit (CPP) Murabaha Personal",
                },
                {
                    label: "Cost plus profit (CPP) Murabaha Business",
                    value: "Cost plus profit (CPP) Murabaha Business",
                },
                {
                    label: "Thrive Together Partnership (TTP) Mudaraba",
                    value: "Thrive Together Partnership (TTP) Mudaraba",
                },
            ],
            placeholder: "Select Type of Financing",
            isSelect: true,
            name: "typeofFinancingRequested",
            label: "Type of Financing Requested",
        },

        {
            name: "purposeOfFinancing",
            inputType: "text",
            label: "Purpose of Financing",
            placeholder: "Type purpose of financing",
            labelClassName: "!font-normal !text-sm",
            rules: [{ required: true, message: "Purpose of Financing is required" }],
        },
        {
            name: "loanAmountRequested",
            inputType: "number",
            label: "Loan Amount Requested",
            placeholder: "Type Amount",
            labelClassName: "!font-normal !text-sm",
            rules: [{ required: true, message: "Loan Amount is required" }],
        },

        {
            options: [
                {
                    label: "Employed",
                    value: "Employed",
                },
                {
                    label: "Self Employed",
                    value: "Self Employed",
                },
                {
                    label: "Unemployed",
                    value: "Unemployed",
                },
                {
                    label: "Other",
                    value: "Other",
                },
            ],
            placeholder: "Select Employment Status",
            isSelect: true,
            name: "employmentStatus",
            label: "Employment Status",
        },

        {
            name: "whereAreYouLocated",
            inputType: "text",
            label: "Where are you located",
            placeholder: "City, State, Country",
            labelClassName: "!font-normal !text-sm",
            rules: [{ required: true, message: "Location is required" }],
        },
        {
            name: "monthlyIncome",
            inputType: "number",
            label: "Monthly Income",
            placeholder: "Type income",
            labelClassName: "!font-normal !text-sm",
            rules: [{ required: true, message: "Monthly Income is required" }],
        },

        {
            options: [
                {
                    label: "Phone",
                    value: "Phone",
                },
                {
                    label: "Email",
                    value: "Email",
                },
            ],
            placeholder: "Select Preferred Contact",
            isSelect: true,
            name: "preferredContact",
            label: "Preferred Contact",
        },
        {
            options: [
                {
                    label: "1 Month",
                    value: "1 Month",
                },
                {
                    label: "6 Months",
                    value: "6 Months",
                },
                {
                    label: "8 Months",
                    value: "8 Months",
                },
                {
                    label: "12 Months",
                    value: "12 Months",
                },
                {
                    label: "18 Months",
                    value: "18 Months",
                },
                {
                    label: "24 Months",
                    value: "24 Months",
                },
            ],
            placeholder: "Select Term",
            isSelect: true,
            name: "term",
            label: "Term",
        },

        {
            name: "startDate",
            inputType: "date",
            label: "Start Date",
            placeholder: "Select Date",
            labelClassName: "!font-normal !text-sm",
            rules: [{ required: true, message: "Start Date is required" }],
        },
        {
            name: "endDate",
            inputType: "date",
            label: "End Date",
            placeholder: "Select Date",
            labelClassName: "!font-normal !text-sm",
            rules: [{ required: true, message: "End Date is required" }],
        },
    ];

    return inputStructure;
};
