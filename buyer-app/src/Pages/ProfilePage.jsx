import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [backup, setBackup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
        setUser({ ...data, shippingAddress: data.profile?.shippingAddress });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...user,
          profile: { ...user.profile, shippingAddress: user.shippingAddress },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save profile");
      setEdit(false);
      setBackup(null);
      setUser({ ...data, shippingAddress: data.profile?.shippingAddress }); // update with latest from server
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div style={{ background: "#F1FAEE", minHeight: "100vh", padding: "40px" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontWeight: "600", fontSize: "28px", color: "#1D3557", marginBottom: "25px" }}>
          Profile
        </h1>

        {["username", "email", "password", "shippingAddress"].map((field) => (
          <div key={field} style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#1D3557",
                fontWeight: "600",
              }}
            >
              {field === "shippingAddress"
                ? "Shipping Address"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={user[field] || ""}
              disabled={!edit}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: edit ? "#fff" : "#f5f5f5",
              }}
            />
          </div>
        ))}

        {!edit ? (
          <button
            onClick={() => {
              setBackup(user);
              setEdit(true);
            }}
            style={{
              background: "#E63946",
              color: "#F1FAEE",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Edit Profile
          </button>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSave}
              style={{
                background: "#1D3557",
                color: "#F1FAEE",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setUser(backup);
                setEdit(false);
                setBackup(null);
              }}
              style={{
                background: "#ccc",
                color: "#1D3557",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
