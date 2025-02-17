import { useState } from "react";
import { Link } from "react-router-dom";

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
            <Link to="/sellers/">volver</Link>
            <div><span>Registrar vendedor</span></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Nombres del vendedor" value={formData.name} onChange={handleChange} />
                    <input name="lastname" placeholder="Apellidos del vendedor" value={formData.lastname} onChange={handleChange} />
                    <input name="documentid" placeholder="Número de cédula" value={formData.documentid} onChange={handleChange} />
                    <input name="datebirth" placeholder="Fecha de nacimiento DD/MM/YYYY" value={formData.datebirth} onChange={handleChange} />
                    <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
                    <input name="repeatPassword" type="password" placeholder="Repetir contraseña" value={formData.repeatPassword} onChange={handleChange} />
                    <button type="submit">Registrar vendedor</button>
                </form>
            </div>
        </div>
    );
}
