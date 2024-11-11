import { useForm, Controller } from "react-hook-form";
import HeaderText from "../../Common/HeaderText";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useEffect, useState, useCallback } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { bookingsFormData } from "./BookingFormData";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  useAddHotelBookingMutation,
  useGetavailableroomnumbersQuery,
} from "../../../Redux/Api/endpoints/booking/hotelBookingApi";
import { useUserInfo } from "../../Hooks/useUserInfo";
import { ErrorMessage, SuccessMessageTimer } from "../../Hooks/Alerthandle";

const BookingModal = ({ roomData, calenderDate, setOpen, open }) => {
  const [roomname, setRoomName] = useState([]);
  const [selectedRoomName, setSelectedRoomName] = useState(null);
  const [getroomNumber, setgetroomNumber] = useState([]);
  const [select, setselect] = useState({});
  const [value, setValue] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [addHotelBooking, { data: AddBookingData, error }] = useAddHotelBookingMutation();
  const { marchentid, _id } = useUserInfo();
  const { data: roomnumberData } = useGetavailableroomnumbersQuery({
    id: marchentid,
    date: calenderDate,
    roomName: selectedRoomName,
  });
  const [activeButton, setActiveButton] = useState("new");

  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: bookingsFormData({
      roomData,
      roomname,
      getroomNumber,
      setTotalAmount,
      activeButton,
    }).reduce((acc, curr) => {
      acc[curr.name] = curr.defaultValue || "";
      return acc;
    }, {}),
  });

  useEffect(() => {
    if (AddBookingData?.success) {
      setOpen(false);
      setTimeout(() => {
        SuccessMessageTimer(AddBookingData?.message);
      }, 400);
    }
    if (error) ErrorMessage(error?.AddBookingData?.message);
  }, [AddBookingData, error, setOpen]);

  const onBookingSubmit = async (data) => {
    const newData = {
      ...data,
      roomName: roomname,
      roomNumber: getroomNumber,
      totalAmount,
      hotelId: marchentid,
      bookedBy: _id,
    };
    await addHotelBooking(newData);
    // console.log(newData);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="relative rounded-xl w-2/3 mx-auto h-screen flex justify-center items-center">
          <div className="bg-white overflow-auto h-2/3 w-full p-3 rounded-lg">
            <button onClick={() => setOpen(false)} className="absolute right-8 z-10">
              <span className="rounded-full w-7 h-7 bg-red-400 text-white font-bold flex justify-center items-center hover:bg-red-500 duration-300">
                X
              </span>
            </button>
            <div className="flex justify-center items-center gap-2">
              <button
                className={`inline-block rounded border border-teal-600 px-5 py-1 text-sm font-medium focus:outline-none active:text-teal-500 duration-500 ${
                  activeButton === "new" ? "bg-teal-600 text-white" : "bg-transparent text-teal-600"
                }`}
                onClick={() => handleButtonClick("new")}
              >
                New
              </button>
              <button
                className={`inline-block rounded border border-teal-600 px-5 py-1 text-sm font-medium focus:outline-none active:text-teal-500 duration-500 ${
                  activeButton === "old" ? "bg-teal-600 text-white" : "bg-transparent text-teal-600"
                }`}
                onClick={() => handleButtonClick("old")}
              >
                Old
              </button>
            </div>
            <form onSubmit={handleSubmit(onBookingSubmit)}>
              <HeaderText text="Booking Form" />
              <div className="grid grid-cols-2 gap-3">
                {bookingsFormData({
                  roomData,
                  roomname,
                  getroomNumber,
                  setTotalAmount,
                  activeButton,
                })?.map((item) => {
                  if (item?.defaultValue) {
                    setFormValue(item?.name, item?.defaultValue);
                  }
                  return (
                    <div key={item.name}>
                      {item.name === "roomName" ? (
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={roomData || []}
                          getOptionLabel={(option) => option?.roomName}
                          filterSelectedOptions
                          onChange={(e, value) => {
                            setSelectedRoomName(e.target.innerText);
                            setRoomName(value.map((item) => item.roomName));
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select Room" placeholder="Room Name" />
                          )}
                          renderTags={(value) => {
                            return value.map((option, index) => (
                              <Chip
                                style={{ margin: "0px 2px" }}
                                key={index}
                                label={option.roomName}
                              />
                            ));
                          }}
                        />
                      ) : item.name === "roomNumber" ? (
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={roomnumberData?.data || []}
                          getOptionLabel={(option) => option}
                          onChange={(e, value) => setgetroomNumber(value)}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Room Number"
                              placeholder="Room Number"
                            />
                          )}
                        />
                      ) : item?.type === "select" ? (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">{item?.label}</InputLabel>
                          <Select
                            {...register(item?.name, {
                              required:
                                item?.required && `${item?.label || "This Field"} is Required*`,
                            })}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={select?.[item?.name] || item.defaultValue || ""}
                            label={item?.label}
                            onChange={(e) => {
                              setselect({ ...select, [item?.name]: e.target.value });
                              setFormValue(item.name, e.target.value);
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
                        <Controller
                          name={item?.name}
                          control={control}
                          rules={{
                            required:
                              item?.required && `${item?.label || "This Field"} is Required*`,
                          }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              className="w-full"
                              label={item?.label}
                              value={value?.[item?.name] || item.defaultValue || null}
                              onChange={(newValue) => {
                                setValue({ ...value, [item?.name]: newValue });
                                setFormValue(item.name, newValue);
                                item?.onChange && item?.onChange(newValue);
                                field.onChange(newValue);
                              }}
                            />
                          )}
                        />
                      ) : item?.name === "guestNumber" ? (
                        activeButton === "new" ? (
                          <TextField
                            {...register(item?.name, {
                              required:
                                item?.required && `${item?.label || "This Field"} is Required*`,
                            })}
                            className="w-full"
                            id="outlined-basic"
                            type={item.type}
                            label={item.label}
                            variant="outlined"
                            onChange={(e) => {
                              setFormValue(item.name, e.target.value);
                              item?.onChange && item?.onChange(e);
                            }}
                            defaultValue={item.defaultValue || ""}
                          />
                        ) : (
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={item?.values}
                            renderInput={(params) => <TextField {...params} label="Phone Number" />}
                            onChange={(e, value) => {
                              setFormValue(item.name, value);
                              item?.onChange && item?.onChange(e);
                            }}
                          />
                        )
                      ) : (
                        <TextField
                          {...register(item?.name, {
                            required:
                              item?.required && `${item?.label || "This Field"} is Required*`,
                          })}
                          className="w-full"
                          id="outlined-basic"
                          type={item.type}
                          label={item?.label}
                          variant="outlined"
                          onChange={(e) => {
                            setFormValue(item.name, e.target.value);
                            item?.onChange && item?.onChange(e);
                          }}
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
                className="bg-blue-600 text-white font-semibold tracking-wide py-2 px-4 rounded-lg mt-5"
              >
                Book Now
                {/* {isLoading ? "Loading..." : "Book Now"} */}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default BookingModal;
