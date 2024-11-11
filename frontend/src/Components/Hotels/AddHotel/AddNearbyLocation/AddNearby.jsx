import HeaderText from "../../../Common/HeaderText";
import TagsInput from "react-tagsinput";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import "react-tagsinput/react-tagsinput.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNearByLocationsData } from "../../../../Redux/Features/addHotelSlice";

// Create a styled component for TagsInput
const CustomTagsInput = styled(TagsInput)`
  .react-tagsinput-input {
    margin: 0;
    width: 100%;
    height: 50px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const AddNearby = () => {
  const [tags, setTags] = useState([]);
  const [Url, setUrl] = useState(null);
  const dispatch = useDispatch();

  return (
    <section className="shadow-xl p-2">
      <HeaderText text="Add Nearby Location" />
      <div>
        <CustomTagsInput
          value={tags}
          onChange={(tags) => setTags(tags)}
          onlyUnique
          inputProps={{ placeholder: "Add Nearby Location" }}
        />
        <TextField
          style={{ width: "100%", marginTop: "10px" }}
          id="outlined-basic"
          label="Enter Nearby Location Url"
          variant="outlined"
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="mt-5">
          <Button
            onClick={() => dispatch(setNearByLocationsData({ locations: tags, locationUrl: Url }))}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddNearby;
