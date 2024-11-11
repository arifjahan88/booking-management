import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import TagsInput from "react-tagsinput";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

import "react-tagsinput/react-tagsinput.css";
import HeaderText from "../../../Common/HeaderText";
import { useUpdateHotelMutation } from "../../../../Redux/Api/endpoints/hotelApi";

// Create a styled component for TagsInput
const CustomTagsInput = styled(TagsInput)`
  .react-tagsinput-input {
    margin: 0;
    width: 100%;
    height: 30px;
  }
`;

const EditFacilites = ({ data, hotelId }) => {
  const [facility, setFacility] = useState(null);
  const [tags, setTags] = useState([]);
  const [allFacility, setAllFacility] = useState(data);
  const [updateHotelFacilites] = useUpdateHotelMutation();

  const facilitesname = [
    "populer",
    "Service And Convenience",
    "For The kids",
    "Access",
    "Available For All Rooms",
    "Internet",
  ].filter((item) => !Object.keys(allFacility).includes(item));

  const handleFacilitySubmit = async () => {
    await updateHotelFacilites({ id: hotelId, data: { hotelFacilites: allFacility } });
  };

  return (
    <section className="shadow-lg p-2 rounded-md">
      <HeaderText text="Add Hotel Facilities" />
      <div className="flex gap-3">
        <div className="w-full">
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
              onChange={(tags) => setTags(tags)}
              onlyUnique
              inputProps={{ placeholder: "Add Facilities" }}
            />
          </div>
          <div className="mt-5">
            <Button
              onClick={() => {
                setAllFacility({ ...allFacility, [facility]: tags });
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </div>
        </div>
        <div>
          {Object.keys(allFacility).length > 0 && (
            <>
              <h1 className="text-xl font-semibold mt-2 text-yellow-600">Hotel Facilities</h1>
              <div className="bg-gray-200 p-2 rounded-md shadow-xl text-sm flex flex-col gap-3">
                {Object.keys(allFacility)?.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">{item}</h1>
                        <button
                          onClick={() => {
                            const newFacility = { ...allFacility };
                            delete newFacility[item];
                            setAllFacility(newFacility);
                          }}
                        >
                          <DeleteIcon color="error" />
                        </button>
                      </div>
                      <ul className="flex flex-wrap gap-1">
                        {allFacility[item]?.map((facility, idx) => {
                          return (
                            <li key={idx}>
                              <Chip
                                label={facility}
                                icon={<DoneIcon style={{ fontSize: "20px" }} />}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <div className="mt-5">
            <Button onClick={handleFacilitySubmit} type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditFacilites;
