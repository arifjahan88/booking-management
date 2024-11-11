import { MdSpaceDashboard } from "react-icons/md";

export const AdminMenuList = [
  {
    name: "Dashboard",
    url: "/",
    icon: <MdSpaceDashboard className="text-3xl" />,
  },

  {
    name: "Hotel",
    icon: <MdSpaceDashboard className="text-3xl" />,
    url: "#",
    submenu: [
      {
        name: "Add Hotel",
        url: "/add-hotel",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },
      {
        name: "Edit Hotel",
        url: "/edit-hotel",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },

      {
        name: "Reports",
        url: "/hotel-reports",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },
    ],
  },
  {
    name: "Car Rental",
    icon: <MdSpaceDashboard className="text-3xl" />,
    url: "#",
    submenu: [
      {
        name: "Add Car Company",
        url: "/add-car-company",
        icon: <MdSpaceDashboard className="text-3xl" />,
      },
    ],
  },
  {
    name: "Users",
    url: "/add-user",
    icon: <MdSpaceDashboard className="text-3xl" />,
  },
];
