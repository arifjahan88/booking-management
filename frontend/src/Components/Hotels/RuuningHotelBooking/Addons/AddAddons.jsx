import { useForm } from "react-hook-form";
import HeaderText from "../../../Common/HeaderText";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { format } from "date-fns";
import { useAddAddonsMutation } from "../../../../Redux/Api/endpoints/booking/hotelBookingApi";
import { ErrorMessage, SuccessMessageTimer } from "../../../Hooks/Alerthandle";
import PrevAddons from "./PrevAddons";

const AddAddons = ({ setState, item }) => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const { handleSubmit, reset } = useForm();
  const [addonsData, setAddonsData] = useState([
    { itemName: "", total: "", item: "", itemPrice: "" },
  ]);
  const Addons = ["Break Fast", "Launch", "Dinner", "Swimming Pool", "Others"];

  //Api
  const [AddAddons, { data: AddonsData, error: AddonError, isLoading }] = useAddAddonsMutation();

  useEffect(() => {
    if (AddonsData?.success) {
      SuccessMessageTimer(AddonsData?.message);
      reset();
      setState({ top: false });
    }
    if (AddonError) ErrorMessage(AddonError?.data?.message);
  }, [AddonsData, AddonError, setState, reset]);

  const handleAddMore = () => {
    setAddonsData((prevData) => [
      ...prevData,
      { itemName: "", total: "", item: "", itemPrice: "" },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const newData = [...addonsData];
    newData[index][field] = value;
    if (field === "item" || field === "itemPrice") {
      newData[index]["total"] = calculateTotal(newData[index]["item"], newData[index]["itemPrice"]);
    }
    setAddonsData(newData);
  };

  // Calculate total for each row
  const calculateTotal = (item, itemPrice) => {
    return item * itemPrice;
  };

  const handleRemoveField = (index) => {
    if (addonsData.length === 1) {
      return;
    }
    setAddonsData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  //addons submit function
  const handleAddonsSubmit = async () => {
    await AddAddons({ bookingid: item?._id, payload: { date: todayDate, addonsData } });
  };
  return (
    <section className="container mx-auto">
      <HeaderText text="Add Addons" />
      <div className="flex justify-center items-start">
        <div className="pb-10">
          <h1 className="mb-5 font-semibold text-2xl text-red-500 text-center">
            Select Your Extra Service ({todayDate})
          </h1>
          <button
            className=" text-red-500 font-bold text-lg w-7 h-7 rounded-full bg-gray-200 absolute top-2 right-2"
            onClick={() => {
              reset();
              setState({ top: false });
            }}
          >
            X
          </button>
          <form onSubmit={handleSubmit(handleAddonsSubmit)}>
            <div className="grid grid-cols-1 gap-5">
              {addonsData.map((addon, index) => (
                <div key={index} className="flex gap-2">
                  <Autocomplete
                    sx={{ width: 500 }}
                    disablePortal
                    id={`combo-box-demo-${index}`}
                    options={Addons}
                    filterSelectedOptions
                    onChange={(e, value) => {
                      handleItemChange(index, "itemName", value);
                    }}
                    renderInput={(params) => (
                      <TextField required {...params} label="Select Your Extra Service" />
                    )}
                  />

                  <TextField
                    required
                    type="number"
                    value={addon.item}
                    onChange={(e) => handleItemChange(index, "item", e.target.value)}
                    id={`outlined-basic-${index}`}
                    label="Quantity"
                    variant="outlined"
                  />
                  <TextField
                    required
                    className="w-full"
                    type="number"
                    value={addon.itemPrice}
                    onChange={(e) => handleItemChange(index, "itemPrice", e.target.value)}
                    id={`outlined-basic-${index}`}
                    label="Price"
                    variant="outlined"
                  />
                  <TextField
                    required
                    className="w-full"
                    type="number"
                    onChange={(e) => handleItemChange(index, "total", e.target.value)}
                    value={calculateTotal(addon.item, addon.itemPrice)}
                    id={`outlined-basic-${index}`}
                    label="Total"
                    variant="outlined"
                  />
                  {addonsData?.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="flex uppercase items-center text-xs text-white justify-center rounded-md bg-red-500 p-2 font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex uppercase text-sm text-white justify-center rounded-md bg-orange-500 p-2 font-semibold mt-3"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleAddMore}
                className="flex uppercase text-sm text-white justify-center rounded-md bg-teal-500 p-2 font-semibold mt-3"
              >
                Add Field
              </button>
            </div>
          </form>
        </div>
      </div>
      <PrevAddons items={item?.addons} />
    </section>
  );
};

export default AddAddons;
