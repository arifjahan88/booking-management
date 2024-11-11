import { useGetAllPreviousCarQuery } from "../../../../Redux/Api/endpoints/car-rental/carRentalApi";
import CarRentBookingTable from "../../../Common/CarRentBookingTable";
import PageLoader from "../../../Loader/Loader";

const PreviousCar = () => {
  // Api call
  const { data: AllPreviousCar, isLoading: AllPreviousCarLoading } = useGetAllPreviousCarQuery();

  if (AllPreviousCarLoading) return <PageLoader />;

  return (
    <>
      <CarRentBookingTable previousBooking={AllPreviousCar?.data || []} isprevious={true} />
    </>
  );
};

export default PreviousCar;
