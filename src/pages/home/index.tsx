import { NextPage } from "next";

interface Props { }

const HomePage: NextPage<Props> = () => {

	return (
		<>
			<div>
				<div className="flex justify-between">
					<div>
						<p className="text-2xl text-app-009 font-bold">Home Page</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

