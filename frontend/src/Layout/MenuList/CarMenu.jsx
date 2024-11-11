import { MdSpaceDashboard } from "react-icons/md";
import { MdPointOfSale, MdRunningWithErrors, MdCarRental, MdAddBox } from "react-icons/md";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";

export const CarMenuList = [
  {
    name: "Dashboard",
    url: "/",

    icon: <MdSpaceDashboard className="text-3xl text-[#264653]" />,
  },
  {
    name: "Pos",
    url: "/car-pos",
    icon: <MdPointOfSale className="text-3xl text-[#2a9d8f]" />,
  },
  {
    name: "Running Car",
    url: "/running-car-booking",
    icon: <MdRunningWithErrors className="text-3xl text-[#e9c46a]" />,
  },

  {
    name: "Car Rental",
    icon: <MdCarRental className="text-3xl text-[#f4a261]" />,
    url: "#",
    submenu: [
      {
        name: "Add Car Company",
        url: "/add-car-company",
        icon: <MdAddBox className="text-3xl text-[#e76f51]" />,
      },
      {
        name: "Previous Booking",
        url: "/previous-car-booking",
        icon: <BiSolidSkipPreviousCircle className="text-3xl text-[#219ebc]" />,
      },
    ],
  },
];
