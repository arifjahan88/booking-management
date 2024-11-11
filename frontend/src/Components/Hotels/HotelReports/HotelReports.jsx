import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import AllReports from "./AllReports/AllReports";

const HotelReports = () => {
  //   const [alignment, setAlignment] = useState();

  //   const handleChange = (event, newAlignment) => {
  //     setAlignment(newAlignment);
  //     console.log(event.target.value);
  //   };
  return (
    <section>
      {/* <ToggleButtonGroup
        style={{ display: "flex", justifyContent: "center" }}
        color="secondary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        {["All Reports", "Payment reports"].map((item, idx) => {
          return (
            <ToggleButton
              style={{ textTransform: "capitalize", fontWeight: "bold" }}
              variant="contained"
              key={idx}
              value={item}
            >
              {item}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      {alignment === "All Reports" && <AllReports />} */}
      <AllReports />
    </section>
  );
};

export default HotelReports;
