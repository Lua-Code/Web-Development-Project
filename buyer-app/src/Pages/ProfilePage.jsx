import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "Pavly",
    email: "bavlysedhom@gmail.com",
    password: "123456-Pavly",
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

        {["name", "email", "password", "shippingAddress"].map((field) => (
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
              value={user[field]}
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
              onClick={() => {
                setEdit(false);
                setBackup(null);
              }}
              style={{
                background: "#1D3557",
                color: "#F1FAEE",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Save
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
