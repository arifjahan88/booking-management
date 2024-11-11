import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AdduserForm from "./AdduserForm";
import { useGetAllUsersQuery } from "../../../Redux/Api/endpoints/userApi";

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: AllUsers, isLoading: AllUserLoading } = useGetAllUsersQuery();

  return (
    <section>
      <div className="text-center">
        <button
          onClick={handleOpen}
          className="group relative inline-flex items-center overflow-hidden rounded bg-cyan-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-cyan-500"
        >
          <span className="absolute -end-full transition-all group-hover:end-4">
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
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4"> Add User </span>
        </button>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-300 max-w-4xl mx-auto shadow-xl rounded-lg bg-white p-3 border mt-5"
      >
        {AllUserLoading ? (
          "Loading"
        ) : (
          <>
            {AllUsers?.data?.map((user, idx) => (
              <li key={idx} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-md bg-gray-50 border scale-110"
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1715424006~exp=1715427606~hmac=c482612cb0ccec15f86aa439c2f303b930b78741a27ded339a403b6bc6d01db2&w=740"
                    alt="image"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg  font-semibold leading-6 text-teal-900">
                      {user.fullname}
                    </p>
                    <p className="truncate text-xs leading-5 text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-md leading-6 text-gray-900">{user?.marchentid?.hotelName}</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Active</p>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <>
          <AdduserForm setOpen={setOpen} />
        </>
      </Modal>
    </section>
  );
};

export default AddUser;
