import { useState } from "react";
import FieldArea from "../Components/Settings/FieldArea"
import TextArea from "../Components/Settings/TextArea"
export default function Settings() {
    const [editProfile, setEditProfile] = useState(false);
    const [editShipping, setEditShipping] = useState(false);

    return (
        <div className="space-y-6 text-left">
            <h2 className="text-xl font-bold text-[#1D3557] text-left">
                Account Settings
            </h2>

            {/* ================= SELLER PROFILE ================= */}
            <div className="bg-white rounded-xl p-6 space-y-5">
                <h3 className="font-medium text-[#1D3557] ">
                    Seller Profile
                </h3>

                <FieldArea
                    label="Shop Name"
                    value="Tech Solutions"
                    editing={editProfile}
                />
                <FieldArea
                    label="Email"
                    value="seller@techsolutions.com"
                    editing={editProfile}
                />
                <FieldArea
                    label="Phone Number"
                    value="+1 (555) 123-4567"
                    editing={editProfile}
                />
                <FieldArea
                    label="Location"
                    value="New York, NY"
                    editing={editProfile}
                />
                <TextArea
                    label="Shop Description"
                    value="Premium electronics and gadgets. Fast shipping and excellent customer service."
                    editing={editProfile}
                />

                <button 
                    onClick={() => setEditProfile(!editProfile)}
                    className="mt-4 px-5 py-2 rounded-lg bg-[#457B9D] text-white  text-sm font-medium "
                >
                    {editProfile ? "Save Profile" : "Edit Profile"}
                </button>
            </div>

            {/* ================= SHIPPING SETTINGS ================= */}
            <div className="bg-white rounded-xl p-6 space-y-5">
                <h3 className="font-medium text-[#1D3557] ">
                    Shipping Settings
                </h3>

                <FieldArea
                    label="Ship From Address"
                    value="123 Business St, New York, NY 10001"
                    editing={editShipping}
                />

                <FieldArea
                    label="Typical Processing Time"
                    value="1–2 Business Days"
                    editing={editShipping}
                />

                <button
                    onClick={() => setEditShipping(!editShipping)}
                    className="mt-4 px-5 py-2 rounded-lg bg-[#457B9D] text-white text-sm font-medium"
                >
                    {editShipping ? "Save Shipping Settings" : "Edit Shipping Settings"}
                </button>
            </div>
        </div>
    );
}


