import { format } from "date-fns";
import { useGetAllBookingsbyHotelIdQuery } from "../../../../Redux/Api/endpoints/booking/hotelBookingApi";
import { useUserInfo } from "../../../Hooks/useUserInfo";
import { useRef } from "react";
import PageLoader from "../../../Loader/Loader";

const AllReports = () => {
  const { marchentid } = useUserInfo();

  //Api
  const { data, isLoading } = useGetAllBookingsbyHotelIdQuery(marchentid);

  if (isLoading) return <PageLoader />;

  return (
    <section className="container mx-auto">
      <>
        {/* <div className="flex justify-center items-center">
          <button className="border p-3 bg-cyan-500 text-white font-bol uppercase">
            Print Report
          </button>
        </div> */}
        <div>
          <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-gray-600">Income</p>
                  <p className="text-xl font-semibold text-green-600">
                    {data?.data?.reduce((acc, item) => acc + item?.totalAmount, 0) || 0} Taka
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-right">Due</p>
                  <p className="text-xl font-semibold text-red-600">
                    {data?.data?.reduce(
                      (acc, item) => acc + item?.totalAmount - item?.paidAmount,
                      0
                    ) || 0}{" "}
                    Taka
                  </p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-around">
                <p className="text-gray-600">Total Income</p>
                <p className="text-xl font-semibold text-green-600">
                  {data?.data?.reduce((acc, item) => acc + item?.totalAmount, 0) || 0} /- Taka
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-center text-blue-600">Details Report</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1">Booking Date</th>
                  <th className="border border-gray-300 px-2 py-1">Guest Name</th>
                  <th className="border border-gray-300 px-2 py-1">Total Cost</th>
                  <th className="border border-gray-300 px-2 py-1">Paid Amount</th>
                  <th className="border border-gray-300 px-2 py-1">Due</th>
                  <th className="border border-gray-300 px-2 py-1">Booked By</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((detail, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 text-xs py-1">
                      {format(new Date(detail?.createdAt), "PP")}
                    </td>
                    <td className="border border-gray-300 px-2 text-xs py-1">
                      {detail?.guestName}
                    </td>
                    <td className="border border-gray-300 px-2 text-xs py-1 text-green-600">
                      {detail?.totalAmount} Taka
                    </td>
                    <td className="border border-gray-300 px-2 text-xs py-1 text-green-600">
                      {detail?.paidAmount} Taka
                    </td>
                    <td className="border border-gray-300 px-2 text-xs py-1 text-red-600">
                      {detail?.totalAmount - detail?.paidAmount} Taka
                    </td>
                    <td className="border border-gray-300 px-2 text-xs py-1 text-red-600">
                      {detail?.bookedBy?.fullname}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </section>
  );
};

export default AllReports;
