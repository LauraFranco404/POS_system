import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sellerspanel from "../../components/SellersPanel/sellers_panel";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './sellers_management.css';
import './sellers_form.css';

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
            <Navbar/>
            <div className="sellers-container">
                <div className="panel-container">
                    <Link to="/sellers/" className="button-goback">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <div className="title-container">
                        <span>Update Seller</span>
                    </div>
                    <div className="separator-line"></div>
                    <form autoComplete="off" onSubmit={handleSearch} className="panel-elements sellers-form-container">
                        <input placeholder="Document ID number" value={documentid} onChange={(e) => setDocumentid(e.target.value)} />
                        <button type="submit">Find</button>
                    </form>
                    {seller && <div className="separator-line"></div>}
                    {seller && (
                    <form autoComplete="off" onSubmit={handleUpdate} className="panel-elements sellers-form-container">
                        <input placeholder="Seller names" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <input placeholder="Seller last names" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                        <input placeholder="Birth date DD/MM/YYYY" value={formData.datebirth} onChange={(e) => setFormData({ ...formData, datebirth: e.target.value })} />
                        <input placeholder="New password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <input placeholder="Repeat new password" />
                        <button type="submit">Update Seller</button>
                    </form>
                    )}
                </div>    
                <Sellerspanel></Sellerspanel>
            </div>
        </div>
    );
}
