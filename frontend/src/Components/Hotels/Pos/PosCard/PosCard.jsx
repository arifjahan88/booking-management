import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100%",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const PosCard = ({ item, bookedRoomnumbers, setRoomNumber, GuestData }) => {
  const toorpitData = (
    <>
      {GuestData?.map((guest, index) => (
        <div key={index} className="text-xl w-full">
          <p>Guest Name: {guest.guestName}</p>
          <p>Guest Phone: {guest.guestNumber}</p>
          <p>Guest Email: {guest.guestEmail}</p>
          <p>Total Amount: {guest?.totalAmount}</p>
          <p>paid Amount: {guest?.paidAmount}</p>
          <p>Due Amount: {guest?.totalAmount - guest?.paidAmount}</p>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <div className="p-5 space-y-1 border-2 border-blue-400 border-opacity-30 rounded-xl">
        <h1 className="text-xl font-semibold text-teal-700 capitalize">{item.roomName}</h1>
        <div className="text-xs text-gray-500">
          <p>BedType: {item.roomType}</p>
          <p>Price: {item.roomPrice} TK</p>
        </div>
        <div className="flex gap-2">
          {item?.roomnumber?.map((room, index) => {
            const isRoomBooked = bookedRoomnumbers?.includes(room);
            const buttonClasses = `inline-flex p-2 rounded-md capitalize duration-300 hover:-translate-y-1 text-xl font-semibold ${
              isRoomBooked ? "bg-red-200 cursor-pointer" : "bg-green-200 cursor-default"
            }`;
            return (
              <div key={index}>
                <HtmlTooltip title={isRoomBooked && toorpitData}>
                  <div>
                    <button
                      className={buttonClasses}
                      disabled={!isRoomBooked}
                      onMouseOver={() => {
                        isRoomBooked && setRoomNumber(room);
                      }}
                    >
                      {room}
                    </button>
                  </div>
                </HtmlTooltip>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PosCard;
