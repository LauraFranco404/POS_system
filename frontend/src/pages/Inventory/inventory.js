import "./inventory.css"
import Barra from "../../components/Barra/Barra"
import Inventoryelement from "../../components/inventory_element"
//import { Link } from "react-router-dom"

export default function Storeinventory(){

    var elements = [{productid: 1, name: "queso", amount: 10, unitprice: 1}, {productid: 2, name: "chocolate", amount: 20, unitprice: 4}]

    return (
    <div>
        <Barra/>
        <div>
            <span>Manejo de inventario</span>
        </div>
        <div>
            {
                elements.map((product) => (
                    <Inventoryelement key = {product.productid} product = {product}></Inventoryelement>
                ))
            }
        </div>
    </div>
    )
}