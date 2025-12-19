import React from "react";

const SettingsSidebar = ({ activesection, setactivesection }) => {
  return (
    <aside className="left-side">
      <div
        className={`sidebar-item ${activesection === "privacy" ? "active" : ""}`}
        onClick={() => setactivesection("privacy")}
      >
        Privacy
      </div>

      <div
        className={`sidebar-item ${activesection === "notifications" ? "active" : ""}`}
        onClick={() => setactivesection("notifications")}
      >
        Notifications
      </div>

      <div
        className={`sidebar-item ${activesection === "security" ? "active" : ""}`}
        onClick={() => setactivesection("security")}
      >
        Security
      </div>
    </aside>
  );
};

export default SettingsSidebar;
