//LIBS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//LAYOUTS
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";

//PAGES
import HomePage from "./Pages/HomePage";
import BrowsePage from "./Pages/BrowsePage";
import OrderManagement from "./Pages/MyOrdersPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingsPage";
import RegisterPage from "./Pages/RegisterPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import MyOrdersPage from "./Pages/MyOrdersPage";
import ProfilePage from "./Pages/ProfilePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<BrowsePage />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
