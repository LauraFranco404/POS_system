import './App.css';
import Home from "./pages/home"
import Registerseller from './pages/sellers/register_seller';
import Deleteseller from './pages/sellers/delete_seller';
import Updateseller from './pages/sellers/update_seller';
import Storeinventory from './pages/store_inventory';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/nav_bar';
import Sellersmanagement from './pages/sellers/sellers_management';
import Sales from './pages/sales';

function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route index element={<Home />} />
          <Route path="/sellers" element={<Sellersmanagement />}/>
          <Route path="/sellers/registerseller" element={<Registerseller />}/>
          <Route path="/sellers/deleteseller" element={<Deleteseller />}/>
          <Route path="/sellers/updateseller" element={<Updateseller />}/>
          <Route path="/inventory" element={<Storeinventory />}/>
          <Route path="/sales" element={<Sales />}/>
      </Routes>
    </div>
  );
}

export default App;
