import { LandingPage } from "@/features/auth/components/LandingPage";
import { LoginPage } from "@/features/auth/components/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicLayout } from "./PublicLayout";
import { RegistrationPage } from "@/features/auth/components/RegistrationPage";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <RegistrationPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
