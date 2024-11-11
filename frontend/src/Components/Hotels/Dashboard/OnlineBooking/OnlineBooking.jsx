import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import DrawerUp from "../../../Common/DrawerUp";
import HeaderText from "../../../Common/HeaderText";
import AddGuest from "./AddGuest";

const OnlineBooking = ({ booking, refetch }) => {
  const [state, setState] = useState({ top: false, item: null });

  const handleAddGuest = (bookingId) => {
    setState({ top: true, item: bookingId });
  };

  return (
    <>
      <MenuItem sx={{ cursor: "default" }}>
        <div className={`flex flex-wrap gap-1 ${booking?.isBooked && "opacity-35"}`}>
          {!booking?.isBooked && (
            <button
              onClick={() => handleAddGuest(booking?._id)}
              className="absolute right-2 top-1 text-xs border bg-red-500 p-1 rounded-sm text-white"
            >
              Add Guest
            </button>
          )}
          <p className="font-semibold text-blue-700 text-xs w-full">Name: {booking?.fullName}</p>
          <p className="font-semibold text-green-700 text-xs">Email: {booking?.email}</p>
          <p className="font-semibold text-orange-700 text-xs">Phone: {booking?.phone}</p>
          <p className="font-semibold text-purple-700 text-xs">Adults: {booking?.adult}</p>
          <p className="font-semibold text-pink-700 text-xs">Children: {booking?.children}</p>
          <p className="font-semibold text-teal-700 text-xs">Rooms: {booking?.room}</p>
          <p className="font-semibold text-indigo-700 text-xs">Check-in: {booking?.startDate}</p>
          <p className="font-semibold text-red-700 text-xs">Check-out: {booking?.endDate}</p>
          <p className="font-semibold text-yellow-700 text-xs">
            Overall Price: {booking?.overallPrice}
          </p>
          <p className="font-semibold text-gray-700 text-xs">
            Previous Price: {booking?.previousPrice}
          </p>
          <p className="font-semibold text-green-700 text-xs">Discount: {booking?.discount}</p>
        </div>
      </MenuItem>
      <DrawerUp setState={setState} state={state}>
        <div className="container mx-auto p-3">
          <HeaderText text="Available Room Number" />
          <>
            <AddGuest booking={booking} setState={setState} refetch={refetch} />
          </>
        </div>
      </DrawerUp>
    </>
  );
};

export default OnlineBooking;
