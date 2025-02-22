import { useState } from "react";
import { Link } from "react-router-dom";
import Sellerspanel from "../../components/SellersPanel/sellers_panel";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './sellers_management.css';
import './sellers_form.css';

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
            <Navbar/>
            <div className="sellers-container">
                <div className="panel-container">
                    <Link to="/sellers/" className="button-goback">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <div className="title-container">
                        <span>Delete Seller</span>
                    </div>
                    <div className="separator-line"></div>
                    <form autoComplete="off" onSubmit={handleSubmit} className="panel-elements sellers-form-container">
                        <input placeholder="Document ID number" value={documentid} onChange={handleChange} />
                        <button type="submit">Delete Seller</button>
                    </form>
                </div>    
                <Sellerspanel></Sellerspanel>
            </div>
        </div>
    );
}
