import { useSelector } from "react-redux";

export const useUserInfo = () => {
  const data = useSelector((state) => state.userReducer?.userInfo?.user);
  return data;
};

export const useUserToken = () => {
  const data = useSelector((state) => state.userReducer?.userInfo?.token);
  return data;
};
