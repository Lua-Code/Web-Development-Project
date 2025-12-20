import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import MyProductsPage from "./Pages/MyProductsPage";
import OrdersPage from "./Pages/OrdersPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import SettingsPage from "./Pages/SettingsPage";
import EditProduct from "./Components/My Products/EditProduct";
import AddProductButton from "./Components/My Products/AddProductButton.jsx";



import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import MyProductsPage from './Pages/MyProductsPage'
import OrdersPage from './Pages/OrdersPage'
import AnalyticsPage from './Pages/AnalyticsPage'
import SettingsPage from './Pages/SettingsPage'
import CreateShopPage from './Pages/CreateShopPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/Myproducts" element={<MyProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/add-listing" element={<AddProductButton />} />

        <Route element = {<AuthLayout/>}>
          <Route path="/login" element = {<LoginPage/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
          <Route path="/create-shop" element = {<CreateShopPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
