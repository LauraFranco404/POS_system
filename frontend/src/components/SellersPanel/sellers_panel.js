import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./sellers_panel.css";

export default function Sellerspanel(){
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/getallsellers/")
        .then(response => response.json())
        .then(data => setSellers(data.sellers))
        .catch(error => setError("Failed to connect to the server"))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="current-sellers-container">
            <span className="current-sellers-title">Current sellers:</span>
            {loading && 
            <div className="loading-icon">
                <FontAwesomeIcon icon={faSpinner} spin/>
            </div>
            }
            {error && <span className="error-message">{error}</span>}
            {!loading && !error && sellers.length === 0 && <span className="no-sellers-message">There are no sellers.</span>}
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
