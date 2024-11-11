export const PaymentFormData = ({ modaldata, setpayment }) => {
  return [
    {
      id: 2,
      label: "Customer Name",
      type: "text",
      placeholder: "Customer Name",
      name: "customerName",
      value: modaldata?.guestName,
    },
    {
      id: 3,
      label: "Customer Phone Number",
      type: "number",
      placeholder: "Customer Phone Number",
      name: "customerNumber",
      value: modaldata?.guestNumber,
    },
    {
      id: 4,
      label: "Customer NID",
      type: "number",
      placeholder: "Customer NID",
      name: "customerNid",
      value: modaldata?.customerNid,
    },

    {
      id: 9,
      label: "Payment Method",
      placeholder: "Payment Method",
      name: "paymentmethod",
      values: ["Cash", "Check", "Mobile Banking"],
      onchange: (e) => setpayment(e.target.value),
    },

    {
      id: 10,
      label: "Paid Amount",
      type: "number",
      placeholder: `Paid Amount (${modaldata?.totalAmount - modaldata?.paidAmount})`,
      name: "paidAmount",
    },
  ];
};
