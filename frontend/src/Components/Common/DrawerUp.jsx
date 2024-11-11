import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Fragment } from "react";

export default function DrawerUp({ state, setState, children }) {
  const list = (anchor) => (
    <Box sx={{ width: anchor === "top" ? "auto" : 250 }} role="presentation">
      {children}
    </Box>
  );

  return (
    <Fragment>
      <Drawer anchor={"top"} open={state["top"]} onClose={() => setState({ top: false })}>
        {list("top")}
      </Drawer>
    </Fragment>
  );
}
