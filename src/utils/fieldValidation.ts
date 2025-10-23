/**
 * Dynamic field validation utility for database-driven forms
 * Automatically detects field types and applies appropriate validation rules
 */

import { validationRules } from "./formValidations";

/**
 * Detects field type based on field name and applies appropriate validation
 */
export const getFieldValidation = (fieldName: string, fieldLabel: string, inputType?: string) => {
    const name = fieldName.toLowerCase();
    const label = fieldLabel.toLowerCase();

    // Phone number detection
    if (name.includes("phone") || name.includes("mobile") || name.includes("contact") ||
        label.includes("phone") || label.includes("mobile") || label.includes("contact")) {
        return {
            type: "tel",
            inputType: "normal",
            rules: validationRules.phoneNumber,
            placeholder: "Phone Number (e.g., +96512345678)"
        };
    }

    // Email detection
    if (name.includes("email") || label.includes("email")) {
        return {
            type: "email",
            inputType: "normal",
            rules: validationRules.email,
            placeholder: "Email"
        };
    }

    // Name detection
    if (name.includes("name") || name.includes("fullname") || name.includes("firstname") ||
        name.includes("lastname") || label.includes("name")) {
        return {
            type: "text",
            inputType: "normal",
            rules: validationRules.fullName,
            placeholder: "Full Name"
        };
    }

    // NID detection
    if (name.includes("nid") || name.includes("nationalid") || name.includes("idnumber") ||
        label.includes("nid") || label.includes("national id")) {
        return {
            type: "text",
            inputType: "normal",
            rules: validationRules.nid,
            placeholder: "NID Number"
        };
    }

    // Address detection
    if (name.includes("address") || name.includes("location") || name.includes("home") ||
        label.includes("address") || label.includes("location")) {
        return {
            type: "text",
            inputType: "normal",
            rules: validationRules.address,
            placeholder: "Address"
        };
    }

    // Amount detection
    if (name.includes("amount") || name.includes("salary") || name.includes("income") ||
        name.includes("price") || name.includes("cost") || name.includes("value") ||
        label.includes("amount") || label.includes("salary") || label.includes("income")) {
        return {
            type: "number",
            inputType: "normal",
            rules: validationRules.amount,
            placeholder: "Amount"
        };
    }

    // Monthly income detection
    if (name.includes("monthly") && (name.includes("income") || name.includes("salary")) ||
        label.includes("monthly income") || label.includes("monthly salary")) {
        return {
            type: "number",
            inputType: "normal",
            rules: validationRules.monthlyIncome,
            placeholder: "Monthly Income"
        };
    }

    // Purpose/Description detection
    if (name.includes("purpose") || name.includes("description") || name.includes("reason") ||
        name.includes("comment") || name.includes("note") || name.includes("details") ||
        label.includes("purpose") || label.includes("description") || label.includes("reason")) {
        return {
            type: "text",
            inputType: "textarea",
            rules: validationRules.purpose,
            placeholder: "Purpose/Description"
        };
    }

    // Hub/Location ID detection
    if (name.includes("hub") || name.includes("location") || name.includes("branch") ||
        label.includes("hub") || label.includes("location") || label.includes("branch")) {
        return {
            type: "text",
            inputType: "normal",
            rules: validationRules.text("ID", 3, 50),
            placeholder: "ID"
        };
    }

    // Currency detection
    if (name.includes("currency") || label.includes("currency")) {
        return {
            type: "text",
            inputType: "normal",
            rules: validationRules.text("Currency", 3, 10),
            placeholder: "Currency (e.g., USD, KWD)"
        };
    }

    // Default validation for unknown fields
    return {
        type: inputType === "number" ? "number" : "text",
        inputType: "normal",
        rules: validationRules.text(fieldLabel, 1, 200),
        placeholder: fieldLabel
    };
};

/**
 * Enhanced field configuration with validation
 */
export const enhanceFieldWithValidation = (field: any) => {
    // Skip validation for file upload fields - they should remain unchanged
    if (field.inputType === "file") {
        return field;
    }

    const validation = getFieldValidation(field.inputName, field.label, field.inputType);

    return {
        ...field,
        type: validation.type,
        inputType: validation.inputType,
        rules: validation.rules,
        placeholder: validation.placeholder,
        // Add input restrictions for number fields
        onKeyPress: validation.type === "number" ? (e: any) => {
            if (!/[0-9+\-\s()]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && e.key !== "Enter") {
                e.preventDefault();
            }
        } : undefined
    };
};

/**
 * Apply validation to all fields in a form
 */
export const applyValidationToFields = (fields: any[]) => {
    return fields.map(field => enhanceFieldWithValidation(field));
};
