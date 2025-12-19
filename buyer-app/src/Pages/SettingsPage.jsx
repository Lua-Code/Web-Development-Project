import React, { useState } from "react";

function SettingsPage() {
  const [user, setUser] = useState({
    name: "Pavly",
    email: "bavlysedhom@gmail.com",
    shippingAddress: "106 Tomanbai",
  });

  const [edit, setEdit] = useState(false);
  const [backup, setBackup] = useState(null);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div style={{ background: "#F1FAEE", minHeight: "100vh", padding: "40px" }}>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ color: "#1D3557", marginBottom: "20px" }}>
          Profile Information
        </h2>

        {["name", "email", "shippingAddress"].map((field) => (
          <div key={field} style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#1D3557",
                fontWeight: "600",
              }}
            >
              {field === "shippingAddress" ? "Shipping Address" : field}
            </label>

            <input
              name={field}
              value={user[field]}
              disabled={!edit}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: edit ? "white" : "#F1FAEE",
              }}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {!edit ? (
            <button
              onClick={() => {
                setBackup(user);
                setEdit(true);
              }}
              style={btn("#E63946")}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEdit(false)}
                style={btn("#1D3557")}
              >
                Save
              </button>

              <button
                onClick={() => {
                  setUser(backup);
                  setEdit(false);
                }}
                style={btn("#A8A8A8", "#1D3557")}
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

const btn = (bg, color = "#F1FAEE") => ({
  flex: 1,
  padding: "10px",
  backgroundColor: bg,
  color,
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
});

export default SettingsPage;
