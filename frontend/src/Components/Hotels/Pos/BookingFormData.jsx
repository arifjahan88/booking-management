/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from "react";
import { useUserInfo } from "../../Hooks/useUserInfo";
import {
  useGetAllCustomerPhoneQuery,
  useGetCustomerbyphoneQuery,
} from "../../../Redux/Api/endpoints/booking/hotelBookingApi";

export const bookingsFormData = ({
  roomData,
  roomname: getRoomName,
  getroomNumber,
  setTotalAmount,
  activeButton,
}) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [phone, setPhone] = useState(null);
  const { marchentid } = useUserInfo();

  //Api
  const { data: allphonenumber } = useGetAllCustomerPhoneQuery(marchentid, {
    skip: activeButton !== "old",
  });

  const { data: guestInfo } = useGetCustomerbyphoneQuery(
    { hotelid: marchentid, phone },
    {
      skip: !phone,
    }
  );

  const getTotalDays = useCallback(() => {
    if (!checkInDate || !checkOutDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((checkInDate - checkOutDate) / oneDay));

    return diffDays;
  }, [checkInDate, checkOutDate]);

  const roomCost = getRoomName?.reduce((totalCost, roomName) => {
    const roomDetails = roomData?.find((room) => room.roomName === roomName);
    if (roomDetails) {
      const selectedRoomNumbers = roomDetails.roomnumber.filter((roomNumber) =>
        getroomNumber.includes(roomNumber)
      );
      const roomCost = selectedRoomNumbers.length * roomDetails.roomPrice;
      totalCost += roomCost;
    }
    return totalCost;
  }, 0);

  useEffect(() => {
    setTotalAmount(roomCost * getTotalDays());
  }, [setTotalAmount, roomCost, getTotalDays]);

  return [
    {
      label: "Guest Name",
      type: "text",
      name: "guestName",
      required: true,
      defaultValue: guestInfo?.data?.guestName,
    },
    {
      label: "Guest Phone Number",
      type: "number",
      name: "guestNumber",
      required: true,
      onChange: (e) => setPhone(e.target.innerText),
      values: allphonenumber?.data,
      defaultValue: guestInfo?.data?.guestNumber,
    },
    {
      label: "Guest Address",
      type: "text",
      name: "address",
      required: false,
      defaultValue: guestInfo?.data?.address,
    },
    {
      label: "Select Authentication Type",
      type: "select",
      name: "authType",
      required: false,
      values: ["NID", "Passport", "Driving License"],
      defaultValue: guestInfo?.data?.authType,
    },
    {
      label: "Authentication Number",
      type: "text",
      name: "authNumber",
      required: false,
      defaultValue: guestInfo?.data?.authNumber,
    },

    {
      label: "Guest Email",
      type: "email",
      name: "guestEmail",
      required: true,
      defaultValue: guestInfo?.data?.guestEmail,
    },
    {
      label: "Birth Date",
      type: "date",
      name: "birthDate",
      required: false,
    },
    {
      label: "Marriage Date",
      type: "date",
      name: "marriageDate",
      required: false,
    },
    {
      label: "Check In",
      type: "date",
      name: "checkInDate",
      required: true,
      onChange: (data) => setCheckInDate(new Date(data)),
    },
    {
      label: "Check Out",
      type: "date",
      name: "checkOutDate",
      required: true,
      onChange: (data) => setCheckOutDate(new Date(data)),
    },
    {
      label: "Room Name",
      type: "text",
      name: "roomName",
    },
    {
      label: "Room Number",
      type: "number",
      name: "roomNumber",
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
      label: `Payment Amount (${roomCost * getTotalDays()} taka)`,
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
