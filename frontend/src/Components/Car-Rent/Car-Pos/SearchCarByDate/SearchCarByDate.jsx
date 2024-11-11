import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SearchCarByDate = ({ setSearchDate, searchValue }) => {
  return (
    <section className="my-5">
      <div className="flex justify-center gap-5">
        <DatePicker
          label="Start Date"
          value={searchValue?.startDate}
          onChange={(newValue) => setSearchDate((prev) => ({ ...prev, startDate: newValue }))}
          format="PP"
          minDate={new Date()}
        />

        <DatePicker
          label="End Date"
          value={searchValue?.endDate}
          onChange={(newValue) => setSearchDate((prev) => ({ ...prev, endDate: newValue }))}
          format="PP"
          minDate={searchValue.startDate}
        />
      </div>
    </section>
  );
};

export default SearchCarByDate;
