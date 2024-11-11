import { useSelector } from "react-redux";

export const useHotelData = () => {
  const data = useSelector((state) => state?.hoteldata);
  return data;
};
