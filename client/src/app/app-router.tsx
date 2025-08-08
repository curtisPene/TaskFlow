import { createBrowserRouter, RouterProvider } from "react-router";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};
