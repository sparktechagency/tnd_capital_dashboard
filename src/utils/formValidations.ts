/**
 * Centralized form validation rules for reuse across the application
 * These validations use Ant Design's Form validation API
 */

import type { Rule } from "antd/es/form";

export const validationRules = {
    // Email validation
    email: [
        { required: true, message: "Email is required" },
        { type: "email" as const, message: "Please enter a valid email address" },
        {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format"
        }
    ] as Rule[],

    // Phone number validation (international format)
    phoneNumber: [
        { required: true, message: "Phone Number is required" },
        {
            pattern: /^\+?[0-9]\d{7,14}$/,
            message: "Please enter a valid phone number (8-15 digits)"
        },
        { min: 8, message: "Phone number must be at least 8 digits" },
        { max: 16, message: "Phone number must not exceed 16 characters" }
    ] as Rule[],

    // Name validation
    fullName: [
        { required: true, message: "Full Name is required" },
        { min: 2, message: "Name must be at least 2 characters" },
        { max: 100, message: "Name must not exceed 100 characters" },
        {
            pattern: /^[a-zA-Z\s]+$/,
            message: "Name can only contain letters and spaces"
        }
    ],

    // NID validation
    nid: [
        { required: true, message: "NID is required" },
        {
            pattern: /^[0-9]{8,20}$/,
            message: "NID must be 8-20 digits"
        }
    ],

    // Address validation
    address: [
        { required: true, message: "Address is required" },
        { min: 10, message: "Address must be at least 10 characters" },
        { max: 200, message: "Address must not exceed 200 characters" }
    ],

    // Text field validation (general)
    text: (fieldName: string, minLength = 3, maxLength = 100) => [
        { required: true, message: `${fieldName} is required` },
        { min: minLength, message: `${fieldName} must be at least ${minLength} characters` },
        { max: maxLength, message: `${fieldName} must not exceed ${maxLength} characters` }
    ],

    // Number validation with range
    numberRange: (fieldName: string, min = 0, max = 1000000000) => [
        { required: true, message: `${fieldName} is required` },
        {
            validator: (_: unknown, value: number) => {
                if (!value && value !== 0) {
                    return Promise.reject(`${fieldName} is required`);
                }
                if (value <= min) {
                    return Promise.reject(`${fieldName} must be greater than ${min}`);
                }
                if (value > max) {
                    return Promise.reject(`${fieldName} must not exceed ${max.toLocaleString()}`);
                }
                return Promise.resolve();
            }
        }
    ],

    // Currency/Amount validation
    amount: [
        { required: true, message: "Amount is required" },
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

    // Monthly income validation
    monthlyIncome: [
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

    // Purpose/Description validation
    purpose: [
        { required: true, message: "Purpose is required" },
        { min: 10, message: "Purpose must be at least 10 characters" },
        { max: 500, message: "Purpose must not exceed 500 characters" }
    ],

    // Password validation
    password: [
        { required: true, message: "Password is required" },
        { min: 8, message: "Password must be at least 8 characters" },
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: "Password must contain at least one uppercase, one lowercase, and one number"
        }
    ],

    // Required field only
    required: (fieldName: string) => [
        { required: true, message: `${fieldName} is required` }
    ],

    // URL validation
    url: [
        { required: true, message: "URL is required" },
        { type: "url" as const, message: "Please enter a valid URL" }
    ],

    // Date validation
    date: [
        { required: true, message: "Date is required" }
    ],
};

// Helper function to combine multiple validation rules
export const combineRules = (...ruleSets: unknown[]) => {
    return ruleSets.flat();
};

