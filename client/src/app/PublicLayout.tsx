import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <>
      <h1>Public Layout</h1>
      <Outlet />
    </>
  );
};
