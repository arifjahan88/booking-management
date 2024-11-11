import { useState } from "react";
import HeaderText from "../../Common/HeaderText";
import SelectHotel from "./SelectHotel/SelectHotel";
import SelectHotelpart from "./SelectHotelPart/SelectHotelpart";
import EditHotelInfo from "./EditHotelInfo/EditHotelInfo";
import EditRooms from "./EditRooms/EditRooms";
import EditNearby from "./EditNearbyLocation/EditNearbyLocation";
import {
  useGetAllHotelNameQuery,
  useGetHotelbyIdQuery,
} from "../../../Redux/Api/endpoints/hotelApi";
import EditFacilites from "./EditFacilites/EditFacilites";
import RoomsOfferPrice from "./RoomsOfferPrice/RoomsOfferPrice";
import { useUserInfo } from "../../Hooks/useUserInfo";

const EditHotel = () => {
  const { role, marchentid } = useUserInfo();
  const [selectPart, setSelectPart] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(marchentid || null);
  const { data: allHotelName } = useGetAllHotelNameQuery(undefined, { skip: role !== "admin" });
  const { data: hotelData } = useGetHotelbyIdQuery(selectedHotelId || marchentid, {
    skip: !selectedHotelId && !marchentid,
  });
  const { hotelFacilites, hotelRooms, nearByLocations, ...hotelInfoData } = hotelData?.data || {};

  return (
    <section>
      <HeaderText text="Edit Hotel" />
      {role === "admin" && (
        <SelectHotel
          data={allHotelName?.data}
          setSelectedHotelId={setSelectedHotelId}
          selectedHotelId={selectedHotelId}
        />
      )}
      {selectedHotelId && <SelectHotelpart setSelectPart={setSelectPart} />}
      {selectPart === "Hotel Info" && (
        <EditHotelInfo data={hotelInfoData} hotelId={selectedHotelId} />
      )}
      {selectPart === "Rooms" && <EditRooms data={hotelRooms} hotelId={selectedHotelId} />}
      {selectPart === "Nearby Location" && (
        <EditNearby data={nearByLocations} hotelId={selectedHotelId} />
      )}
      {selectPart === "Hotel Facilites" && (
        <EditFacilites data={hotelFacilites} hotelId={selectedHotelId} />
      )}
      {selectPart === "Rooms Offer Price" && (
        <RoomsOfferPrice data={hotelRooms} hotelId={selectedHotelId} />
      )}
    </section>
  );
};

export default EditHotel;
