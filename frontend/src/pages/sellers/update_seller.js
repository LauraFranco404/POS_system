import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sellerspanel from "../../components/sellers_panel";
import { useNavigate } from "react-router-dom";
import Barra from "../../components/Barra/Barra";


export default function Updateseller() {
    const [documentid, setDocumentid] = useState("");
    const [seller, setSeller] = useState(null);
    const [formData, setFormData] = useState({ name: "", lastname: "", datebirth: "", password: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/getsellerbyid/?documentid=${documentid}`)
        .then(response => response.json())
        .then(data => {setSeller(data.seller); console.log(data.seller)})
        .catch(error => console.error("Error:", error));
    };

    useEffect(() => {
        if (seller) {
            setFormData({ name: seller.name || "", lastname: seller.lastname || "", datebirth: seller.datebirth || "", password: "" });
        }
    }, [seller]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedData = { documentid: Number(documentid), ...formData };
        console.log("MY UPDATEDED DATA: ", updatedData);
        fetch("http://127.0.0.1:8000/updateseller/", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedData) })
        .then(response => response.json())
        .then(data => { console.log("Respuesta del servidor:", data); alert("Vendedor actualizado correctamente"); window.location.reload(); })
        .catch(error => console.error("Error:", error));
    };

    return (
        <div>
            <Barra/>
            <Link to="/sellers/">volver</Link>
            <div>
                <span>Actualizar información de vendedor</span>
            </div>
            <div>
                <Sellerspanel></Sellerspanel>
                <div>
                    <form onSubmit={handleSearch}>
                        <input placeholder="Numero de cedula" value={documentid} onChange={(e) => setDocumentid(e.target.value)} />
                        <button type="submit">Buscar</button>
                    </form>
                    {seller && (
                        <form onSubmit={handleUpdate}>
                            <input placeholder="Nuevos nombres" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            <input placeholder="Nuevos apellidos" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                            <input placeholder="Nueva fecha de nacimiento" value={formData.datebirth} onChange={(e) => setFormData({ ...formData, datebirth: e.target.value })} />
                            <input placeholder="Nueva contraseña" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            <input placeholder="Repetir nueva contraseña" />
                            <button type="submit">Actualizar vendedor</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
