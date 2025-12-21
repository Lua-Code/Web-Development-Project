import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [backup, setBackup] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen bg-[#F3F8F0] flex items-center justify-center">
        Loading profile...
      </div>
    );

  const currentAddress = user.addresses?.[0] || {};
  const locationString = `${currentAddress.street || ""}, ${currentAddress.city || ""}, ${currentAddress.zipCode || ""}, ${currentAddress.country || ""}`;

  const handleEdit = () => {
    setBackup(JSON.parse(JSON.stringify(user)));
    setEdit(true);
  };

  const handleCancel = () => {
    setUser(backup);
    setEdit(false);
    setBackup(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          profile: {
            firstName: user.profile.firstName || "",
            lastName: user.profile.lastName || "",
            phone: user.profile?.phone || "",
          },
          addresses: user.addresses,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setUser(data);
      setEdit(false);
      setBackup(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const labelCls = "text-[15px] font-semibold text-[#1F2A44] text-left block";
  const inputBase =
    "w-full h-11 rounded-md border border-gray-300 bg-white px-4 text-[15px] text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cfd8dc] focus:border-gray-300";
  const inputReadOnly = "bg-white text-gray-700";

  return (
    <div className="min-h-screen bg-[#F3F8F0]">
      

      <div className="px-6 py-14 flex justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg px-10 py-12">
          <h1 className="text-center text-3xl font-extrabold text-[#1F2A44] mb-10">
            Profile
          </h1>

          <div className="space-y-6">
            <div>
              <label className={labelCls}>Name:</label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className={`${inputBase} ${!edit ? inputReadOnly : ""}`}
                  value={user.profile?.firstName || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      profile: {
                        ...user.profile,
                        firstName: e.target.value,
                      },
                    })
                  }
                  placeholder="First name"
                  disabled={!edit}
                />
                <input
                  className={`${inputBase} ${!edit ? inputReadOnly : ""}`}
                  value={user.profile?.lastName || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      profile: {
                        ...user.profile,
                        lastName: e.target.value,
                      },
                    })
                  }
                  placeholder="Last name"
                  disabled={!edit}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Email:</label>
              <div className="mt-2">
                <input
                  className={`${inputBase} ${!edit ? inputReadOnly : ""}`}
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  disabled={!edit}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Password:</label>
              <div className="mt-2">
                <input
                  className={inputBase}
                  placeholder="••••••••"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  disabled={!edit}
                  type="password"
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Shipping Address:</label>
              <div className="mt-2">
                <input
                  className={`${inputBase} ${!edit ? inputReadOnly : ""}`}
                  value={locationString}
                  onChange={(e) => {
                    const parts = e.target.value
                      .split(",")
                      .map((p) => p.trim());
                    setUser({
                      ...user,
                      addresses: [
                        {
                          street: parts[0] || "",
                          city: parts[1] || "",
                          zipCode: parts[2] || "",
                          country: parts[3] || "",
                        },
                      ],
                    });
                  }}
                  disabled={!edit}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Phone:</label>
              <div className="mt-2">
                <input
                  className={`${inputBase} ${!edit ? inputReadOnly : ""}`}
                  value={user.profile?.phone || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      profile: { ...user.profile, phone: e.target.value },
                    })
                  }
                  disabled={!edit}
                />
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              {!edit ? (
                <button
                  onClick={handleEdit}
                  className="h-12 px-8 rounded-md bg-[#E34B4B] text-white font-semibold shadow-md"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="h-12 px-8 rounded-md bg-[#1F2A44] text-white font-semibold shadow-md disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="h-12 px-8 rounded-md bg-gray-200 text-[#1F2A44] font-semibold shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}