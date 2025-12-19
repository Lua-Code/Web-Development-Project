import React, { useEffect, useState } from "react";

const PrivacySection = () => {
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();

        if (data?.privacy?.profileVisibility) {
          setVisibility(data.privacy.profileVisibility);
        }
      } catch (err) {
        console.error("Failed to load privacy", err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateVisibility = async (newValue) => {
    setVisibility(newValue);

    await fetch("http://localhost:5000/api/settings/privacy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileVisibility: newValue })
    });
  };

  if (loading) return <div className="settings-card">Loading...</div>;

  return (
    <div className="settings-card">
      <h3>Privacy</h3>

      <div className="settings-row">
        <span>Profile Visibility</span>

        <select
          value={visibility}
          onChange={(e) => updateVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
    </div>
  );
};

export default PrivacySection;
