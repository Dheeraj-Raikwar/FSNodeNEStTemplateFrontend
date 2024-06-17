import { NextPage } from "next";
import Link from 'next/link';
import AUButton from "@/components/ui/AUButton";

interface Props {}

const SettingsPage: NextPage<Props> = () => {
    return (
      <>
        <div>
          <div className="flex justify-between">
            <div>
              <p className="text-2xl text-app-009 font-bold">Settings</p>
            </div>
            {/* <Link href="/some-other-page">
                <AUButton buttontype='default'>Book Resource</AUButton>
            </Link> */}
          </div>
          {/* <div className="flex flex-col w-fill mt-8">
            <p>Resourcing Booking Calendar</p>
          </div> */}
        </div>
      </>
    );
  };
  
  export default SettingsPage;