import { Link } from "react-router-dom"
import Barra from "../../components/Barra/Barra";

export default function Sellersmanagement(){
    return (
        <div>
            <Barra/>
            <div>
                <span>Sellers management</span>
            </div>
            <ul>
                <li><Link to="/sellers/registerseller">Registrar vendedores</Link></li>
                <li><Link to="/sellers/deleteseller">Borrar vendedores</Link></li>
                <li><Link to="/sellers/updateseller">Actualizar vendedores</Link></li>
            </ul>
        </div>
    )
}