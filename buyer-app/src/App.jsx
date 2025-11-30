import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import BrowsePage from "./Pages/BrowsePage";
import OrderManagement from "./Pages/MyOrdersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<BrowsePage />} />
          <Route path="/orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
