import React, { useEffect, useState } from "react";

const NotificationsSection = () => {
  const [payments, setPayments] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load settings from backend
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();

        if (data?.notifications) {
          setPayments(data.notifications.payments);
          setEmailAlerts(data.notifications.emailAlerts);
        }
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateBackend = async (newPayments, newEmailAlerts) => {
    await fetch("http://localhost:5000/api/settings/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payments: newPayments,
        emailAlerts: newEmailAlerts
      })
    });
  };

  if (loading) return <div className="settings-card">Loading...</div>;

  return (
    <div className="settings-card">
      <h3>Notifications</h3>

      <div
        className="settings-row clickable"
        onClick={() => {
          const newValue = !payments;
          setPayments(newValue);
          updateBackend(newValue, emailAlerts);
        }}
      >
        <span>Payments and Issues</span>
        <span>{payments ? "ON" : "OFF"}</span>
      </div>

      <div
        className="settings-row clickable"
        onClick={() => {
          const newValue = !emailAlerts;
          setEmailAlerts(newValue);
          updateBackend(payments, newValue);
        }}
      >
        <span>Email Alerts</span>
        <span>{emailAlerts ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
};

export default NotificationsSection;
