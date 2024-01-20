import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.tsx";

export const Layout = () => {
    return (
        <div className="">

            <div className="flex-col z-50 flex">
                <Header/>
                <div className="px-[20%]">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};
