import React, { useState } from "react";

const SecuritySection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/settings/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setMessage(data.message);
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      setError("Failed to change password");
    }
  };

  return (
    <div className="settings-card">
      <h3>Security</h3>

      <div className="settings-row column">
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleChangePassword}>
          Change Password
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SecuritySection;
