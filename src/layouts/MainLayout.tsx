import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] gap-8 flex-col">
      <Outlet />
    </div>
  )
};
