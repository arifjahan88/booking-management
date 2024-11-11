import { useEffect, useState } from "react";
import {
  useDeletebookingMutation,
  useGetAllCurrentHotelBookingQuery,
  useUpdateCheckInMutation,
} from "../../../Redux/Api/endpoints/booking/hotelBookingApi";
import BookingTable from "../../Common/BookingTable";
import { useUserInfo } from "../../Hooks/useUserInfo";
import { ErrorMessage, SuccessMessageTimer } from "../../Hooks/Alerthandle";
import Swal from "sweetalert2";
import UpdateDueModal from "./UpdateDue/UpdateDueModal";
import DrawerUp from "../../Common/DrawerUp";
import AddAddons from "./Addons/AddAddons";
import PageLoader from "../../Loader/Loader";

const RunningHotelBooking = () => {
  const [modaldata, setmodalData] = useState(null);
  const [open, setOpen] = useState(false);
  const { marchentid } = useUserInfo();
  const [state, setState] = useState({ top: false, item: null });

  //Api
  const { data: AllHotelBooking, isLoading: AllBookingLoading } =
    useGetAllCurrentHotelBookingQuery(marchentid);
  const [deleteBooking, { data: deleteData, error: deleteError }] = useDeletebookingMutation();
  const [updatecheckin, { data: updateCheckinData, error: updateCheckinError }] =
    useUpdateCheckInMutation();

  useEffect(() => {
    //handle delete message
    if (deleteData?.success) SuccessMessageTimer(deleteData?.message);
    if (deleteError) ErrorMessage(deleteError?.data?.message);

    //handle update checkin message
    if (updateCheckinData?.success) SuccessMessageTimer(updateCheckinData?.message);
    if (updateCheckinError) ErrorMessage(updateCheckinError?.data?.message);
  }, [deleteData, deleteError, updateCheckinData, updateCheckinError]);

  //update due
  const handleUpdateDue = (booking) => {
    if (booking?.totalAmount === booking?.paidAmount) {
      Swal.fire({
        title: "Your Payment is Already Clear!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setOpen(true);
      setmodalData(booking);
    }
  };

  //delete booking
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBooking({ bookingid: id, hotelid: marchentid });
      }
    });
  };

  //handle checkin checkout
  const handlecheckOut = (bookingid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once you checkout, You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, checkout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updatecheckin(bookingid);
      }
    });
  };

  if (AllBookingLoading) return <PageLoader />;

  return (
    <div className="w-full h-full">
      <div className=" flex justify-between">
        <div className="block sm:flex  items-center mx-auto sm:mx-0 gap-5">
          <h1 className="text-2xl bold mt-5">Total Bookings ({AllHotelBooking?.data?.length})</h1>
        </div>
      </div>
      <BookingTable
        currentBooking={AllHotelBooking?.data}
        handleUpdateDue={handleUpdateDue}
        handleDelete={handleDelete}
        handlecheckOut={handlecheckOut}
        setState={setState}
      />

      {open && <UpdateDueModal setOpen={setOpen} modaldata={modaldata} />}
      <DrawerUp setState={setState} state={state}>
        <AddAddons setState={setState} item={state?.item} />
      </DrawerUp>
    </div>
  );
};

export default RunningHotelBooking;
