import { Link } from "react-router-dom";
import Saleelement from "../../components/SalesPanel/sale_element";
import Navbar from "../../components/Navbar/Navbar";
import SalesSideBar from "../../components/SalesPanel/sales_sidebar";
import "./sales.css";
import { useState, useEffect } from "react";

export default function Sales() {
    const [filter, setFilter] = useState("all");        // Estado para el dropdown
    const [sales, setSales] = useState([]);              // Estado para las ventas
    const [loading, setLoading] = useState(true);        // Estado para el indicador de carga

    // Maneja los cambios en el filtro del dropdown
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Obtiene las ventas según el filtro seleccionado
    const fetchSales = async () => {
        setLoading(true);  // Activa el indicador de carga
        let url = "";

        // Selecciona la URL según el filtro
        switch (filter) {
            case "today":
                url = "http://127.0.0.1:8000/getsalestoday/";
                break;
            case "last-week":
                url = "http://127.0.0.1:8000/getsalesthisweek/";
                break;
            case "last-month":
                url = "http://127.0.0.1:8000/getsalesthismonth/";
                break;
            case "all":
            default:
                url = "http://127.0.0.1:8000/getallsales/";
                break;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                alert("Failed to fetch sales data!");
                setSales([]);
            } else {
                const data = await response.json();
                console.log(data);
                setSales(data || []);  // Asigna los datos obtenidos
            }
        } catch (error) {
            console.error("Error fetching sales:", error);
            alert("Error fetching sales data!");
            setSales([]);
        } finally {
            setLoading(false);  // Desactiva el indicador de carga
        }
    };

    // Efecto que ejecuta la consulta cada vez que cambia el filtro
    useEffect(() => {
        fetchSales();
    }, [filter]);

    return (
        <div>
            <Navbar />
            <div className="sales-container">
                <SalesSideBar className="bar-skip"></SalesSideBar>
                <div className="bar-skip fitright">
                    <div className="sales-content">
                        <div className="sales-header">
                            <h2 className="sales-title">Sales History</h2>
                            <select
                                className="sales-filter-dropdown"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="today">Today</option>
                                <option value="last-week">Last Week</option>
                                <option value="last-month">Last Month</option>
                                <option value="all">All</option>
                            </select>
                        </div>

                        {/* Muestra un mensaje de carga mientras se obtienen los datos */}
                        {loading ? (
                            <p>Loading sales...</p>
                        ) : (
                            sales.length > 0 ? (
                                sales.map((sale, index) => (
                                    <Saleelement key={index} sale={sale} />
                                ))
                            ) : (
                                <p>No sales available for this filter.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
