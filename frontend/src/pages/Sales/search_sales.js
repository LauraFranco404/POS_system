import { Link } from "react-router-dom"
import Saleelement from "../../components/SalesPanel/sale_element"
import Navbar from "../../components/Navbar/Navbar";
import SalesSideBar from "../../components/SalesPanel/sales_sidebar";
import './sales.css'

export default function SearchSales(){
    var sales = [ 
        {sellerid: 1, clientid: 1, products: [{productid: 1, name: "queso", amount: 1, unitprice: 2},{productid: 2, name: "chocolate", amount: 3, unitprice: 4}]},
        {sellerid: 1, clientid: 1, products: [{productid: 3, name: "cebolla", amount: 5, unitprice: 6},{productid: 4,name: "agua", amount: 7, unitprice: 8}]}
    ]
    return (
    <div>
        <Navbar/>
        <div className="sales-container">
            <SalesSideBar className = "bar-skip"></SalesSideBar>
            {/*
            <div className="bar-skip fitright">
                <div  className="sales-content">
                {
                    sales.map((sale) => (
                        <Saleelement key = {sale.id} sale = {sale}></Saleelement>
                    ))
                }
                </div>
            </div>
            */}
        </div>
    </div>
    )
}