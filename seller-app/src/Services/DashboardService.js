import DashboardPage from "../Pages/DashboardPage";

const getTabPath = (tabName) => {
    switch(tabName) {
        case "Dashboard":
            return "/";
        case "My Products":
            return "/MyProducts";
        case "Orders":
            return "/Orders";
        case "Analytics":
            return "/Analytics";
        case "Settings":
            return "/Settings";
        default:
            return "/";
    }
};

export {getTabPath} 
