import "./inventory.css"
import Barra from "../../components/Barra/Barra"
//import { Link } from "react-router-dom"
import TableComponent from "../../components/Modal/Inventory_element/inventory_element"

export default function Storeinventory(){

    //var elements = [{productid: 1, name: "queso", amount: 10, unitprice: 1}, {productid: 2, name: "chocolate", amount: 20, unitprice: 4}]

    return (
    <div>
        <Barra/>
        <div className="texto">
            <h1>
                Manejo de inventario
            </h1>
        </div>
        <div>
            <TableComponent />
        </div>
        
    </div>
    )
}