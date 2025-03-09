import { useEffect, useState } from "react";
import styles from './Navbar.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();
    const isAdmin = userData?.type === "admin";

    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState();
    const [menuOpen, setMenuOpen] = useState(false);
    const sellersActive = location.pathname.startsWith("/sellers");
    const salesActive = location.pathname.startsWith("/sales");

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        setSelectedLink(location.pathname);
    }, [location.pathname]);

    return (
        <div>
            <div className={styles.pageStyle}>
                <div className={styles.navbarContainer}>
                    <Link to="/">
                        <img src="/POS_icon.png" alt="POS Logo" className={styles.iconStyle} />
                    </Link>
                    
                    <Link to={"/"} className={`${styles.navItem} ${selectedLink === "/" || selectedLink === "/home"? styles.selectedItem : ""}`}>
                        Home
                    </Link>
                    {isAdmin &&
                        <Link to={"/sellers"} className={`${styles.navItem} ${sellersActive ? styles.selectedItem : ""}`}>
                            Sellers
                        </Link>
                    }
                    {isAdmin &&
                        <Link to={"/inventory"} className={`${styles.navItem} ${selectedLink === "/inventory" ? styles.selectedItem : ""}`}>
                            Inventory
                        </Link>
                    }
                    { userData &&
                        <Link to={"/sales"} className={`${styles.navItem} ${salesActive ? styles.selectedItem : ""}`}>
                            Sales
                        </Link>
                    }
                    {userData ? (
                        <div 
                        className={styles.userMenu} 
                        onMouseLeave={() => setMenuOpen(false)}
                    >
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)} 
                            className={styles.userButton}
                        >
                            {userData.name}
                        </button>
                        {menuOpen && (
                            <div className={styles.dropdownMenu}>
                                <p><strong>Name:</strong> {userData.name}</p>
                                <p><strong>Lastname:</strong> {userData.lastname}</p>
                                <p><strong>Document ID:</strong> {userData.documentID}</p>
                                <p><strong>Type:</strong> {userData.type}</p>
                                <button 
                                    onClick={handleLogout} 
                                    className={styles.logoutButton}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    ) : (
                        <Link to={"/login"} className={`${styles.loginButton}`}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}