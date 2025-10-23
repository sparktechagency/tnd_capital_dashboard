const getActiveKeys = (normalizedPath: string): string[] => {
  if (normalizedPath.includes("/privacy-policy")) {
    return ["privacy-policy"];
  }
  if (normalizedPath.includes("/add-feedback")) {
    return ["add-feedback"];
  }
  if (normalizedPath.includes("/show-feedback")) {
    return ["show-feedback"];
  }
  if (normalizedPath.includes("/terms-and-condition")) {
    return ["terms-and-condition"];
  }
  if (normalizedPath.includes("/lead-information")) {
    return ["leads"];
  }
  if (normalizedPath.includes("/edit-lead-information")) {
    return ["leads"];
  }
  if (normalizedPath.includes("/officer-information")) {
    return ["field-officers"];
  }
  if (normalizedPath.includes("/edit-officer-information")) {
    return ["field-officers"];
  }
  if (normalizedPath.includes("/manager-information")) {
    return ["managers"];
  }
  if (normalizedPath.includes("/edit-manager-information")) {
    return ["managers"];
  }
  if (normalizedPath.includes("/add-hr-information")) {
    return ["hr"];
  }
  if (normalizedPath.includes("/edit-hr-information")) {
    return ["hr"];
  }
  if (normalizedPath.includes("/add-repayments")) {
    return ["repayments"];
  }
  if (normalizedPath.includes("/edit-repayments-information")) {
    return ["repayments"];
  }
  if (normalizedPath.includes("/profile")) {
    return ["settings"];
  }
  if (normalizedPath.includes("/edit-profile")) {
    return ["settings"];
  }
  if (normalizedPath.includes("/support")) {
    return ["settings"];
  }
  if (normalizedPath.includes("/edit-officers")) {
    return ["officers"];
  }
  if (normalizedPath.includes("/add-officers")) {
    return ["officers"];
  }
  if (normalizedPath.includes("/add-manager")) {
    return ["managers"];
  }
  if (normalizedPath.includes("/edit-manager")) {
    return ["managers"];
  }
  if (normalizedPath.includes("/all-applications")) {
    return ["applications"];
  }
  if (normalizedPath.includes("/all-application-requests")) {
    return ["applications"];
  }
  if (normalizedPath.includes("/all-field-officer-requests")) {
    return ["fieldOfficer"];
  }
  if (normalizedPath.includes("/all-field-officers")) {
    return ["fieldOfficer"];
  }
  if (normalizedPath.includes("/add-new-leads")) {
    return ["new-leads"];
  }
  if (normalizedPath.includes("/edit-new-leads")) {
    return ["new-leads"];
  }
  if (normalizedPath.includes("/loan-apply")) {
    return ["applications"];
  }
  if (normalizedPath.includes("/edit-loan-apply")) {
    return ["applications"];
  }
  if (normalizedPath.includes("/monthly-repayment")) {
    return ["repayments"];
  }
  if (normalizedPath.includes("/add-supervisor")) {
    return ["supervisory"];
  }
  if (normalizedPath.includes("/edit-supervisor-information")) {
    return ["supervisory"];
  }
  if (normalizedPath.includes("/edit-supervisor")) {
    return ["supervisory"];
  }
  if (normalizedPath.includes("/add-location")) {
    return ["location"];
  }
  if (normalizedPath.includes("/edit-location")) {
    return ["location"];
  }
  if (normalizedPath.includes("/two-factor-authentication")) {
    return ["settings"];
  }

  return [normalizedPath.split("/").pop() || ""]; // Default fallback, ensuring a non-null value is returned
};

export default getActiveKeys;
