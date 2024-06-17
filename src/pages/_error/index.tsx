import { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "@/utils/state/app";

interface Props {}

const ProjectsEquipment: NextPage<Props> = ({}) => {
  const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);

  return (
    <>
      <div>
        <div className="flex flex-row w-fill mt-6 justify-center">
          <img src="/images/404 Not Found.jpg" width={500} height={500}></img>
        </div>
        <div className="flex flex-row w-fill mt-6 justify-center">
          <p className="font-bold text-sm">OOPS! Page Not Found</p>
        </div>
        <div className="flex flex-row w-fill mt-5 justify-center">
          <a className="border-solid border-2 text-sm border-[#163355] rounded-full bg-[#163355] px-5 py-2 text-white hover:bg-white hover:text-[#163355] transition-colors duration-300" href="/">
            BACK TO HOME
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectsEquipment;
