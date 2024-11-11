import { useState } from "react";
import { useGetCompanyAllCarQuery } from "../../../Redux/Api/endpoints/car-rental/carRentalApi";
import PageLoader from "../../Loader/Loader";
import CarPosCard from "./Car-Pos-Card/CarPosCard";
import SearchCarByDate from "./SearchCarByDate/SearchCarByDate";
import { format } from "date-fns";

const CarPos = () => {
  const [searchValue, setSearchDate] = useState({
    startDate: new Date(),
    endDate: null,
  });

  const {
    data: AllCompanyCar,
    isLoading: AllCompanyCarLoading,
    isFetching,
  } = useGetCompanyAllCarQuery({
    start: searchValue.startDate ? format(searchValue.startDate, "yyyy-MM-dd") : null,
    end: searchValue.endDate ? format(searchValue.endDate, "yyyy-MM-dd") : null,
  });

  return (
    <section>
      <div>
        <SearchCarByDate setSearchDate={setSearchDate} searchValue={searchValue} />
      </div>
      {AllCompanyCarLoading || isFetching ? (
        <>
          <PageLoader />
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5">
            {AllCompanyCar?.data?.cars?.map((car, idx) => {
              return (
                <div key={idx}>
                  <CarPosCard data={car} searchValue={searchValue} />
                </div>
              );
            })}
            {AllCompanyCar?.data?.cars?.length === 0 && (
              <>
                <h1>No Car Found</h1>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default CarPos;
