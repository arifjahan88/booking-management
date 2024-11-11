import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { UserFormData } from "./UserFormData";
import { useUserRegisterMutation } from "../../../Redux/Api/endpoints/userApi";
import { ErrorMessage, SuccessMessage } from "../../Hooks/Alerthandle";

const AdduserForm = ({ setOpen }) => {
  const [selectedMarchent, setSelectedMarchent] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  //Api
  const [AddUser, { data, error }] = useUserRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data?.success) {
      setOpen(false);
      SuccessMessage(data?.message);
      reset();
    }
    if (error) {
      setOpen(false);
      ErrorMessage(error?.data?.message);
    }
  }, [data, error, reset, setOpen]);

  const handleSubmitUser = async (data) => {
    await AddUser(data);
  };

  return (
    <section>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white overflow-auto p-5">
        <h1 className="text-2xl font-bold text-orange-500 mb-2">Add User</h1>
        <form onSubmit={handleSubmit(handleSubmitUser)}>
          <div className="grid grid-cols-2 gap-3">
            {UserFormData()?.map((item, idx) => (
              <div key={idx}>
                {item?.type === "select" ? (
                  <FormControl fullWidth>
                    <InputLabel size="small" id="demo-simple-select-label">
                      {item?.label}
                    </InputLabel>
                    <Select
                      {...register(`${item?.name}`, { required: `${item?.label} is Required` })}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      label={item?.label}
                      error={errors[item?.name] ? true : false}
                      value={item.name === "marchentid" ? selectedMarchent : selectedRole}
                      onChange={(e) =>
                        item.name === "marchentid"
                          ? setSelectedMarchent(e.target.value)
                          : setSelectedRole(e.target.value)
                      }
                    >
                      {item?.values?.map((item, idx) => (
                        <MenuItem key={idx} value={item?._id || item}>
                          {item?.hotelName || item?.companyName || item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    {...register(`${item?.name}`, { required: `${item?.label} is Required` })}
                    className="w-full"
                    id="outlined-basic"
                    size="small"
                    label={item?.label}
                    type={item?.type}
                    variant="outlined"
                    error={errors[item?.name] ? true : false}
                  />
                )}
                {errors[item?.name] && (
                  <p className="text-xs text-red-600 mt-1">{errors[item?.name].message}*</p>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold tracking-wide py-2 px-4 rounded-lg mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdduserForm;
