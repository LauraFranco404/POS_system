import './App.css';
import Home from "./pages/Home/home"
import Registerseller from './pages/Sellers/register_seller';
import Deleteseller from './pages/Sellers/delete_seller';
import Updateseller from './pages/Sellers/update_seller';
import Inventory from './pages/Inventory/inventory';
import {Routes, Route} from "react-router-dom";
import Sellersmanagement from './pages/Sellers/sellers_management';
import Sales from './pages/Sales/sales';
import NotFound from './pages/NotFound/not_found';
import Login from './pages/Login/login';
import CreateSales from './pages/Sales/create_sales';
import SearchSales from './pages/Sales/search_sales';

function App() {
  return (
    <div className='App'>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>
          <Route index element={<Home />} />
          <Route path="/sellers" element={<Sellersmanagement />}/>
          <Route path="/sellers/registerseller" element={<Registerseller />}/>
          <Route path="/sellers/deleteseller" element={<Deleteseller />}/>
          <Route path="/sellers/updateseller" element={<Updateseller />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/sales" element={<Sales />}/>
          <Route path="/sales/createsales" element={<CreateSales />}/>
          <Route path="/sales/searchsales" element={<SearchSales />}/>
          <Route path="/*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;
