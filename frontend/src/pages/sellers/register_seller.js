import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import './sellers_management.css';
import './sellers_form.css';

export default function Registerseller() {
    const [formData, setFormData] = useState({ documentid: "", name: "", lastname: "", datebirth: "", password: "", repeatPassword: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const dataToSend = { documentid: Number(formData.documentid), name: formData.name, lastname: formData.lastname, datebirth: formData.datebirth, password: Number(formData.password) };

        fetch("http://127.0.0.1:8000/addseller/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dataToSend) })
        .then(response => response.json())
        .then(data => { console.log("Respuesta del servidor:", data); alert("Vendedor registrado exitosamente"); })
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
                        <span>Register Seller</span>
                    </div>
                    <div className="separator-line"></div>
                    <form autoComplete="off" onSubmit={handleSubmit} className="panel-elements sellers-form-container">
                        <input name="name" placeholder="Seller names" value={formData.name} onChange={handleChange} />
                        <input name="lastname" placeholder="Seller last names" value={formData.lastname} onChange={handleChange} />
                        <input name="documentid" placeholder="Document ID number" value={formData.documentid} onChange={handleChange} />
                        <input name="datebirth" placeholder="Birth date DD/MM/YYYY" value={formData.datebirth} onChange={handleChange} />
                        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        <input name="repeatPassword" type="password" placeholder="Repeat password" value={formData.repeatPassword} onChange={handleChange} />
                        <button type="submit">Register Seller</button>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
}
