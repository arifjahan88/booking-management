import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "../MeatrialCustomDesign/TableStyle";
import PaidIcon from "@mui/icons-material/Paid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { format } from "date-fns";

const CarRentBookingTable = ({
  currentBooking,
  handleUpdateDue,
  handleDelete,
  isprevious,
  previousBooking,
  handlebookedOut,
  setState,
}) => {
  let booking = [];
  if (isprevious) {
    booking = previousBooking;
  } else {
    booking = currentBooking;
  }

  return (
    <TableContainer component={Paper} className="mt-5">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="left">Authentication</StyledTableCell>
            <StyledTableCell align="left">Car Name</StyledTableCell>
            <StyledTableCell align="left">Start</StyledTableCell>
            <StyledTableCell align="left">End</StyledTableCell>
            <StyledTableCell align="left">Paid</StyledTableCell>
            <StyledTableCell align="left">Due</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            {!isprevious && <StyledTableCell align="center">Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {booking?.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row">
                {item?.guestName}
              </StyledTableCell>
              <StyledTableCell align="left">{item?.guestNumber}</StyledTableCell>
              <StyledTableCell align="left">
                {item?.authType} <br />
                {item?.authNumber}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Chip
                  sx={{ backgroundColor: "#00b4d8", color: "#fff" }}
                  label={item?.carInfo?.carName}
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                {format(new Date(item?.startDate), "yyyy-MM-dd")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {format(new Date(item?.endDate), "yyyy-MM-dd")}
              </StyledTableCell>
              <StyledTableCell align="left">{item?.paidAmount}</StyledTableCell>
              <StyledTableCell align="left">{item?.totalAmount - item?.paidAmount}</StyledTableCell>
              <StyledTableCell align="left">
                <button onClick={() => handlebookedOut(item?._id)}>
                  <Chip
                    label={item?.isBooked ? "Booked" : "Ended"}
                    sx={{ backgroundColor: "#57cc99", color: "#fff" }}
                  />
                </button>
              </StyledTableCell>
              {!isprevious && (
                <StyledTableCell align="center">
                  <div className="flex justify-center items-center flex-wrap text-teal-600">
                    <AddBoxIcon
                      onClick={() => setState({ top: true, item: item })}
                      className="hover:scale-125 hover:cursor-pointer font-bold"
                    />
                    <PaidIcon
                      onClick={() => handleUpdateDue(item)}
                      className="hover:scale-125 hover:cursor-pointer"
                    />
                    <Link
                      to={`/running-hotel-booking/customer-invoice/${item?._id}`}
                      state={{ item }}
                    >
                      <DescriptionIcon className="hover:scale-125 hover:cursor-pointer" />
                    </Link>
                    <DeleteIcon
                      onClick={() => handleDelete(item?._id)}
                      className="hover:scale-125 hover:cursor-pointer"
                    />
                  </div>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CarRentBookingTable;
