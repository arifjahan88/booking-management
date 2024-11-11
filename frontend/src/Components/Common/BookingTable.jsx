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

const BookingTable = ({
  currentBooking,
  handleUpdateDue,
  handleDelete,
  isprevious,
  previousBooking,
  handlecheckOut,
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
            <StyledTableCell align="left">NID</StyledTableCell>
            <StyledTableCell align="left">Room Name</StyledTableCell>
            <StyledTableCell align="left">Room Number</StyledTableCell>
            <StyledTableCell align="left">Checkin</StyledTableCell>
            <StyledTableCell align="left">CheckOut</StyledTableCell>
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
              <StyledTableCell align="left">{item?.authNumber}</StyledTableCell>
              <StyledTableCell align="left">{item?.roomName}</StyledTableCell>
              <StyledTableCell align="left">
                {item?.roomNumber?.map((room) => {
                  return (
                    <span key={room} className="font-semibold pr-2">
                      <Chip color="info" label={room} />
                    </span>
                  );
                })}
              </StyledTableCell>
              <StyledTableCell align="left">
                {format(new Date(item?.checkInDate || item?.checkIn), "yyyy-MM-dd")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {format(new Date(item?.checkOutDate || item?.checkOut), "yyyy-MM-dd")}
              </StyledTableCell>
              <StyledTableCell align="left">{item?.paidAmount}</StyledTableCell>
              <StyledTableCell align="left">{item?.totalAmount - item?.paidAmount}</StyledTableCell>
              <StyledTableCell align="left">
                <button onClick={() => handlecheckOut(item?._id)}>
                  <Chip
                    label={item?.isCheckIn ? "Check In" : "Check Out"}
                    style={{ backgroundColor: "#57cc99" }}
                  />
                </button>
              </StyledTableCell>
              {!isprevious && (
                <StyledTableCell align="center">
                  <div className="flex justify-center items-center flex-wrap">
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
                      // target="_blank"
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

export default BookingTable;
