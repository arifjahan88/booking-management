import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserInfo } from "../../../Hooks/useUserInfo";
import { useAddHotelBookingMutation } from "../../../../Redux/Api/endpoints/booking/hotelBookingApi";
import { ErrorMessage, SuccessMessageTimer } from "../../../Hooks/Alerthandle";

const GetAdditionalInfo = ({
  booking,
  SelectRoomNumbers,
  HotelRooms,
  setState,
  refetch,
  bookedroomFetch,
}) => {
  const [select, setselect] = useState({});
  const { _id } = useUserInfo();
  //Api
  const [addBooking, { data, error }] = useAddHotelBookingMutation();

  useEffect(() => {
    if (data?.success) {
      SuccessMessageTimer(data?.message);
      refetch();
      bookedroomFetch();
    }
    if (error) ErrorMessage(error?.data?.message);
  }, [data, error, refetch, bookedroomFetch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //calvulat total room cost
  const CalculateTotalAmount = useCallback(() => {
    if (!booking?.startDate || !booking?.endDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((new Date(booking?.startDate) - new Date(booking?.endDate)) / oneDay)
    );
    const roomCost = booking?.roomName?.reduce((totalCost, roomName) => {
      const roomDetails = HotelRooms?.find((room) => room.roomName === roomName);
      if (roomDetails) {
        const selectedRoomNumbers = roomDetails?.roomNumber?.filter((roomNumber) =>
          SelectRoomNumbers?.includes(roomNumber)
        );
        const TotalCost =
          SelectRoomNumbers?.length > 0 &&
          selectedRoomNumbers?.length *
            (roomDetails?.offerPrice ? roomDetails?.offerPrice : roomDetails?.roomPrice);
        totalCost += TotalCost;
      }
      return totalCost;
    }, 0);

    return diffDays * roomCost;
  }, [SelectRoomNumbers, HotelRooms, booking]);

  //form data
  const FormData = [
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
      label: `Payment Amount (${CalculateTotalAmount()} taka)`,
      type: "number",
      name: "paidAmount",
      required: true,
    },
  ];

  const onGuestSubmit = async (data) => {
    const sendData = {
      guestName: booking?.fullName,
      hotelId: booking?.hotelInfo?._id,
      address: "",
      authType: "",
      authNumber: "",
      guestEmail: booking?.email,
      guestNumber: booking?.phone,
      roomName: booking?.roomName,
      roomNumber: SelectRoomNumbers,
      checkInDate: new Date(booking?.startDate),
      checkOutDate: new Date(booking?.endDate),
      isCounter: false,
      bookedBy: _id,
      ...data,
      totalAmount: CalculateTotalAmount(),
      paidAmount: parseInt(data?.paidAmount),
      isBooked: true,
      onlinebookingId: booking?._id,
      guestReq: booking?.guestReq,
    };
    await addBooking(sendData);
    setState({ top: false });
  };
  return (
    <form onSubmit={handleSubmit(onGuestSubmit)}>
      <div className="grid grid-cols-3 gap-5">
        {FormData?.map((item) => {
          return (
            <div key={item?.name}>
              {item.type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    {item?.label}
                  </InputLabel>
                  <Select
                    {...register(item?.name, {
                      required: item?.required && `${item?.label || "This Field"} is Required*`,
                    })}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    value={select?.[item?.name] || ""}
                    label={item?.label}
                    onChange={(e) => {
                      setselect({ ...select, [item?.name]: e.target.value });
                    }}
                  >
                    {item?.values?.map((item, idx) => (
                      <MenuItem key={idx} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  {...register(item?.name, {
                    required: item?.required && `${item?.label || "This Field"} is Required*`,
                  })}
                  className="w-full"
                  size="small"
                  id="outlined-basic"
                  type={item.type}
                  label={item?.label}
                  variant="outlined"
                />
              )}
              {errors[item.name] && (
                <span className="text-red-500 text-xs">{errors[item.name].message}</span>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        Add Guest
      </button>
    </form>
  );
};

export default GetAdditionalInfo;
