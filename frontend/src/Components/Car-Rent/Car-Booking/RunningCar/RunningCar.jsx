import { useEffect } from "react";
import {
  useDeletecarRentalBookingMutation,
  useGetAllRunningCarQuery,
  useUpdateBookedCarMutation,
} from "../../../../Redux/Api/endpoints/car-rental/carRentalApi";
import CarRentBookingTable from "../../../Common/CarRentBookingTable";
import {
  CheckDeleteMessage,
  CheckUpdateMessage,
  ErrorMessage,
  SuccessMessageTimer,
} from "../../../Hooks/Alerthandle";
import PageLoader from "../../../Loader/Loader";

const RunningCar = () => {
  // Api call
  const { data: AllRunningCar, isLoading: AllCarLoading } = useGetAllRunningCarQuery();
  const [deleteBooking, { data: deleteData, error: deleteError }] =
    useDeletecarRentalBookingMutation();
  const [updateBooking, { data: updateData, error: updateError }] = useUpdateBookedCarMutation();

  useEffect(() => {
    if (deleteData?.success) SuccessMessageTimer(deleteData?.message);
    if (deleteError) ErrorMessage(deleteError?.data?.message);
    if (updateData?.success) SuccessMessageTimer(updateData?.message);
    if (updateError) ErrorMessage(updateError?.data?.message);
  }, [deleteData, deleteError, updateData, updateError]);

  //handle delete booking
  const handleDelete = async (id) => {
    CheckDeleteMessage({
      onConfirm: async () => {
        await deleteBooking(id);
      },
    });
  };

  //Handle Booked Out Car
  const handlebookedOut = (id) => {
    CheckUpdateMessage({
      onConfirm: async () => {
        await updateBooking(id);
      },
    });
  };

  //page loader
  if (AllCarLoading) return <PageLoader />;

  return (
    <section>
      <CarRentBookingTable
        currentBooking={AllRunningCar?.data?.bookedCars}
        handleUpdateDue={""}
        handleDelete={handleDelete}
        handlebookedOut={handlebookedOut}
        setState={""}
      />
    </section>
  );
};

export default RunningCar;
