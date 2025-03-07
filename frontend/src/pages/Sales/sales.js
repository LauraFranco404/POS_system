import { Link } from "react-router-dom"
import Saleelement from "../../components/SalesPanel/sale_element"
import Navbar from "../../components/Navbar/Navbar"
import SalesSideBar from "../../components/SalesPanel/sales_sidebar"
import './sales.css'
import { useState } from "react"

export default function Sales() {

    const [filter, setFilter] = useState("all"); // Estado para el dropdown

    var sales = [ 
        {sellerid: 1, clientid: 1, products: [{productid: 1, name: "queso", amount: 1, unitprice: 2}, {productid: 2, name: "chocolate", amount: 3, unitprice: 4}]},
        {sellerid: 1, clientid: 1, products: [{productid: 3, name: "cebolla", amount: 5, unitprice: 6}, {productid: 4, name: "agua", amount: 7, unitprice: 8}]}
    ];

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // Cambia el filtro según el dropdown
    };

    return (
        <div>
            <Navbar />
            <div className="sales-container">
                <SalesSideBar className="bar-skip"></SalesSideBar>
                <div className="bar-skip fitright">
                    <div className="sales-content">
                        <div className="sales-header">
                            <h2 className="sales-title">Sales History</h2>
                            <select className="sales-filter-dropdown" value={filter} onChange={handleFilterChange}>
                                <option value="today">Today</option>
                                <option value="last-week">Last Week</option>
                                <option value="last-month">Last Month</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        {
                            sales.map((sale, index) => (
                                <Saleelement key={index} sale={sale}></Saleelement>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
