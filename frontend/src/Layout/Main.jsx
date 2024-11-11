import { Outlet } from "react-router-dom";
import OuterDesign from "./OuterDesign";

const Main = () => {
  return (
    <>
      <OuterDesign>
        <Outlet />
      </OuterDesign>
    </>
  );
};

export default Main;
