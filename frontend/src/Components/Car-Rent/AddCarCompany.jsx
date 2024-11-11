import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import HeaderText from "../Common/HeaderText";
import { CompanyInfoFromData } from "./FormData/CompanyInfoFromData";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import CarInfo from "./CarInfo.jsx/CarInfo";
import { CarInfoFormData } from "./FormData/CarInfoFormData";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { SingleImageUload } from "../Upload/SingleImageUload";
import { useAddRentalCompanyMutation } from "../../Redux/Api/endpoints/car-rental/carRentalApi";
import { ErrorMessage, SuccessMessageTimer } from "../Hooks/Alerthandle";

const AddCarCompany = () => {
  const CompanyFormData = CompanyInfoFromData();
  const CarFormData = CarInfoFormData();
  //Api
  const [AddCompany, { data: CompanyData, error: CompanyError }] = useAddRentalCompanyMutation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cars: [CarFormData.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})],
    },
  });

  useEffect(() => {
    if (CompanyData?.success) SuccessMessageTimer(CompanyData?.message);
    if (CompanyError) ErrorMessage(CompanyError?.data?.message);
  }, [CompanyData, CompanyError]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cars",
  });

  const onSubmitCarRental = async (data) => {
    try {
      const CompanyLogo = await SingleImageUload(data?.companyLogo[0]);
      const carsData = await Promise.all(
        data.cars.map(async (item) => {
          const carImageData = await SingleImageUload(item?.carImage[0]);
          return { ...item, carImage: carImageData };
        })
      );

      const newData = { ...data, companyLogo: CompanyLogo, cars: carsData };
      await AddCompany(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <form className="bg-white px-4 py-2 rounded-lg" onSubmit={handleSubmit(onSubmitCarRental)}>
        <HeaderText text="Company Info" />
        <div className="grid grid-cols-3 gap-5 items-center">
          {CompanyFormData?.map((item, index) => (
            <div key={index}>
              <CompanyInfo item={item} register={register} errors={errors} />
            </div>
          ))}
        </div>
        <HeaderText text="Car Info" />
        <div>
          {fields?.map((field, index) => (
            <div key={index}>
              <div className="flex items-center gap-5 mb-2">
                <span>Car Number {index + 1}</span>

                {fields.length > 1 && (
                  <button
                    onClick={() => remove(index)}
                    type="submit"
                    className="bg-red-500 text-sm text-white px-2 py-1 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div
                key={field.id}
                className="grid grid-cols-3 gap-3 border p-2 shadow-lg rounded-md"
              >
                {CarFormData.map((item) => (
                  <CarInfo
                    key={item.name}
                    register={register}
                    control={control}
                    errors={errors}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => append(CarFormData.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {}))}
          sx={{ mt: 2 }}
        >
          Add Another Car
        </Button>
        <div className=" mt-5">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCarCompany;
