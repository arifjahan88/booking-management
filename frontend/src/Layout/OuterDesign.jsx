import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import {
  AppBar,
  Drawer,
  DrawerHeader,
} from "../Components/MeatrialCustomDesign/MetarialCustomDesign";
import SideBarList from "./SideBarList";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/Features/userInfoSlice";
import { useLocation, useNavigate } from "react-router-dom";

const OuterDesign = ({ children }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let head = "Dashboard";
  const path = location.pathname;
  if (path === "/pos") head = "Pos";
  if (path === "/add-hotel") head = "Add Hotel";
  if (path === "/edit-hotel") head = "Edit Hotel";
  if (path === "/add-user") head = "Add User";
  if (path === "/running-hotel-booking") head = "Running Hotel Booking";
  if (path === "/running-hotel-booking") head = "Running Hotel Booking";
  if (path === "/previous-booking") head = "Previous Booking";
  if (path === "/add-room") head = "Add Room";
  if (path === "/hotel-reports") head = "Hotel Reports";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#1282a2" }} open={open}>
        <Toolbar>
          <IconButton
            className="mt-10"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {head}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={() => {
                dispatch(addUser({}));
                Swal.fire({
                  title: "Log Out successfully",
                  icon: "success",
                  timer: 1000,
                  showConfirmButton: false,
                }).then(() => {
                  navigate("/login");
                });
              }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="show more" aria-haspopup="true" color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <div className="flex justify-center items-center bg-white">
          <img className="h-16" src={logo} alt="" />
        </div>
        {/* <h1 className="h-16">Logo</h1> */}
        <Divider />
        <SideBarList />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        {/* Other Components */}
        {children}
      </Box>
    </Box>
  );
};

export default OuterDesign;
