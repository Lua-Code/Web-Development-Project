import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
    const handleLogout = () => {
        /* authentication logic later ba2a ie. clearing el auth token etc*/

        window.location.href = 'http://localhost:5173/'; /* should be replaced by za buyer URL */
    }
    return (
        <div className="flex flex-col min-h-screen bg-[#f1faee]">
            <Navbar onLogout = {handleLogout} />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
