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

  return [normalizedPath.split("/").pop() || ""]; // Default fallback, ensuring a non-null value is returned
};

export default getActiveKeys;
