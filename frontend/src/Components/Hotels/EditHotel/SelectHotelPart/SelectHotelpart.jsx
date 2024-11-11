import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

const SelectHotelpart = ({ setSelectPart }) => {
  return (
    <section>
      <h1 className="mt-5">Select Which Part you want to update</h1>
      <FormControl>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
          <div>
            {["Hotel Info", "Rooms", "Hotel Facilites", "Nearby Location", "Rooms Offer Price"].map(
              (item, idx) => (
                <FormControlLabel
                  key={idx}
                  value={item}
                  control={<Radio onChange={(e) => setSelectPart(e.target.value)} />}
                  label={item}
                />
              )
            )}
          </div>
        </RadioGroup>
      </FormControl>
    </section>
  );
};

export default SelectHotelpart;
