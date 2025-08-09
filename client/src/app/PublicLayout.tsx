import { NavBar } from "@/components/ui/navbar";
import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
