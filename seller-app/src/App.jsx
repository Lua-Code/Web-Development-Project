import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import MainLayout from './Layouts/MainLayout';
import DashboardPage from './Pages/DashboardPage'
import MyProductsPage from './Pages/MyProductsPage'
import OrdersPage from './Pages/OrdersPage'
import AnalyticsPage from './Pages/AnalyticsPage'
import SettingsPage from './Pages/SettingsPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/MyProducts" element={<MyProductsPage />} />
          <Route path="/Orders" element={<OrdersPage />} />
          <Route path="/Analytics" element={<AnalyticsPage />} />
          <Route path="/Settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
