import HeaderText from "../../../Common/HeaderText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import TagsInput from "react-tagsinput";
import Button from "@mui/material/Button";
import styled from "styled-components";

import "react-tagsinput/react-tagsinput.css";
import { useDispatch } from "react-redux";
import { setHotelFacilitesData } from "../../../../Redux/Features/addHotelSlice";
import { useHotelData } from "../../../Hooks/useHotelData";

// Create a styled component for TagsInput
const CustomTagsInput = styled(TagsInput)`
  .react-tagsinput-input {
    margin: 0;
    width: 100%;
    height: 30px;
  }
`;

const AddFacilites = () => {
  const [facility, setFacility] = useState(null);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { hotelFacilites } = useHotelData();

  const handleTagChange = (tags) => {
    setTags(tags);
  };

  const facilitesname = [
    "populer",
    "Service And Convenience",
    "For The kids",
    "Access",
    "Available For All Rooms",
    "Internet",
  ].filter((item) => !Object.keys(hotelFacilites).includes(item));

  const handleTagSubmit = () => {
    // setTags([]);
    dispatch(setHotelFacilitesData({ [facility]: tags }));
  };

  return (
    <section className="shadow-lg p-2 rounded-md">
      <HeaderText text="Add Hotel Facilities" />
      <div className="grid grid-cols-2 gap-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" size="small">
            Facility Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={facility || ""}
            label="Facility Name"
            size="small"
            onChange={(event) => setFacility(event.target.value)}
          >
            {facilitesname?.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <CustomTagsInput
          className="border border-gray-200 rounded-md p-1"
          value={tags}
          onChange={handleTagChange}
          onlyUnique
          inputProps={{ placeholder: "Add Facilities" }}
        />
      </div>
      <div className="mt-5">
        <Button onClick={handleTagSubmit} type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </section>
  );
};

export default AddFacilites;
