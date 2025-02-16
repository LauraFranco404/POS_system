import { Link } from "react-router-dom"
import Inventoryelement from "../components/inventory_element"

export default function Storeinventory(){

    var elements = [{productid: 1, name: "queso", amount: 10, unitprice: 1}, {productid: 2, name: "chocolate", amount: 20, unitprice: 4}]

    return (
    <div>
        <Link to = "/">volver</Link>
        <div>
            <span>Manejo de inventario</span>
        </div>
        <div>
            {
                elements.map((product) => (
                    <Inventoryelement product = {product}></Inventoryelement>
                ))
            }
        </div>
    </div>
    )
}