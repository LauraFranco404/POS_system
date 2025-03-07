import { useEffect, useState } from "react";
import styles from './Navbar.module.css';
import { Link, useLocation } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ page, getData }) {
    var isAdmin = true; // add login as admin or as seller

    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(page); // Initialize with current page
    const sellersActive = location.pathname.startsWith("/sellers");
    const salesActive = location.pathname.startsWith("/sales");

    useEffect(() => {
        setSelectedLink(location.pathname);
    }, [location.pathname]);

    return (
        // nav

        <div>
            <div className={styles.pageStyle}>
                <div className={styles.navbarContainer}>
                    <Link to="/">
                        {/*<FontAwesomeIcon icon={faIgloo} size="1x" className={styles.iconStyle} />*/}
                        <img src="/POS_icon.png" alt="POS Logo" className={styles.iconStyle} />
                    </Link>
                    <Link to={"/"} className={`${styles.navItem} ${selectedLink === "/" ? styles.selectedItem : ""}`}>
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
                    <Link to={"/sales"} className={`${styles.navItem} ${salesActive ? styles.selectedItem : ""}`}>
                        Sales
                    </Link>
                    <Link to={"/login"} className={`${styles.loginButton}`}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}