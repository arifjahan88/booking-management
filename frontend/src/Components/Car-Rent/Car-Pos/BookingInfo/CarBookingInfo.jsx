import { CarbookingFormData } from "./CarbookingFormData";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HeaderText from "../../../Common/HeaderText";
import { useCarRentalBookingMutation } from "../../../../Redux/Api/endpoints/car-rental/carRentalApi";
import { ErrorMessage, SuccessMessageTimer } from "../../../Hooks/Alerthandle";
import { useUserInfo } from "../../../Hooks/useUserInfo";

const CarBookingInfo = ({ carData, setOpenBookingModal, searchValue }) => {
  const [select, setselect] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const CarFormData = CarbookingFormData({ searchValue, carData, setTotalAmount });
  const { marchentid, _id } = useUserInfo();
  //Api
  const [AddCarBooking, { data: CarBookingData, error: CarBookingError }] =
    useCarRentalBookingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (CarBookingData?.success) {
      setOpenBookingModal(false);
      SuccessMessageTimer(CarBookingData?.message);
    }
    if (CarBookingError) {
      setOpenBookingModal(false);
      ErrorMessage(CarBookingError?.data?.message);
    }
  }, [CarBookingData, CarBookingError, setOpenBookingModal]);

  const onCarBookingSubmit = async (data) => {
    const newData = {
      ...data,
      startDate: searchValue?.startDate,
      endDate: searchValue?.endDate,
      carInfo: {
        ...carData,
        hotelId: marchentid,
      },
      totalAmount,
      dueAmount: totalAmount - parseInt(data?.paidAmount),
      isBooked: true,
      bookedBy: _id,
    };
    console.log(newData);
    await AddCarBooking(newData);
  };
  return (
    <form onSubmit={handleSubmit(onCarBookingSubmit)}>
      <HeaderText text="Car Booking Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CarFormData.map((item, index) => {
          return (
            <div key={index}>
              {item?.type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{item?.label}</InputLabel>
                  <Select
                    {...register(item?.name, {
                      required: item?.required && `${item?.label || "This Field"} is Required*`,
                    })}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={select?.[item?.name] || item.defaultValue || ""}
                    label={item?.label}
                    onChange={(e) => {
                      setselect({ ...select, [item?.name]: e.target.value });
                      // setFormValue(item.name, e.target.value);
                    }}
                  >
                    {item?.values?.map((item, idx) => (
                      <MenuItem key={idx} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : item?.type === "date" ? (
                <DatePicker
                  className="w-full"
                  label={item?.label}
                  value={item.value || null}
                  format="PP"
                  readOnly

                  // onChange={(newValue) => {
                  //   setValue({ ...value, [item?.name]: newValue });
                  //   //   setFormValue(item.name, newValue);
                  //   item?.onChange && item?.onChange(newValue);
                  //   field.onChange(newValue);
                  // }}
                />
              ) : (
                <TextField
                  {...register(item?.name, {
                    required: item?.required && `${item?.label || "This Field"} is Required*`,
                  })}
                  className="w-full"
                  id="outlined-basic"
                  type={item.type}
                  label={item?.label}
                  variant="outlined"
                  // onChange={(e) => {
                  //   setFormValue(item.name, e.target.value);
                  //   item?.onChange && item?.onChange(e);
                  // }}
                  defaultValue={item?.defaultValue}
                  InputLabelProps={{ shrink: item?.defaultValue || undefined }}
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
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5 hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CarBookingInfo;
