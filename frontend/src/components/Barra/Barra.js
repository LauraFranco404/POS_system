import {useEffect, useState} from "react";
import styles from './Barra.module.css';
import {Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";


function Barra({page, getData}){
    var isAdmin = true; //add login as admin or as seller

    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(page); // Initialize with current page
    const sellersActive = location.pathname.startsWith("/sellers");

    useEffect(() => {
        setSelectedLink(location.pathname);
    }, [location.pathname])
   return(
    //nav
    <div>
      <div className={styles.estiloPage}>
        <div className={styles.barraB}>
          <Link to="/">
            <FontAwesomeIcon icon={faIgloo} size="1x" className={styles.estiloIcono} /> 
          </Link>
          <Link to={"/"} className= {`${styles.estiloElemento} ${selectedLink === "/" ? styles.estiloSeleccion: ""}`}>
              Inicio
          </Link>
          {isAdmin &&

          <Link to={"/sellers"} className={`${styles.estiloElemento} ${sellersActive ? styles.estiloSeleccion: ""}`}>
                  Vendedores
          </Link>
          }
          {isAdmin &&
          <Link to={"/inventory"} className={`${styles.estiloElemento} ${selectedLink === "/inventory" ? styles.estiloSeleccion: ""}`}>
                  Inventario
          </Link>
          }
          <Link to={"/sales"} className={`${styles.estiloElemento} ${selectedLink === "/sales" ? styles.estiloSeleccion: ""}`}>
                  Ventas
          </Link>

          <Link to={"/login"} className={`${styles.estiloLogIn} ${selectedLink === "/login" ? styles.estiloLogInSeleccion: ""}`}>
                  Ingrese aquí
          </Link>
        </div>
      </div>
    </div>
    );
   
}

export default Barra;