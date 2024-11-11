import { useGetpreviousbookingQuery } from "../../../Redux/Api/endpoints/booking/hotelBookingApi";
import BookingTable from "../../Common/BookingTable";
import { useUserInfo } from "../../Hooks/useUserInfo";
import PageLoader from "../../Loader/Loader";

const PreviousBooking = () => {
  const { marchentid } = useUserInfo();
  const { data: previousBooking, isLoading } = useGetpreviousbookingQuery(marchentid);

  if (isLoading) return <PageLoader />;
  return (
    <div>
      <BookingTable isprevious={true} previousBooking={previousBooking?.data || []} />
    </div>
  );
};

export default PreviousBooking;
