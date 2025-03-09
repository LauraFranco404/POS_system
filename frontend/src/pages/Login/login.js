import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './login.css';

export default function Login() {
    const [documentid, setDocumentID] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ documentid, password }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                sessionStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <Link to="/">
                    <img src="/POS_icon.png" alt="POS Logo" className="iconStyle" />
                </Link>
                <span className='form-title'>Point Of Sale System</span>
                <span className='form-subtitle'>Login</span>
                <div className="separator-line"></div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input placeholder="Document ID" value={documentid} onChange={(e) => setDocumentID(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}