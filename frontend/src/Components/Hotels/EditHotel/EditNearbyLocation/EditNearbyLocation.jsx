import TagsInput from "react-tagsinput";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import "react-tagsinput/react-tagsinput.css";
import { useState } from "react";
import HeaderText from "../../../Common/HeaderText";
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
  }
`;

const EditNearby = ({ data, hotelId }) => {
  const [tags, setTags] = useState(data?.locations || []);
  const [Url, setUrl] = useState(data?.locationUrl || null);
  const [updateNearbyLocation] = useUpdateHotelMutation();

  const handleUpdateSubmit = async () => {
    const payload = {
      locations: tags,
      locationUrl: Url,
    };
    await updateNearbyLocation({ id: hotelId, data: { nearByLocations: payload } });
  };

  return (
    <section className="shadow-xl p-2">
      <HeaderText text="Edit Nearby Location" />
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
          defaultValue={data?.locationUrl || ""}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="mt-5">
          <Button type="submit" variant="contained" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditNearby;
