import { useState } from "react";
import PosCard from "../PosCard/PosCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useUserInfo } from "../../../Hooks/useUserInfo";
import { useGetgueastDetailsQuery } from "../../../../Redux/Api/endpoints/booking/hotelBookingApi";
import { format } from "date-fns";

const PosDetails = ({
  hotelData,
  setCalenderDate,
  calenderDate,
  bookedRoomnumbers,
  calendarshow,
}) => {
  const [roomNumber, setRoomNumber] = useState(null);
  const { marchentid } = useUserInfo();
  const { data: GuestData } = useGetgueastDetailsQuery(
    {
      roomnumber: roomNumber,
      hotelId: marchentid,
      date: format(calenderDate, "yyyy-MM-dd"),
    },
    { skip: !roomNumber }
  );

  return (
    <section className={calendarshow ? "flex gap-5" : ""}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 col-span-2">
        {hotelData?.data?.hotelRooms?.map((item, idx) => (
          <PosCard
            key={idx}
            item={item}
            bookedRoomnumbers={bookedRoomnumbers?.bookedroom}
            setRoomNumber={setRoomNumber}
            GuestData={GuestData?.data}
          />
        ))}
      </div>
      <div>
        {calendarshow && (
          <Calendar onChange={setCalenderDate} value={calenderDate} minDate={new Date()} />
        )}
      </div>
    </section>
  );
};

export default PosDetails;
