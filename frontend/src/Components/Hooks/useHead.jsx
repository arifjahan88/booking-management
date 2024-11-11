import { useSelector } from "react-redux";

export const useHead = () => {
  const data = useSelector((state) => state?.headerText?.head);
  return data;
};
