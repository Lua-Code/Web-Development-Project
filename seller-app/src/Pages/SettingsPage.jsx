import { useState, useEffect } from "react";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [saving, setSaving] = useState(false);

  const [backupUser, setBackupUser] = useState(null);
  const [backupSeller, setBackupSeller] = useState(null);

  // Fetch user and seller data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, sellerRes] = await Promise.all([
          fetch("http://localhost:5000/api/users/me", { credentials: "include" }),
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

  const handleEditProfile = () => {
    setBackupUser(JSON.parse(JSON.stringify(user)));
    setBackupSeller(JSON.parse(JSON.stringify(seller)));
    setEditProfile(true);
  };

  const handleCancelProfile = () => {
    setUser(backupUser);
    setSeller(backupSeller);
    setEditProfile(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updatedLocation = user.addresses[0]
        ? `${user.addresses[0].street}, ${user.addresses[0].city}, ${user.addresses[0].zipCode}, ${user.addresses[0].country}`
        : "";

      // Save user fields
      const userRes = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          profile: {
            phone: user.profile.phone,
            location: updatedLocation,
          },
        }),
      });

      // Save seller fields
      const sellerRes = await fetch("http://localhost:5000/api/seller/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: seller.storeName,
          storeDescription: seller.storeDescription,
        }),
      });

      if (!userRes.ok || !sellerRes.ok) throw new Error("Failed to save settings");

      setEditProfile(false);
    } catch (err) {
      console.error(err);
      alert("Error saving profile. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const currentAddress = user.addresses[0] || {};
  const locationString = `${currentAddress.street || ""}, ${currentAddress.city || ""}, ${currentAddress.zipCode || ""}, ${currentAddress.country || ""}`;

  return (
    <div className="space-y-6 text-left">
      <h2 className="text-xl font-bold text-[#1D3557]">Account Settings</h2>

      <div className="bg-white rounded-xl p-6 space-y-5">
        <h3 className="font-bold text-[#1D3557] border-b pb-2">Seller Profile</h3>

        {/* Shop Name */}
        <div>
          <label>Shop Name</label>
          {editProfile ? (
            <input
              type="text"
              value={seller.storeName}
              onChange={(e) => setSeller({ ...seller, storeName: e.target.value })}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{seller.storeName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          {editProfile ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number</label>
          {editProfile ? (
            <input
              type="text"
              value={user.profile.phone}
              onChange={(e) => setUser({ ...user, profile: { ...user.profile, phone: e.target.value } })}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{user.profile.phone}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label>Location</label>
          {editProfile ? (
            <input
              type="text"
              value={locationString}
              onChange={(e) => {
                const parts = e.target.value.split(",").map((p) => p.trim());
                setUser({
                  ...user,
                  addresses: [
                    {
                      ...currentAddress,
                      street: parts[0] || "",
                      city: parts[1] || "",
                      zipCode: parts[2] || "",
                      country: parts[3] || "",
                    },
                  ],
                });
              }}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{locationString}</p>
          )}
        </div>

        {/* Shop Description */}
        <div>
          <label>Shop Description</label>
          {editProfile ? (
            <textarea
              value={seller.storeDescription}
              onChange={(e) => setSeller({ ...seller, storeDescription: e.target.value })}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{seller.storeDescription}</p>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          {!editProfile ? (
            <button
              onClick={handleEditProfile}
              className="px-5 py-2 rounded-lg bg-[#457B9D] text-white text-sm font-medium cursor-pointer"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-lg bg-[#1D3557] text-white text-sm font-medium cursor-pointer"
                disabled={saving}
              >
                Save
              </button>
              <button
                onClick={handleCancelProfile}
                className="px-5 py-2 rounded-lg bg-gray-300 text-[#1D3557] text-sm font-medium cursor-pointer"
                disabled={saving}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
