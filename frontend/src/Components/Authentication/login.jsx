import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/loginimage.png";
import { useSuperUserLoginMutation, useUserloginMutation } from "../../Redux/Api/endpoints/userApi";
import { ErrorMessage } from "../Hooks/Alerthandle";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/Features/userInfoSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    loginUser,
    { data: loginData, error: loginError, isLoading: userLoading, reset: userreset },
  ] = useUserloginMutation();
  const [
    loginSuperUser,
    {
      data: superUserData,
      isLoading: superUserloding,
      error: superUserError,
      reset: superuserreset,
    },
  ] = useSuperUserLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loginData?.success || superUserData?.success) {
      dispatch(addUser(loginData?.data || superUserData?.data));
      Swal.fire({
        title: "Success",
        text: loginData?.message || superUserData?.message,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    }
    if (loginError || superUserError)
      ErrorMessage(loginError?.data?.message || superUserError?.data?.message);
  }, [loginData, loginError, navigate, dispatch, superUserData, superUserError]);

  const onSubmit = async (data) => {
    if (data.email === "admin@gmail.com") {
      userreset();
      await loginSuperUser(data);
    } else {
      superuserreset();
      await loginUser(data);
    }
    console.log(data);
  };
  return (
    <div>
      <section className="bg-gray-100 min-h-screen flex justify-center items-center text-secondary">
        <div className="bg-gray-200 grid grid-cols-1 md:grid-cols-2 gap-20 items-center rounded-2xl shadow-lg max-w-5xl md:p-20 p-5">
          <div className="md:w-full">
            <h2 className="font-bold text-2xl text-secondary">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <input
                  className="p-3 rounded-xl border w-full mt-10"
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                />
                {errors.email && <span className="text-orange-600 text-sm">Email is required</span>}
              </div>
              <div className="relative">
                <input
                  className="p-3 rounded-xl border w-full "
                  type="password"
                  name="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-orange-600 text-sm">Password is required</span>
                )}
              </div>
              <div className="flex gap-5">
                <button
                  type="submit"
                  className="bg-green-500 bg-opacity-100 hover:bg-opacity-60 duration-300 rounded-xl text-white py-2 font-bold w-full text-2xl"
                >
                  {userLoading || superUserloding ? (
                    <div className="flex justify-center gap-1">
                      <span>Loading. . .</span>
                      {/* <PulseLoader className="mt-3" color="#ffffff" margin={2} size={5} /> */}
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            <p className="text-center text-xs border-b py-6">Forgot your password</p>
          </div>

          <div>
            <img src={logo} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
