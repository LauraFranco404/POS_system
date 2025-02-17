import { useEffect, useState } from "react";

export default function Sellerspanel(){
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/getallsellers/")
        .then(response => response.json())
        .then(data => setSellers(data.sellers))
        .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div>
            <span>Vendedores actuales</span>
            <div>
                {
                    sellers.map((seller) => (
                        <div key={seller.documentid}>
                            <span>Número de cedula: {seller.documentid}</span>
                            <span>Nombres: {seller.name}</span>
                            <span>Apellidos: {seller.lastname}</span>
                            <span>Fecha de nacimiento: {seller.datebirth}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
