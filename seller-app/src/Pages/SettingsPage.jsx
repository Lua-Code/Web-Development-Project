import { useState, useEffect } from "react";
import FieldArea from "../Components/Settings/FieldArea";
import TextArea from "../Components/Settings/TextArea";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [editShipping, setEditShipping] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch user and seller data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, sellerRes] = await Promise.all([
          fetch("http://localhost:5000/api/user/me", { credentials: "include" }),
          fetch("http://localhost:5000/api/seller/me", { credentials: "include" }),
        ]);

        const userData = await userRes.json();
        const sellerData = await sellerRes.json();

        if (userRes.ok) setUser(userData);
        if (sellerRes.ok) setSeller(sellerData);
      } catch (err) {
        console.error("Failed to fetch settings data:", err);
      }
    };

    fetchData();
  }, []);

  if (!user || !seller) return <div>Loading settings...</div>;

  // Save profile info
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Save user fields
      const userRes = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          phone: user.phone,
          name: user.name,
        }),
      });

      // Save seller fields
      const sellerRes = await fetch("http://localhost:5000/api/seller/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: seller.storeName,
          description: seller.description,
        }),
      });

      if (!userRes.ok || !sellerRes.ok) {
        throw new Error("Failed to save settings");
      }

      setEditProfile(false);
    } catch (err) {
      console.error(err);
      alert("Error saving profile. Check console.");
    } finally {
      setSaving(false);
    }
  };

  // Save shipping info
  const handleSaveShipping = async () => {
    setSaving(true);
    try {
      const sellerRes = await fetch("http://localhost:5000/api/seller/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: seller.shippingAddress,
          processingTime: seller.processingTime,
        }),
      });

      if (!sellerRes.ok) throw new Error("Failed to save shipping settings");

      setEditShipping(false);
    } catch (err) {
      console.error(err);
      alert("Error saving shipping settings. Check console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h2 className="text-xl font-bold text-[#1D3557] text-left">
        Account Settings
      </h2>

      {/* ================= SELLER PROFILE ================= */}
      <div className="bg-white rounded-xl p-6 space-y-5">
        <h3 className="font-bold text-[#1D3557] border-b pb-2">
          Seller Profile
        </h3>

        <FieldArea label="Shop Name" value={seller.storeName} editing={editProfile} onChange={(v) => setSeller({ ...seller, storeName: v })} />
        <FieldArea label="Email" value={user.email} editing={editProfile} onChange={(v) => setUser({ ...user, email: v })} />
        <FieldArea label="Phone Number" value={user.phone} editing={editProfile} onChange={(v) => setUser({ ...user, phone: v })} />
        <FieldArea label="Location" value={seller.location || ""} editing={editProfile} onChange={(v) => setSeller({ ...seller, location: v })} />
        <TextArea label="Shop Description" value={seller.description} editing={editProfile} onChange={(v) => setSeller({ ...seller, description: v })} />

        <button 
          onClick={editProfile ? handleSaveProfile : () => setEditProfile(true)}
          className="mt-4 px-5 py-2 rounded-lg bg-[#457B9D] text-white  text-sm font-medium cursor-pointer"
          disabled={saving}
        >
          {editProfile ? "Save Profile" : "Edit Profile"}
        </button>
      </div>

      {/* ================= SHIPPING SETTINGS ================= */}
      <div className="bg-white rounded-xl p-6 space-y-5">
        <h3 className="font-bold text-[#1D3557] border-b pb-2 ">
          Shipping Settings
        </h3>

        <FieldArea label="Ship From Address" value={seller.shippingAddress || ""} editing={editShipping} onChange={(v) => setSeller({ ...seller, shippingAddress: v })} />
        <FieldArea label="Typical Processing Time" value={seller.processingTime || ""} editing={editShipping} onChange={(v) => setSeller({ ...seller, processingTime: v })} />

        <button
          onClick={editShipping ? handleSaveShipping : () => setEditShipping(true)}
          className="mt-4 px-5 py-2 rounded-lg bg-[#457B9D] text-white text-sm font-medium cursor-pointer"
          disabled={saving}
        >
          {editShipping ? "Save Shipping Settings" : "Edit Shipping Settings"}
        </button>
      </div>
    </div>
  );
}
