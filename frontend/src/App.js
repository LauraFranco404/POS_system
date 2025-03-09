import './App.css';
import Home from "./pages/Home/home";
import Registerseller from './pages/Sellers/register_seller';
import Deleteseller from './pages/Sellers/delete_seller';
import Updateseller from './pages/Sellers/update_seller';
import Inventory from './pages/Inventory/inventory';
import { Routes, Route, Navigate } from "react-router-dom";
import Sellersmanagement from './pages/Sellers/sellers_management';
import Sales from './pages/Sales/sales';
import NotFound from './pages/NotFound/not_found';
import Login from './pages/Login/login';
import CreateSales from './pages/Sales/create_sales';
import SearchSales from './pages/Sales/search_sales';
import Inaccessible from './pages/Inaccesible/inaccesible';
import { useState, useEffect } from 'react';

function App() {
  // Estado para manejar los datos del usuario
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("user")));

  // Actualizar userData cuando cambia sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserData(JSON.parse(sessionStorage.getItem("user")));
    };

    // Detectar cambios en sessionStorage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup del event listener
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isAdmin = userData?.type === "admin";
  const isLoggedIn = !!userData;

  console.log(userData);

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route index element={<Home />} />
        {/* Inaccesibles sin logearse */}
        <Route path="/sales" element={isLoggedIn ? <Sales /> : <Inaccessible />} />
        <Route path="/sales/createsales" element={isLoggedIn ? <CreateSales /> : <Inaccessible />} />
        <Route path="/sales/searchsales" element={isLoggedIn ? <SearchSales /> : <Inaccessible />} />
        {/* Inaccesibles sin logearse y sin ser admin */}
        <Route path="/sellers" element={isAdmin ? <Sellersmanagement /> : <Inaccessible />} />
        <Route path="/sellers/registerseller" element={isAdmin ? <Registerseller /> : <Inaccessible />} />
        <Route path="/sellers/deleteseller" element={isAdmin ? <Deleteseller /> : <Inaccessible />} />
        <Route path="/sellers/updateseller" element={isAdmin ? <Updateseller /> : <Inaccessible />} />
        <Route path="/inventory" element={isAdmin ? <Inventory /> : <Inaccessible />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
