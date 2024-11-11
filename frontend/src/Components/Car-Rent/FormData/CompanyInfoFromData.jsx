export const CompanyInfoFromData = () => {
  return [
    {
      label: "Company Name",
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      label: "Company Address",
      name: "companyAddress",
      type: "text",
      required: true,
    },
    {
      label: "Company Phone",
      name: "companyPhone",
      type: "text",
      required: true,
    },
    {
      label: "Company Email",
      name: "companyEmail",
      type: "email",
      required: true,
    },
    {
      label: "Company Logo",
      name: "companyLogo",
      type: "file",
      required: true,
    },
  ];
};
