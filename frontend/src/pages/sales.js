import { Link } from "react-router-dom"
import Saleelement from "../components/sale_element"

export default function Sales(){
    var sales = [ 
        {id: 1, products: [{productid: 1, name: "queso", amount: 1, unitprice: 2},{productid: 2, name: "chocolate", amount: 3, unitprice: 4}], total: 150},
        {id: 2, products: [{productid: 3, name: "cebolla", amount: 5, unitprice: 6},{productid: 4,name: "agua", amount: 7, unitprice: 8}], total: 100}
    ]

    return (
    <div>
        <Link to = "/">volver</Link>
        <div>
            <span>Ventas</span>
        </div>
        <div>
            {
                sales.map((sale) => (
                    <Saleelement key = {sale.id} sale = {sale}></Saleelement>
                ))
            }
        </div>
    </div>
    )
}