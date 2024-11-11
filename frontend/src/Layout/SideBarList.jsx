import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useUserInfo } from "../Components/Hooks/useUserInfo";
import { HotelMenuList } from "./MenuList/HotelMenu";
import { AdminMenuList } from "./MenuList/AdminMenu";
import { CarMenuList } from "./MenuList/CarMenu";

const SideBarList = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { role } = useUserInfo();

  let menulist = [];
  if (role == "admin") {
    menulist = AdminMenuList;
  } else if (role == "hotelmarchent") {
    menulist = HotelMenuList;
  } else if (role == "rentalmarchent") {
    menulist = CarMenuList;
  }

  return (
    <>
      <List>
        {menulist?.map((text, idx) => (
          <ListItem key={idx} disablePadding sx={{ display: "block" }}>
            <Link to={text?.url} onClick={(e) => text?.submenu && e.preventDefault()}>
              <ListItemButton
                onClick={() => setOpenMenu(openMenu === text.name ? null : text.name)}
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 1.8,
                    justifyContent: "center",
                  }}
                >
                  {text?.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
                {text?.submenu && (openMenu === text.name ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </Link>
            {text?.submenu && (
              <Collapse in={openMenu === text.name} timeout={500} unmountOnExit>
                <List component="div" disablePadding>
                  {text.submenu.map((subText, subIdx) => (
                    <Link key={subIdx} to={subText.url}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: "initial",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 1.8,
                            justifyContent: "center",
                          }}
                        >
                          {subText.icon}
                        </ListItemIcon>
                        <ListItemText primary={subText.name} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SideBarList;
