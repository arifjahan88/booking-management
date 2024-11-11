import { useForm } from "react-hook-form";
import HeaderText from "../../../Common/HeaderText";
import { AddRoomsFormData } from "../HotelFormData/AddRoomsFormData";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TagsInput from "react-tagsinput";
import styled from "styled-components";
import "react-tagsinput/react-tagsinput.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setHotelRoomsData } from "../../../../Redux/Features/addHotelSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

// Create a styled component for TagsInput
const CustomTagsInput = styled(TagsInput)`
  .react-tagsinput-input {
    margin: 0;
    width: 100%;
    height: 50px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 5px;
  }
`;
const CustomTagsInputfacility = styled(TagsInput)`
  .react-tagsinput-input {
    margin: 0;
    width: 100%;
    height: 40px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const AddRooms = () => {
  const [tags, setTags] = useState([]);
  const [facilityTags, setFacilityTags] = useState([]);
  const dispatch = useDispatch();
  const [imageURLs, setImageURLs] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRoomImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageURLs(urls);
  };

  const handleRoomsSubmit = (data) => {
    dispatch(
      setHotelRoomsData({
        ...data,
        roomnumber: tags,
        roomFacilities: facilityTags,
        roomImages: imageURLs,
      })
    );
    console.log({
      ...data,
      roomnumber: tags,
      roomFacilities: facilityTags,
      roomImages: imageURLs,
    });
  };
  return (
    <section className="p-2 shadow-xl">
      <HeaderText text="Add Rooms" />
      <form onSubmit={handleSubmit(handleRoomsSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          {AddRoomsFormData?.map((item, idx) => {
            return (
              <div key={idx}>
                {item?.name === "roomFacilities" ? (
                  <CustomTagsInputfacility
                    value={facilityTags}
                    onChange={(tags) => setFacilityTags(tags)}
                    onlyUnique
                    inputProps={{ placeholder: "Add Room Facilities" }}
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
                      onChange={handleRoomImageChange}
                    >
                      {item?.label}
                      <VisuallyHiddenInput multiple type="file" />
                    </Button>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {imageURLs?.map((url, index) => (
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
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    type={item?.type}
                    size="small"
                    label={item.label}
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
        <CustomTagsInput
          className="mt-2"
          value={tags}
          onChange={(tags) => setTags(tags)}
          onlyUnique
          inputProps={{ placeholder: "Add Room Numbers" }}
        />
        <div className="mt-5">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddRooms;
