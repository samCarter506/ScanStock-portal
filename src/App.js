import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./Pages/Login/Login";
import MainLayout from "./Pages/Layout/MainLayout";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Products from "./Pages/Products/Products"
import Suppliers from "./Pages/Suppliers/Supplier";
import Receipts from "./Pages/Receipts/Receipts";
import Locations from "./Pages/Locations/Locations";
import Customers from "./Pages/Customers/Customers";
import Users from "./Pages/Users/Users";
import Scanner from "./Pages/Products/ScanBarcode";
import Reports from "./Pages/Reports/Reports";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Outbound from "./Pages/Outbound/Outbound";
//import Outbound from "./Pages/Outbound/Outbound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

         <Route element={<MainLayout />}>
         <Route path="/scanner" element={<Scanner />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/outbound" element={<Outbound />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/customers" element={<Customers />} />
  
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;