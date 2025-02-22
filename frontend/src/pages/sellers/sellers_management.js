import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar";
import './sellers_management.css'

export default function Sellersmanagement(){
    return (
        <div>
            <Navbar/>
            <div className="sellers-container">
                <div className="panel-container">
                    <div className="title-container">
                        <span>Sellers Management</span>
                    </div>
                    <div className="separator-line"></div>
                    <ul className="panel-elements">
                        <li><Link to="/sellers/registerseller">Register Seller<span>&gt;</span></Link></li>
                        <li><Link to="/sellers/deleteseller">Delete Seller<span>&gt;</span></Link></li>
                        <li><Link to="/sellers/updateseller">Update Seller<span>&gt;</span></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}