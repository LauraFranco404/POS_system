import './App.css';
import Home from "./pages/Home/home"
import Registerseller from './pages/sellers/register_seller';
import Deleteseller from './pages/sellers/delete_seller';
import Updateseller from './pages/sellers/update_seller';
import Inventory from './pages/Inventory/inventory';
import {Routes, Route} from "react-router-dom";
//import Navbar from './components/nav_bar';
import Sellersmanagement from './pages/sellers/sellers_management';
import Sales from './pages/Sales/sales';
import NotFound from './pages/NotFound/NotFound';
function App() {
  return (
    <div className='App'>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route index element={<Home />} />
          <Route path="/sellers" element={<Sellersmanagement />}/>
          <Route path="/sellers/registerseller" element={<Registerseller />}/>
          <Route path="/sellers/deleteseller" element={<Deleteseller />}/>
          <Route path="/sellers/updateseller" element={<Updateseller />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/sales" element={<Sales />}/>
          <Route path="/*" element={<NotFound />} /> {/* Ruta 404 */}
      
      </Routes>
    </div>
  );
}

export default App;
