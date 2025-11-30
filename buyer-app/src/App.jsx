import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import HomePage from "./Pages/HomePage";
import BrowsePage from "./Pages/BrowsePage";
import OrderManagement from "./Pages/MyOrdersPage";
import LoginPage from "./Pages/LoginPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<BrowsePage />} />
          <Route path="/orders" element={<OrderManagement />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
