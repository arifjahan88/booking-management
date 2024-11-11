import { useCallback, useEffect } from "react";

export const CarbookingFormData = ({ searchValue: dates, carData, setTotalAmount }) => {
  const { startDate, endDate } = dates;

  const getTotalDays = useCallback(() => {
    if (!startDate || !endDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

    return diffDays;
  }, [startDate, endDate]);

  useEffect(() => {
    setTotalAmount(parseInt(carData?.carPrice) * getTotalDays());
  }, [getTotalDays, setTotalAmount, carData?.carPrice]);

  return [
    {
      label: "Guest Name",
      type: "text",
      name: "guestName",
      required: true,
    },
    {
      label: "Guest Phone Number",
      type: "number",
      name: "guestNumber",
      required: true,
    },
    {
      label: "Guest Address",
      type: "text",
      name: "address",
      required: false,
    },
    {
      label: "Select Authentication Type",
      type: "select",
      name: "authType",
      required: false,
      values: ["NID", "Passport", "Driving License"],
    },
    {
      label: "Authentication Number",
      type: "text",
      name: "authNumber",
      required: false,
    },
    {
      label: "Guest Email",
      type: "email",
      name: "guestEmail",
      required: true,
    },

    {
      label: "Start Date",
      type: "date",
      name: "startDate",
      value: startDate,
    },
    {
      label: "End Date",
      type: "date",
      name: "endDate",
      value: endDate,
    },

    {
      label: "Payment Method",
      type: "select",
      name: "paymentMethod",
      values: ["Cash", "Card", "Bank Transfer"],
      required: true,
    },
    {
      label: "If not cash, provide Transaction ID",
      type: "text",
      name: "transactionid",
    },
    {
      label: `Payment Amount (${parseInt(carData?.carPrice) * getTotalDays()} taka)`,
      type: "number",
      name: "paidAmount",
      required: true,
    },
    {
      label: "Booking Reference",
      type: "text",
      name: "bookingReference",
    },
  ];
};
