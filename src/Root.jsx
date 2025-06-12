// import { Outlet } from "react-router";
import Home from "./Pages/Home/Home";

const Root = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#43577a] to-[#111e31] text-white">
            <section className="max-w-[1240px] min-h-screen  mx-auto">
                <div className="pt-4">
                    <Home />
                </div>
            </section>
        </div>
    );
};

export default Root;