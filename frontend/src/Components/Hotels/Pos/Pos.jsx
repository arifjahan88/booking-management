/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import PosDetails from "./PosDetails/PosDetails";
import {
  useGetAllHotelNameQuery,
  useGetHotelbyIdQuery,
} from "../../../Redux/Api/endpoints/hotelApi";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import BookingModal from "./BookingModal";
import { useUserInfo } from "../../Hooks/useUserInfo";
import { format } from "date-fns";
import { useGetBookedRoomNumbersQuery } from "../../../Redux/Api/endpoints/booking/hotelBookingApi";
import PageLoader from "../../Loader/Loader";

const Pos = () => {
  const { role, marchentid } = useUserInfo();
  const [calendarshow, setCalendarShow] = useState(false);
  const [calenderDate, setCalenderDate] = useState(new Date());
  const formatDate = format(calenderDate, "yyyy-MM-dd");
  const [open, setOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(marchentid || null);
  // Api
  const { data: allHotelName } = role === "admin" ? useGetAllHotelNameQuery() : { data: [] };
  const { data: hotelData, isLoading: posthotelLoading } = useGetHotelbyIdQuery(
    selectedHotelId || marchentid
  );

  const { data: bookedRoomnumbers, isFetching } = useGetBookedRoomNumbersQuery({
    marchentid: marchentid || selectedHotelId,
    formatDate,
  });

  const handleChange = async (event) => {
    setSelectedHotelId(event.target.value);
  };

  return (
    <div>
      {role === "admin" && (
        <div className="flex justify-center items-center">
          <FormControl variant="outlined" className="w-1/3">
            <InputLabel id="demo-simple-select-outlined-label">Select Hotel</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedHotelId}
              onChange={handleChange}
              label="Select Hotel"
            >
              {allHotelName?.data?.map((hotel) => (
                <MenuItem key={hotel._id} value={hotel._id}>
                  {hotel.hotelName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {(selectedHotelId || marchentid) && (
        <>
          <div className="flex flex-col items-center my-3">
            <h2 className="text-xl font-semibold tracking-wide my-2">
              Available Rooms for{" "}
              <span className="text-red-500">{format(new Date(calenderDate), "yyyy-dd-MM")}</span>{" "}
            </h2>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                <span className="mx-1">Book Room</span>
                <FaArrowRight />
              </button>
              <button
                onClick={() => setCalendarShow(!calendarshow)}
                className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-lg hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
              >
                <span className="mx-1">Calender</span>
              </button>
            </div>
          </div>
          <div>
            {posthotelLoading || isFetching ? (
              <PageLoader />
            ) : (
              <PosDetails
                setCalenderDate={setCalenderDate}
                calenderDate={calenderDate}
                hotelData={hotelData}
                bookedRoomnumbers={bookedRoomnumbers}
                setCalendarShow={setCalendarShow}
                calendarshow={calendarshow}
              />
            )}
          </div>
        </>
      )}
      {open && (
        <BookingModal
          roomData={hotelData?.data?.hotelRooms}
          calenderDate={formatDate}
          setOpen={setOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default Pos;
