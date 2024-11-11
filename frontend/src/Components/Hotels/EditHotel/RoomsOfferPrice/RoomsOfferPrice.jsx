import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRoomOfferPriceMutation } from "../../../../Redux/Api/endpoints/hotelApi";
import { ErrorMessage, SuccessMessage } from "../../../Hooks/Alerthandle";

const RoomsOfferPrice = ({ data, hotelId }) => {
  const [roomName, setRoomName] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const { register, handleSubmit } = useForm();
  const [setRoomOfferPrice, { data: setOfferData, error: setOfferError }] =
    useSetRoomOfferPriceMutation();

  useEffect(() => {
    if (setOfferData?.success) SuccessMessage(setOfferData?.message);
    if (setOfferError) ErrorMessage(setOfferError?.data?.message);
  }, [setOfferError, setOfferData]);

  //   console.log(data);
  const roomPrice = data?.find((item) => item.roomName === roomName)?.roomPrice;

  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value || 0);
    const discountPrice = roomPrice - (roomPrice * value) / 100;
    setDiscountPrice(discountPrice);
  };

  const formData = [
    {
      name: "roomName",
      label: "Room Name",
      type: "select",
      required: true,
      values: data?.map((item) => item.roomName) || [],
    },
    {
      name: "roomPrice",
      label: "Room Price",
      type: "number",
      required: true,
      value: roomPrice || 0,
      readOnly: true,
    },
    {
      name: "roomDiscount",
      label: "Room Discount",
      type: "text",
      required: true,
      onChange: (e) => handleDiscountChange(e),
      onKeyDown: (e) => {
        const allowedKeys = ["ArrowLeft", "ArrowRight", "Delete", "Backspace"];
        if (
          (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) ||
          parseInt(e.target.value + e.key) > 100
        ) {
          e.preventDefault();
        }
      },
      autocomplete: "off",
    },
    {
      name: "roomDiscountPrice",
      label: "Room Discount Price",
      type: "number",
      required: true,
      value: discountPrice,
    },
  ];

  const onOfferSubmit = async (data) => {
    const newData = {
      roomName: data?.roomName,
      roomPrice: roomPrice,
      roomDiscount: data?.roomDiscount,
      roomDiscountPrice: discountPrice,
    };

    await setRoomOfferPrice({ id: hotelId, data: newData });
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onOfferSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          {formData.map((item, idx) => {
            return (
              <div key={idx}>
                {item?.type === "select" ? (
                  <FormControl fullWidth>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Select Room Name
                    </InputLabel>
                    <Select
                      {...register(item?.name, {
                        required: item?.required && `${item?.label} is Required`,
                      })}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Room Name"
                      size="small"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
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
                      required: item?.required && `${item?.label} is Required`,
                    })}
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    value={item?.value}
                    readOnly={item?.readOnly}
                    type={item.type}
                    size="small"
                    label={item.label}
                    onChange={item?.onChange}
                    onKeyDown={item?.onKeyDown}
                    variant="outlined"
                    autoComplete={item?.autocomplete}
                  />
                )}
              </div>
            );
          })}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md mt-5">
          Submit
        </button>
      </form>
    </section>
  );
};

export default RoomsOfferPrice;
