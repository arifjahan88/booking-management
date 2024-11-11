import { useForm } from "react-hook-form";
import HeaderText from "../../../Common/HeaderText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TagsInput from "react-tagsinput";
import styled from "styled-components";
import "react-tagsinput/react-tagsinput.css";
import { useState } from "react";
import { AddRoomsFormData } from "../../AddHotel/HotelFormData/AddRoomsFormData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUpdateHotelMutation } from "../../../../Redux/Api/endpoints/hotelApi";

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

const EditRooms = ({ data, hotelId }) => {
  const [tags, setTags] = useState([]);
  const [facilityTags, setFacilityTags] = useState([]);
  const [roomsData, setRoomsData] = useState(data || []);
  const [updateHotelRooms] = useUpdateHotelMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRoomsSubmit = (data) => {
    setRoomsData([...roomsData, { ...data, roomnumber: tags, roomFacilities: facilityTags }]);
  };

  const handleAllRoomsSubmit = async () => {
    await updateHotelRooms({ id: hotelId, data: { hotelRooms: roomsData } });
  };
  return (
    <section className="p-2 shadow-xl">
      <HeaderText text="Edit Rooms" />
      <div className="flex flex-col-reverse gap-5">
        <form onSubmit={handleSubmit(handleRoomsSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            {AddRoomsFormData?.map((item) => {
              return (
                <div key={item?.name}>
                  {item?.name === "roomFacilities" ? (
                    <CustomTagsInputfacility
                      value={facilityTags}
                      onChange={(tags) => setFacilityTags(tags)}
                      onlyUnique
                      inputProps={{ placeholder: "Add Room Facilities" }}
                    />
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
              Add
            </Button>
          </div>
        </form>
        <div>
          {roomsData?.length > 0 && (
            <>
              <h1 className="text-xl font-semibold mt-2 text-yellow-600">Hotel Rooms</h1>
              <div className="bg-gray-200 p-2 rounded-md shadow-xl text-sm grid grid-cols-3 gap-3">
                {roomsData?.map((room, idx) => {
                  return (
                    <div key={idx}>
                      <div className="flex justify-between">
                        <h1 className="text-lg font-semibold text-blue-500">
                          Room Number {idx + 1}
                        </h1>
                        <button
                          onClick={() => {
                            const newRoomsData = [...roomsData];
                            newRoomsData.splice(idx, 1);
                            setRoomsData(newRoomsData);
                          }}
                        >
                          <DeleteIcon color="error" />
                        </button>
                      </div>
                      {Object.keys(room)?.map((item, index) => (
                        <div key={index}>
                          <span className="capitalize font-semibold">
                            {item.replace(/([A-Z])/g, " $1").trim()}
                          </span>{" "}
                          : {Array.isArray(room[item]) ? room[item].join(", ") : room[item]}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="mt-5">
                <Button onClick={handleAllRoomsSubmit} type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditRooms;
