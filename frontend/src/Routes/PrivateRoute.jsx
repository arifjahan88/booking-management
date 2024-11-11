import { Navigate } from "react-router-dom";
import { useUserInfo, useUserToken } from "../Components/Hooks/useUserInfo";

const PrivateRoute = ({ children }) => {
  const userData = useUserInfo();
  const token = useUserToken();

  if (!userData && !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
