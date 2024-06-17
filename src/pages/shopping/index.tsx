import { NextPage } from "next";
interface Props { }

const ShoppingPage: NextPage<Props> = () => {

  return (
    <>
      <div className="mb-5">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl text-app-009 font-bold">Shopping</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingPage;