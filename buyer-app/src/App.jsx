import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import BrowsePage from "./Pages/BrowsePage";
import OrderManagement from "./Pages/MyOrdersPage";
// import FeaturedSellers idk yet tbh

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<BrowsePage />} />
          <Route path="/orders" element={<OrderManagement />} />
          {/* <Route path="/sellers" element={<FeaturedSellers />} /> */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
