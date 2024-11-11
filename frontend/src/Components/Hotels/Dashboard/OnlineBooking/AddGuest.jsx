import { useState } from "react";
import { useGetOnlineRoomNumbersQuery } from "../../../../Redux/Api/endpoints/booking/onlineBookingApi";
import GetAdditionalInfo from "./GetAdditionalInfo";

const AddGuest = ({ booking, setState, refetch }) => {
  const [SelectRoomNumbers, setSelectRoomNumbers] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  //Api
  const roomNamesjoin = booking?.roomName?.join(",");
  const {
    data: BookedRoomNumber,
    isLoading: OnlineBookedLoading,
    refetch: bookedroomFetch,
  } = useGetOnlineRoomNumbersQuery(
    {
      hotelid: booking?.hotelInfo?._id,
      roomNames: roomNamesjoin,
    },
    {
      skip: false,
    }
  );

  const selectRooms = (room) => {
    if (SelectRoomNumbers.includes(room)) {
      setSelectRoomNumbers(SelectRoomNumbers.filter((r) => r !== room));
    } else {
      setSelectRoomNumbers([...SelectRoomNumbers, room]);
    }
  };

  return (
    <>
      {OnlineBookedLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {BookedRoomNumber?.data?.map((room) => (
            <button
              key={room}
              className={`p-4 rounded-md font-semibold ${
                SelectRoomNumbers.includes(room)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => selectRooms(room)}
            >
              {room}
            </button>
          ))}
          {BookedRoomNumber?.data?.length === 0 && <p>No Room Number Available on {today}</p>}
        </div>
      )}
      <p className="mt-4 font-bold">
        {SelectRoomNumbers.length > 0
          ? `Selected Rooms: ${SelectRoomNumbers.join(", ")}`
          : "Select Room Number First"}
      </p>
      <>
        {SelectRoomNumbers.length > 0 && (
          <GetAdditionalInfo
            refetch={refetch}
            bookedroomFetch={bookedroomFetch}
            setState={setState}
            booking={booking}
            SelectRoomNumbers={SelectRoomNumbers}
            HotelRooms={BookedRoomNumber?.HotelRooms}
          />
        )}
      </>
    </>
  );
};

export default AddGuest;
