import CarDashboard from "../Car-Rent/Dashboard/CarDashboard";
import { useUserInfo } from "../Hooks/useUserInfo";
import AdminDashboard from "../Super-Admin/Dashboard/AdminDashboard";
import HotelDashboard from "../Hotels/Dashboard/Dashboard";

const MainDashboard = () => {
  const { role } = useUserInfo();
  return (
    <div>
      {role == "admin" && <AdminDashboard />}
      {role == "rentalmarchent" && <CarDashboard />}
      {role == "hotelmarchent" && <HotelDashboard />}
    </div>
  );
};

export default MainDashboard;
