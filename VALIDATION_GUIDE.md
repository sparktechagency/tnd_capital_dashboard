# Form Validation Guide

This guide explains the comprehensive form validation system implemented in the TND Kapital CRM application.

## Overview

The application uses **Ant Design Form** validation rules to ensure data integrity across all forms. Validations are centralized in `/src/utils/formValidations.ts` for consistency and reusability.

## Available Validation Rules

### 1. Email Validation

```typescript
validationRules.email;
```

**Rules:**

- Required field
- Must be a valid email format
- Pattern: `example@domain.com`

**Usage:**

```typescript
{
  name: "email",
  inputType: "email",
  label: "Email",
  rules: validationRules.email
}
```

---

### 2. Phone Number Validation

```typescript
validationRules.phoneNumber;
```

**Rules:**

- Required field
- Must be 8-15 digits
- Supports international format with `+` prefix
- Pattern: `+96512345678` or `12345678`

**Usage:**

```typescript
{
  name: "phoneNumber",
  inputType: "text",
  label: "Phone Number",
  rules: validationRules.phoneNumber
}
```

---

### 3. Full Name Validation

```typescript
validationRules.fullName;
```

**Rules:**

- Required field
- Minimum 2 characters
- Maximum 100 characters
- Only letters and spaces allowed

**Usage:**

```typescript
{
  name: "name",
  inputType: "text",
  label: "Full Name",
  rules: validationRules.fullName
}
```

---

### 4. NID (National ID) Validation

```typescript
validationRules.nid;
```

**Rules:**

- Required field
- Must be 8-20 digits
- Only numbers allowed

**Usage:**

```typescript
{
  name: "nid",
  inputType: "text",
  label: "NID",
  rules: validationRules.nid
}
```

---

### 5. Address Validation

```typescript
validationRules.address;
```

**Rules:**

- Required field
- Minimum 10 characters
- Maximum 200 characters

**Usage:**

```typescript
{
  name: "homeAddress",
  inputType: "text",
  label: "Home Address",
  rules: validationRules.address
}
```

---

### 6. Amount Validation

```typescript
validationRules.amount;
```

**Rules:**

- Required field
- Must be greater than 0
- Maximum 1,000,000,000

**Usage:**

```typescript
{
  name: "loanAmountRequested",
  inputType: "number",
  label: "Amount Requested",
  rules: validationRules.amount
}
```

---

### 7. Monthly Income Validation

```typescript
validationRules.monthlyIncome;
```

**Rules:**

- Required field
- Must be greater than 0
- Maximum 100,000,000

**Usage:**

```typescript
{
  name: "monthlyIncome",
  inputType: "number",
  label: "Monthly Income",
  rules: validationRules.monthlyIncome
}
```

---

### 8. Purpose/Description Validation

```typescript
validationRules.purpose;
```

**Rules:**

- Required field
- Minimum 10 characters
- Maximum 500 characters

**Usage:**

```typescript
{
  name: "purposeOfFinancing",
  inputType: "text",
  label: "Purpose of Request",
  rules: validationRules.purpose
}
```

---

### 9. Custom Text Validation

```typescript
validationRules.text(fieldName, minLength?, maxLength?)
```

**Parameters:**

- `fieldName`: Name of the field for error messages
- `minLength`: Minimum characters (default: 3)
- `maxLength`: Maximum characters (default: 100)

**Usage:**

```typescript
{
  name: "leadUid",
  inputType: "text",
  label: "Lead ID",
  rules: validationRules.text("Lead ID", 3, 50)
}
```

---

### 10. Custom Number Range Validation

```typescript
validationRules.numberRange(fieldName, min?, max?)
```

**Parameters:**

- `fieldName`: Name of the field for error messages
- `min`: Minimum value (default: 0)
- `max`: Maximum value (default: 1,000,000,000)

**Usage:**

```typescript
{
  name: "age",
  inputType: "number",
  label: "Age",
  rules: validationRules.numberRange("Age", 18, 100)
}
```

---

### 11. Password Validation

```typescript
validationRules.password;
```

**Rules:**

- Required field
- Minimum 8 characters
- Must contain: uppercase, lowercase, and number

**Usage:**

```typescript
{
  name: "password",
  inputType: "password",
  label: "Password",
  rules: validationRules.password
}
```

---

### 12. Required Field Only

```typescript
validationRules.required(fieldName);
```

**Usage:**

```typescript
{
  name: "status",
  label: "Status",
  rules: validationRules.required("Status")
}
```

---

### 13. URL Validation

```typescript
validationRules.url;
```

**Rules:**

- Required field
- Must be a valid URL format

---

### 14. Date Validation

```typescript
validationRules.date;
```

**Rules:**

- Required field

---

## Implementation Examples

### Example 1: Loan Application Form (Already Implemented)

```typescript
// In src/pages/FieldOfficer/utils.ts

export const getInput = (applicantStatus: string) => {
  const inputStructure = [
    ...(applicantStatus === "New"
      ? [
          {
            name: "name",
            inputType: "text",
            placeholder: "Full Name",
            label: "Full Name",
            rules: validationRules.fullName,
          },
          {
            name: "email",
            inputType: "email",
            label: "Email",
            placeholder: "Email",
            rules: validationRules.email,
          },
          {
            name: "phoneNumber",
            inputType: "text",
            label: "Phone Number",
            placeholder: "Phone Number",
            rules: validationRules.phoneNumber,
          },
          {
            name: "homeAddress",
            inputType: "text",
            label: "Home Address",
            placeholder: "Home Address",
            rules: validationRules.address,
          },
          {
            name: "nid",
            inputType: "text",
            label: "NID",
            placeholder: "NID Number",
            rules: validationRules.nid,
          },
        ]
      : []),

    {
      name: "purposeOfFinancing",
      inputType: "text",
      label: "Purpose of Request",
      placeholder: "Type purpose of request",
      rules: validationRules.purpose,
    },
    {
      name: "loanAmountRequested",
      inputType: "number",
      label: "Amount Requested",
      placeholder: "Type Amount",
      rules: validationRules.amount,
    },
    {
      name: "monthlyIncome",
      inputType: "number",
      label: "Monthly Income",
      placeholder: "Type income",
      rules: validationRules.monthlyIncome,
    },
  ];

  return inputStructure;
};
```

---

## Currently Validated Forms

✅ **Field Officer - Loan Application** (`src/pages/FieldOfficer/utils.ts`)

- Email validation
- Phone number validation
- Full name validation
- NID validation
- Address validation
- Amount requested validation
- Monthly income validation
- Purpose validation
- Location validation

✅ **Field Officer - New Leads** (`src/pages/FieldOfficer/FieldOfficerEditNewLeads.tsx`)

- Email validation
- Phone number validation
- Full name validation
- Address validation

---

## Benefits of This Validation System

1. **Consistency**: Same validation rules across the entire application
2. **Reusability**: Import and use validation rules anywhere
3. **Maintainability**: Update validation rules in one place
4. **Type Safety**: TypeScript support with proper types
5. **User Experience**: Clear, helpful error messages
6. **Data Integrity**: Ensures clean, valid data enters the database

---

## Best Practices

1. **Always use centralized validations** instead of writing custom rules in each form
2. **Import validation rules** at the top of your file:
   ```typescript
   import { validationRules } from "../../utils/formValidations";
   ```
3. **For custom validations**, extend the `validationRules` object
4. **Test validation rules** thoroughly with edge cases
5. **Provide clear error messages** that help users understand what's required

---

## Error Messages

All validation rules provide user-friendly error messages:

- ✅ "Email is required"
- ✅ "Please enter a valid email address"
- ✅ "Phone number must be at least 8 digits"
- ✅ "Amount must be greater than 0"
- ✅ "Name can only contain letters and spaces"
- ✅ "NID must be 8-20 digits"

---

## Future Enhancements

Consider adding:

- Credit card validation
- IBAN validation
- Tax ID validation
- Passport number validation
- Custom business-specific validations

---

## Support

For questions or issues with form validation, please contact the development team.

Last Updated: October 23, 2025
