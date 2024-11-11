export const CarInfoFormData = () => {
  return [
    {
      label: "Car Name",
      name: "carName",
      type: "text",
      required: true,
    },
    {
      label: "Car Model",
      name: "carModel",
      type: "text",
      required: true,
    },
    {
      label: "Car Type",
      name: "carType",
      type: "text",
      required: true,
    },
    {
      label: "Car Number",
      name: "carNumber",
      type: "text",
      required: true,
    },

    {
      label: "Car Price",
      name: "carPrice",
      type: "text",
      required: true,
    },
    {
      label: "Car Fitness expire Date",
      name: "carFitnessExpireDate",
      type: "text",
      required: true,
    },
    {
      label: "Car Image",
      name: "carImage",
      type: "file",
      required: true,
    },
  ];
};
