import { Navigate } from "react-router-dom";
import { useUserInfo } from "../Components/Hooks/useUserInfo";

const AdminRoute = ({ children }) => {
  const { role } = useUserInfo();

  if (role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
