import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import bg from "./assets/bg.png";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "./Redux/Features/userInfoSlice";

function App() {
  // const dispatch = useDispatch();

  // //Clear user data on page refresh
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!window.opener && event.target === window.self) {
  //       // Clear localStorage data
  //       dispatch(addUser({}));
  //     }
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [dispatch]);

  return (
    <>
      <div className="fixed -z-50 w-full h-full" style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-white h-full w-full z-0 bg-opacity-90"></div>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
