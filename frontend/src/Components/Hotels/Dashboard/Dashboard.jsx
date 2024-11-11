import { useGetOnlineHotelBookingsQuery } from "../../../Redux/Api/endpoints/booking/onlineBookingApi";
import { useUserInfo } from "../../Hooks/useUserInfo";
import PageLoader from "../../Loader/Loader";
import OnlineBooking from "./OnlineBooking/OnlineBooking";

const HotelDashboard = () => {
  const { fullname, role, marchentid } = useUserInfo();
  const {
    data: getOnlineBookings,
    isLoading,
    refetch,
  } = useGetOnlineHotelBookingsQuery(marchentid, {
    skip: role === "admin",
  });

  return (
    <section>
      <div className="grid grid-cols-3">
        <h1 className="text-6xl font-bold text-orange-400 text-center col-span-2">
          Welcome {fullname}
        </h1>
        {role !== "admin" && (
          <div className="bg-white h-screen overflow-auto">
            <p className="text-2xl text-center mt-4">Online Booking</p>
            {isLoading ? (
              <PageLoader />
            ) : (
              <>
                {getOnlineBookings?.data?.map((booking) => (
                  <div key={booking._id} className="border border-gray-300">
                    <OnlineBooking booking={booking} refetch={refetch} />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelDashboard;
