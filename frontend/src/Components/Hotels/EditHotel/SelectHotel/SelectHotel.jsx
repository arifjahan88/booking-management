import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectHotel = ({ data, selectedHotelId, setSelectedHotelId }) => {
  const handleChange = async (event) => {
    setSelectedHotelId(event.target.value);
  };

  return (
    <section>
      <FormControl sx={{ width: "25%" }}>
        <InputLabel id="demo-simple-select-label">Select your hotel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedHotelId || ""}
          label="Select your hotel"
          onChange={handleChange}
        >
          {data?.map((item, idx) => {
            return (
              <MenuItem key={idx} value={item._id}>
                {item.hotelName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </section>
  );
};

export default SelectHotel;
