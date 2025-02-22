import { useEffect, useState } from "react";
import "./sellers_panel.css";

export default function Sellerspanel(){
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/getallsellers/")
        .then(response => response.json())
        .then(data => setSellers(data.sellers))
        .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div className="current-sellers-container">
            <span className="current-sellers-title">Vendedores actuales:</span>
            <div className="current-sellers">
                {
                    sellers.map((seller) => (
                        <div key={seller.documentid} className="seller-info">
                            <span>Número de cedula: <span>{seller.documentid}</span></span>
                            <span>Nombres: <span>{seller.name}</span></span>
                            <span>Apellidos: <span>{seller.lastname}</span></span>
                            <span>Fecha de nacimiento: <span>{seller.datebirth}</span></span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
