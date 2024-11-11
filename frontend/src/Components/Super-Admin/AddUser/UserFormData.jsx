import { useGetAllUsersCompanyNameQuery } from "../../../Redux/Api/endpoints/userApi";

export const UserFormData = () => {
  const { data: AllMarchent } = useGetAllUsersCompanyNameQuery();

  return [
    {
      label: "Select Marchent",
      name: "marchentid",
      type: "select",
      required: true,
      values: AllMarchent?.data?.map((item) => item) || [],
    },
    {
      label: "Marchent User Name",
      name: "username",
      type: "text",
      required: true,
    },
    {
      label: "Marchent Full Name",
      name: "fullname",
      type: "text",
      required: true,
    },
    {
      label: "Marchent phone number",
      name: "phone",
      type: "number",
      required: true,
    },
    {
      label: "Marchent email",
      name: "email",
      type: "email",
      required: true,
    },
    {
      label: "Marchent role",
      name: "role",
      type: "select",
      required: true,
      values: ["hotelmarchent", "rentalmarchent"],
    },
    {
      label: "password",
      name: "password",
      type: "text",
      required: true,
    },
  ];
};
