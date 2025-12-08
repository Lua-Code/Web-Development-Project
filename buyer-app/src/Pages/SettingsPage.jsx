import React, { useState } from "react";
import PrivacySection from "../Components/PrivacySection";
import SecuritySection from "../Components/SecuritySection";
import NotificationsSection from "../Components/NotificationsSection";
import SettingsSidebar from "../Components/SettingsSidebar";
import "../App.css";


const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("privacy");

  return (
    <div className="settings-container">

      <SettingsSidebar activesection={activeSection} setactivesection={setActiveSection} />

      <div className="middle-content">
        {activeSection === "privacy" && <PrivacySection />}
        {activeSection === "security" && <SecuritySection />}
        {activeSection === "notifications" && <NotificationsSection />}
      </div>

    </div>
  );
};

export default SettingsPage;
