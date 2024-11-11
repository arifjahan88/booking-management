import TextField from "@mui/material/TextField";
import HeaderText from "../../../Common/HeaderText";
import { HotelInfoFormData } from "../HotelFormData/HotelInfoFormData";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setHotelInfoData } from "../../../../Redux/Features/addHotelSlice";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddHotelInfo = () => {
  const dispatch = useDispatch();
  const [imageURLs, setImageURLs] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageURLs(urls);
  };

  const handleinfoSubmit = (data) => {
    dispatch(setHotelInfoData({ ...data, hotelImages: imageURLs }));
  };

  return (
    <section className="p-2 shadow-xl rounded-md">
      <HeaderText text="Add Hotel Information" />
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
                  />
                ) : item?.type === "file" ? (
                  <div className="flex flex-col justify-center items-center">
                    <Button
                      className="w-full"
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      onChange={handleImageChange}
                    >
                      {item?.label}
                      <VisuallyHiddenInput multiple type="file" />
                    </Button>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {imageURLs.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Uploaded ${index}`}
                          className="w-20 h-20 object-cover"
                        />
                      ))}
                    </div>
                  </div>
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
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddHotelInfo;
