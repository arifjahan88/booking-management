import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useUpdateDuePaymentMutation } from "../../../../Redux/Api/endpoints/booking/hotelBookingApi";
import { ErrorMessage, SuccessMessageTimer } from "../../../Hooks/Alerthandle";
import { PaymentFormData } from "./PaymentFormData";

const UpdateDueModal = ({ setOpen, modaldata }) => {
  const { register, handleSubmit } = useForm();
  const [payment, setpayment] = useState(null);
  //Api
  const [udpatePayment, { data: paymentData, error }] = useUpdateDuePaymentMutation();

  useEffect(() => {
    if (paymentData?.success) {
      setOpen(false);
      SuccessMessageTimer(paymentData?.message);
    }
    if (error) ErrorMessage(error?.data?.message);
  }, [paymentData, error, setOpen]);

  const onPaymentSubmit = async (data) => {
    await udpatePayment({ bookingid: modaldata?._id, amount: data?.paidAmount });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="shadow-xl p-5 bg-white">
          <h1 className="text-red-500 font-bold text-center py-5 mb-5 text-xl">
            Please First Pay your Due Amount
          </h1>
          <form onSubmit={handleSubmit(onPaymentSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              {PaymentFormData({ modaldata, setpayment })?.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.name === "paymentmethod" ? (
                      <div className="flex gap-4">
                        <FormControl fullWidth>
                          <InputLabel size="small" id="demo-simple-select-label">
                            {item?.label}
                          </InputLabel>
                          <Select
                            {...register(`${item?.name}`, {
                              required: `${item?.label} is Required`,
                            })}
                            onChange={(e) => {
                              setpayment(e.target.value);
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={item?.label}
                            size="small"
                          >
                            {item?.values?.map((value, index) => (
                              <MenuItem key={index} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {payment && payment !== "Cash" && (
                          <FormControl fullWidth>
                            <TextField
                              {...register("payNumber")}
                              type="text"
                              id="outlined-basic"
                              label={`${payment} Number`}
                              variant="outlined"
                              size="small"
                            />
                          </FormControl>
                        )}
                      </div>
                    ) : (
                      <TextField
                        {...register(`${item?.name}`)}
                        size="small"
                        className="w-full"
                        type={item?.type}
                        id="standard-basic"
                        label={item?.placeholder}
                        variant="outlined"
                        disabled={item?.name === "paidAmount" ? false : true}
                        defaultValue={item?.name === "paidAmount" ? null : item?.value}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-5 py-2 rounded-md font-semibold mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateDueModal;
