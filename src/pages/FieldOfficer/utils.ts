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
                    rules: [
                        { required: true, message: "Full Name is required" },
                        { min: 2, message: "Name must be at least 2 characters" },
                        { max: 100, message: "Name must not exceed 100 characters" },
                        { pattern: /^[a-zA-Z\s]+$/, message: "Name can only contain letters and spaces" }
                    ],
                },
                {
                    name: "email",
                    inputType: "email",
                    label: "Email",
                    placeholder: "Email",
                    labelClassName: "!font-normal !text-sm",
                    rules: [
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Please enter a valid email address" },
                        { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
                    ],
                },
                {
                    name: "phoneNumber",
                    inputType: "text",
                    label: "Phone Number",
                    placeholder: "Phone Number (e.g., +96512345678)",
                    labelClassName: "!font-normal !text-sm",
                    rules: [
                        { required: true, message: "Phone Number is required" },
                        { pattern: /^\+?[1-9]\d{7,14}$/, message: "Please enter a valid phone number (8-15 digits)" },
                        { min: 8, message: "Phone number must be at least 8 digits" },
                        { max: 16, message: "Phone number must not exceed 16 characters" }
                    ],
                },
                {
                    name: "homeAddress",
                    inputType: "text",
                    label: "Home Address",
                    placeholder: "Home Address",
                    labelClassName: "!font-normal !text-sm",
                    rules: [
                        { required: true, message: "Home Address is required" },
                        { min: 10, message: "Address must be at least 10 characters" },
                        { max: 200, message: "Address must not exceed 200 characters" }
                    ],
                },
                {
                    name: "nid",
                    inputType: "text",
                    label: "NID",
                    placeholder: "NID Number",
                    labelClassName: "!font-normal !text-sm",
                    rules: [
                        { required: true, message: "NID is required" },
                        { pattern: /^[0-9]{8,20}$/, message: "NID must be 8-20 digits" }
                    ],
                },
            ]
            : [
                {
                    name: "leadUid",
                    inputType: "text",
                    label: "Lead ID",
                    placeholder: "Enter Lead ID",
                    labelClassName: "!font-normal !text-sm",
                    rules: [
                        { required: true, message: "Lead ID is required" },
                        { min: 3, message: "Lead ID must be at least 3 characters" }
                    ],
                },
            ]),

        {
            options: [
                {
                    label: "CPP-1",
                    value: "CPP-1",
                },
                {
                    label: "CPP-2",
                    value: "CPP-2",
                },
                {
                    label: "TTP",
                    value: "TTP",
                },
                {
                    label: "GEP",
                    value: "GEP",
                },
            ],
            placeholder: "Select Type of Request",
            isSelect: true,
            name: "typeofFinancingRequested",
            label: "Type of Request",
        },

        {
            name: "purposeOfFinancing",
            inputType: "text",
            label: "Purpose of Request",
            placeholder: "Type purpose of request",
            labelClassName: "!font-normal !text-sm",
            rules: [
                { required: true, message: "Purpose of Request is required" },
                { min: 10, message: "Purpose must be at least 10 characters" },
                { max: 500, message: "Purpose must not exceed 500 characters" }
            ],
        },
        {
            name: "loanAmountRequested",
            inputType: "number",
            label: "Amount Requested",
            placeholder: "Type Amount",
            labelClassName: "!font-normal !text-sm",
            rules: [
                { required: true, message: "Amount Requested is required" },
                {
                    validator: (_: unknown, value: number) => {
                        if (!value) {
                            return Promise.reject('Amount is required');
                        }
                        if (value <= 0) {
                            return Promise.reject('Amount must be greater than 0');
                        }
                        if (value > 1000000000) {
                            return Promise.reject('Amount must not exceed 1,000,000,000');
                        }
                        return Promise.resolve();
                    }
                }
            ],
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
            rules: [
                { required: true, message: "Location is required" },
                { min: 3, message: "Location must be at least 3 characters" },
                { max: 100, message: "Location must not exceed 100 characters" }
            ],
        },
        {
            name: "monthlyIncome",
            inputType: "number",
            label: "Monthly Income",
            placeholder: "Type income",
            labelClassName: "!font-normal !text-sm",
            rules: [
                { required: true, message: "Monthly Income is required" },
                {
                    validator: (_: unknown, value: number) => {
                        if (!value) {
                            return Promise.reject('Monthly income is required');
                        }
                        if (value <= 0) {
                            return Promise.reject('Monthly income must be greater than 0');
                        }
                        if (value > 100000000) {
                            return Promise.reject('Monthly income must not exceed 100,000,000');
                        }
                        return Promise.resolve();
                    }
                }
            ],
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
