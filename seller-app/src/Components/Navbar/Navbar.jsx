import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../Avatar";

const Navbar = ({onLogout}) => {
    return(
        <div className="border-b border-[#a8dadc]/30 bg-white">
            <div className= "container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback>TS</AvatarFallback> 
                        </Avatar>
                        <div>
                            <h2 className="text-[#1d3557] font-semibold">Tech Solutions</h2>
                            <p className="text-sm text-[#457b9d]">Seller Account</p>
                        </div>

                    </div>




                </div>
            </div>
        </div>
    )
}

export default Navbar