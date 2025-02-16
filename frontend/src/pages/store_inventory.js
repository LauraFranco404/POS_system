import { Link } from "react-router-dom"
import Inventoryelement from "../components/inventory_element"

export default function Storeinventory(){
    return (
    <div>
        <Link to = "/">volver</Link>
        <div>
            <span>Manejo de inventario</span>
        </div>
        <div>
            <Inventoryelement></Inventoryelement>
        </div>
    </div>
    )
}