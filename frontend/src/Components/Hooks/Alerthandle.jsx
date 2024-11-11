import Swal from "sweetalert2";

export const SuccessMessage = (message) => {
  return Swal.fire({
    title: message || "Something Went Wrong",
    icon: "success",
    showConfirmButton: true,
  });
};

export const SuccessMessageTimer = (message) => {
  return Swal.fire({
    title: message || "Something Went Wrong",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
};

export const ErrorMessage = (message) => {
  return Swal.fire({
    title: "Error",
    text: message || "SomeThing Went Wrong",
    icon: "error",
    showConfirmButton: true,
  });
};

export const CheckDeleteMessage = async ({ onConfirm }) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#06d6a0",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
export const CheckUpdateMessage = async ({ onConfirm }) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f77f00",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
