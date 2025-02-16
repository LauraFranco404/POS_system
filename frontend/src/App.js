import './App.css';
import Home from "./pages/home"
import Registerseller from './pages/register_seller';
import Deleteseller from './pages/delete_seller';
import Updateseller from './pages/update_seller';
import {Routes, Route} from "react-router";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route index element={<Home />} />
        <Route path="/registerseller" element={<Registerseller />}/>
        <Route path="/deleteseller" element={<Deleteseller />}/>
        <Route path="/updateseller" element={<Updateseller />}/>
    </Routes>
  );
}

export default App;
