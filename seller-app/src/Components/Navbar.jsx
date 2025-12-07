import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "./Avatar";

const Navbar = ({ onLogout }) => {
    return (
        <div className="border-b border-[#e5eaf0] bg-white">
            <div className="w-full px-6 py-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback className="bg-[#1d3557] text-white">
                                TS {/*will be replace by our actual seller ;p meow*/}
                            </AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                            <h2 className="text-[#1d3557] font-semibold text-lg"> {/*will be replace by our actual seller ;p meow*/}
                                Tech Solutions
                            </h2>
                            <p className="text-sm text-[#457b9d]">Seller Account</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 border bg-[#f1faee] border-[#457b9d] rounded-sm p-1 px-2 text-[#457b9d] hover:text-[#ffffff] hover:bg-[#e63946] font-medium transition cursor-pointer"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Navbar;