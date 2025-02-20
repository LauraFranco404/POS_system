import { useState } from "react";
import { Link } from "react-router-dom";
import Sellerspanel from "../../components/sellers_panel";
import Barra from "../../components/Barra/Barra";

export default function Deleteseller() {
    const [documentid, setDocumentid] = useState("");

    const handleChange = (e) => {
        setDocumentid(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = { documentid: Number(documentid) };

        fetch("http://127.0.0.1:8000/deleteseller/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dataToSend) })
        .then(response => response.json())
        .then(data => { console.log("Respuesta del servidor:", data); alert("Vendedor eliminado exitosamente"); })
        .catch(error => {console.error("Error:", error); alert("Error "+error);});
    };

    return (
        <div>
            <Barra/>            
            <Link to="/sellers/">volver</Link>
            <div>
                <span>Deleteseller</span>
            </div>
            <div>
                <Sellerspanel></Sellerspanel>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Numero de cedula" value={documentid} onChange={handleChange} />
                        <button type="submit">Borrar vendedor</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
