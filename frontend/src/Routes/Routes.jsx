import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddHotel from "../Components/Hotels/AddHotel/AddHotel";
import EditHotel from "../Components/Hotels/EditHotel/EditHotel";
import Pos from "../Components/Hotels/Pos/Pos";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Login from "../Components/Authentication/login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddUser from "../Components/Super-Admin/AddUser/AddUser";
import RunningHotelBooking from "../Components/Hotels/RuuningHotelBooking/RunningHotelBooking";
import PreviousBooking from "../Components/Hotels/PreviousBooking/PreviousBooking";
import CustomerInvoice from "../Components/Hotels/Invoices/HotelBooking/CustomerInvoice";
import HotelReports from "../Components/Hotels/HotelReports/HotelReports";
import AddCarCompany from "../Components/Car-Rent/AddCarCompany";
import CarPos from "../Components/Car-Rent/Car-Pos/CarPos";
import MainDashboard from "../Components/Dashboard/MainDashboard";
import RunningCar from "../Components/Car-Rent/Car-Booking/RunningCar/RunningCar";
import PreviousCar from "../Components/Car-Rent/Car-Booking/PreviousCar/PreviousCar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainDashboard />,
      },
      {
        path: "/add-hotel",
        element: (
          <AdminRoute>
            <AddHotel />
          </AdminRoute>
        ),
      },
      {
        path: "/edit-hotel",
        element: <EditHotel />,
      },
      {
        path: "/pos",
        element: <Pos />,
      },
      {
        path: "/add-user",
        element: (
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        ),
      },
      {
        path: "/running-hotel-booking",
        element: <RunningHotelBooking />,
      },
      {
        path: "/previous-booking",
        element: <PreviousBooking />,
      },
      {
        path: "/hotel-reports",
        element: <HotelReports />,
      },

      //Car-rental routes start here
      {
        path: "/add-car-company",
        element: <AddCarCompany />,
      },
      {
        path: "/car-pos",
        element: <CarPos />,
      },
      {
        path: "/running-car-booking",
        element: <RunningCar />,
      },
      {
        path: "/previous-car-booking",
        element: <PreviousCar />,
      },
    ],
  },
  {
    path: "/running-hotel-booking/customer-invoice/:id",
    element: <CustomerInvoice />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
