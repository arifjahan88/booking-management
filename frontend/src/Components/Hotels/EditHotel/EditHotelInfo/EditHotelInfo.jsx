import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import HeaderText from "../../../Common/HeaderText";
import Button from "@mui/material/Button";
import { useUpdateHotelMutation } from "../../../../Redux/Api/endpoints/hotelApi";

const EditHotelInfo = ({ data, hotelId }) => {
  const [updateHotelInfo] = useUpdateHotelMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HotelInfoFormData = [
    {
      label: "Hotel Name",
      type: "text",
      name: "hotelName",
      defaultValue: data?.hotelName,
    },
    {
      label: "Hotel Address",
      type: "text",
      name: "hotelAddress",
      defaultValue: data?.hotelAddress,
    },
    {
      label: "City",
      type: "text",
      name: "city",
      defaultValue: data?.city,
    },
    {
      label: "State",
      type: "text",
      name: "state",
      defaultValue: data?.state,
    },
    {
      label: "Country",
      type: "text",
      name: "country",
      defaultValue: data?.country,
    },
    {
      label: "Hotel Star (1 to 5)",
      type: "number",
      name: "hotelStar",
      defaultValue: data?.hotelStar,
    },
    {
      label: "Phone Number",
      type: "number",
      name: "phoneNumber",
      defaultValue: data?.phoneNumber,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      defaultValue: data?.email,
    },
    {
      label: "Website",
      type: "text",
      name: "website",
      defaultValue: data?.website,
    },
    {
      label: "Hotel Description",
      type: "textarea",
      name: "hotelDescription",
      defaultValue: data?.hotelDescription,
    },
  ];

  const handleinfoSubmit = async (formData) => {
    await updateHotelInfo({ id: hotelId, data: formData });
  };

  return (
    <section className="p-2 shadow-xl rounded-md">
      <HeaderText text="Edit Hotel Information" />
      <form onSubmit={handleSubmit(handleinfoSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          {HotelInfoFormData?.map((item, idx) => {
            return (
              <div key={idx} className={`${item?.type === "textarea" && "col-span-2"}`}>
                {item?.type === "textarea" ? (
                  <TextField
                    {...register(`${item?.name}`, { required: `${item?.label} is Required` })}
                    className="w-full"
                    id="outlined-basic"
                    label={item?.label}
                    size="small"
                    variant="outlined"
                    error={errors[item?.name] ? true : false}
                    multiline
                    rows={4}
                    defaultValue={item?.defaultValue}
                  />
                ) : (
                  <TextField
                    {...register(`${item?.name}`, { required: `${item?.label} is Required` })}
                    className="w-full"
                    id="outlined-basic"
                    label={item?.label}
                    type={item?.type}
                    size="small"
                    variant="outlined"
                    error={errors[item?.name] ? true : false}
                    defaultValue={item?.defaultValue}
                  />
                )}
                {errors[item?.name] && (
                  <p className="text-xs text-red-600 mt-1">{errors[item?.name].message}*</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <Button type="submit" variant="contained">
            Update
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditHotelInfo;
