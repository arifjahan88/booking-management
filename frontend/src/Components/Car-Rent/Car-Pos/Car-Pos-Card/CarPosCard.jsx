import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CommonModal from "../../../Common/Modal/CommonModal";
import CarBookingInfo from "../BookingInfo/CarBookingInfo";
import Swal from "sweetalert2";

const CarPosCard = ({ data, searchValue }) => {
  const [openbookingModal, setOpenBookingModal] = useState(false);
  const handlebookingModalOpen = () => {
    if (searchValue?.startDate === null || searchValue?.endDate === null) {
      Swal.fire({
        title: "Select start and end date first!",
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setOpenBookingModal(true);
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: "100%", mb: 2 }}>
        <CardHeader
          action={
            <>
              <button
                onClick={handlebookingModalOpen}
                className="inline-flex items-center gap-2 rounded border border-teal-600 bg-teal-600 px-2 py-1 text-white hover:bg-transparent hover:text-teal-600 focus:outline-none duration-300"
              >
                <span className="text-sm font-medium">Book</span>

                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </>
          }
          title={data?.carName}
          sx={{
            "& .css-nrdprl-MuiTypography-root": {
              color: "red",
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
          }}
        />
        <CardMedia
          component="img"
          height="194"
          image={data?.carImage?.url}
          alt={data?.carName}
          sx={{
            height: "100px",
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${data?.carPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Type:</strong> {data?.carType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Number:</strong> {data?.carNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fitness Expiry:</strong> {data?.carFitnessExpireDate}
          </Typography>
        </CardContent>
      </Card>
      {openbookingModal && (
        <>
          <CommonModal open={openbookingModal} setOpen={setOpenBookingModal}>
            <CarBookingInfo
              carData={data}
              setOpenBookingModal={setOpenBookingModal}
              searchValue={searchValue}
            />
          </CommonModal>
        </>
      )}
    </>
  );
};

export default CarPosCard;
