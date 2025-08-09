import { TaskFlow } from "./icons/taskflow";
import { AlignJustify } from "lucide-react";

export const NavBar = () => {
  return (
    <>
      <div className="flex justify-between py-4 px-2 shadow-md items-center">
        <TaskFlow />
        <AlignJustify />
      </div>
    </>
  );
};
