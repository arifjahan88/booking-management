import { MdSpaceDashboard } from "react-icons/md";

export const HotelMenuList = [
  {
    name: "Dashboard",
    url: "/",
    icon: <MdSpaceDashboard className="text-3xl" />,
  },
  {
    name: "Pos",
    url: "/pos",
    icon: <MdSpaceDashboard className="text-3xl" />,
  },
  {
    name: "Running Guest",
    url: "/running-hotel-booking",
    icon: <MdSpaceDashboard className="text-3xl" />,
  },
  {
    name: "Hotel",
    icon: <MdSpaceDashboard className="text-3xl" />,
    url: "#",
    submenu: [
      {
        name: "Edit Hotel",
        url: "/edit-hotel",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },
      {
        name: "Previous Guest",
        url: "/previous-booking",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },
      {
        name: "Reports",
        url: "/hotel-reports",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },
    ],
  },
];
