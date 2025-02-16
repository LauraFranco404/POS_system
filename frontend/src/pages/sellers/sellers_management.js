import { Link } from "react-router-dom"

export default function Sellersmanagement(){
    return (
        <div>
            <Link to = "/">volver</Link>
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