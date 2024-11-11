import AddFacilites from "./AddFacilites/AddFacilites";
import AddHotelInfo from "./AddHotelInfo/AddHotelInfo";
import AddNearby from "./AddNearbyLocation/AddNearby";
import AddRooms from "./AddRooms/AddRooms";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import { customAlphabet } from "nanoid";
import { useAddHotelMutation } from "../../../Redux/Api/endpoints/hotelApi";
import { useHotelData } from "../../Hooks/useHotelData";
import { useEffect } from "react";
import { ErrorMessage, SuccessMessage } from "../../Hooks/Alerthandle";
import { uploadMultipleImage } from "../../Upload/MultipleImageUpload";

const AddHotel = () => {
  const { hotelInfo, hotelFacilites, hotelRooms, nearByLocations } = useHotelData();
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);
  const [addHotel, { data: addhotelData, error: addHotelError, isLoading }] = useAddHotelMutation();

  useEffect(() => {
    if (addhotelData?.success) SuccessMessage(addhotelData?.message);
    if (addHotelError) ErrorMessage(addHotelError?.data?.message);
  }, [addHotelError, addhotelData]);

  const checkKeys =
    Object.keys(hotelInfo)?.length ||
    Object.keys(hotelFacilites)?.length ||
    Object.keys(nearByLocations)?.length ||
    hotelRooms?.length;

  const checkKeysForButton =
    Object.keys(hotelInfo)?.length &&
    Object.keys(hotelFacilites)?.length &&
    Object.keys(nearByLocations)?.length &&
    hotelRooms?.length;

  const handleSubmitAddHall = async () => {
    const HotelImages = await uploadMultipleImage(hotelInfo?.hotelImages);

    const HotelImageData = {
      ...hotelInfo,
      hotelImages: HotelImages,
    };

    // Upload room images to Cloudinary and wait for all uploads to complete
    const newHotelRooms = await Promise.all(
      hotelRooms.map(async (room) => {
        const uploadedImages = await uploadMultipleImage(room.roomImages);
        return {
          ...room,
          roomImages: uploadedImages,
        };
      })
    );

    const hotelData = {
      hotelId: nanoid(),
      ...HotelImageData,
      hotelFacilites,
      hotelRooms: newHotelRooms,
      nearByLocations,
    };
    await addHotel(hotelData);
  };

  return (
    <section>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <AddHotelInfo />
          <AddFacilites />
          <AddNearby />
          <AddRooms />
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-bold text-center mt-2 text-orange-500">All Submitted Data</h1>
          {checkKeys < 1 && (
            <>
              <p className="mt-16 text-center text-lg text-red-500">No Data</p>
            </>
          )}
          {Object.keys(hotelInfo).length > 0 && (
            <>
              <h1 className="text-xl font-semibold text-yellow-600">Hotel Info</h1>
              <div className="bg-gray-200 p-2 rounded-md shadow-xl flex flex-wrap gap-2 text-sm">
                {Object.keys(hotelInfo).map((item, idx) => {
                  return (
                    <p key={idx}>
                      <span className="capitalize font-semibold">
                        {item.replace(/([A-Z])/g, " $1").trim()}
                      </span>{" "}
                      : {hotelInfo[item]}
                    </p>
                  );
                })}
              </div>
            </>
          )}
          {Object.keys(hotelFacilites).length > 0 && (
            <>
              <h1 className="text-xl font-semibold mt-2 text-yellow-600">Hotel Facilities</h1>
              <div className="bg-gray-200 p-2 rounded-md shadow-xl text-sm flex flex-col gap-3">
                {Object.keys(hotelFacilites)?.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <h1 className="text-lg font-semibold">{item}</h1>
                      <ul className="flex flex-wrap gap-1">
                        {hotelFacilites[item]?.map((facility, idx) => {
                          return (
                            <li key={idx}>
                              <Chip
                                label={facility}
                                icon={<DoneIcon style={{ fontSize: "20px" }} />}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {Object.keys(nearByLocations).length > 0 && (
            <>
              <h1 className="text-xl font-semibold mt-2 text-yellow-600">Nearby Locations</h1>
              <ul className="bg-gray-200 p-2 rounded-md shadow-xl text-sm ">
                <div className="flex flex-wrap gap-2">
                  {nearByLocations?.locations?.map((location, idx) => {
                    return (
                      <li key={idx}>
                        {idx + 1}. {location}
                      </li>
                    );
                  })}
                </div>
                <a>
                  <span className="underline">{nearByLocations?.locationUrl}</span>
                </a>
              </ul>
            </>
          )}
          {hotelRooms?.length > 0 && (
            <>
              <h1 className="text-xl font-semibold mt-2 text-yellow-600">Hotel Rooms</h1>
              <div className="bg-gray-200 p-2 rounded-md shadow-xl text-sm flex flex-col gap-3">
                {hotelRooms?.map((room, idx) => {
                  return (
                    <div key={idx}>
                      <h1 className="text-lg font-semibold text-blue-500">Room Number {idx + 1}</h1>
                      {Object.keys(room)?.map((item) => (
                        <div key={item?.roomName}>
                          <span className="capitalize font-semibold">
                            {item.replace(/([A-Z])/g, " $1").trim()}
                          </span>{" "}
                          : {Array.isArray(room[item]) ? room[item].join(", ") : room[item]}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <div className="mt-5 flex justify-center">
            {checkKeysForButton > 0 && (
              <Button
                onClick={handleSubmitAddHall}
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit Hotel"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddHotel;
