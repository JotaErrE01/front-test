import { MainLayout } from "@/layouts/MainLayout";
import { CreateUserPage } from "@/pages/CreateUserPage";
import { HomePage } from "@/pages/HomePage";
import { LogsPage } from "@/pages/LogsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create-user",
        element: <CreateUserPage />,
      },
      {
        path: '/register',
        element: <LogsPage />,
      }
    ]
  },
]);
