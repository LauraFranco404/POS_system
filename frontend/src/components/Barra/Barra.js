import {useEffect, useState} from "react";
import styles from './Barra.module.css';
import {Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

const IconLink = () => {
    return (
      <Link to="/">
        <FontAwesomeIcon icon={faIgloo} size="2x" className={styles.estiloIcono} />
        </Link>
    );
  }

function Barra({page, getData}){
    var isAdmin = true; //add login as admin or as seller

    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(page); // Initialize with current page
    useEffect(() => {
        setSelectedLink(location.pathname);
    }, [location.pathname])
   return(
    //nav
    <div>
      <div className={styles.estiloPage}>
        <div className={styles.barraB}>
          <IconLink /> {/* Usa el componente IconLink aquí */}
            <Link to={"/"} className= {`${styles.estiloElemento} ${selectedLink === "/" ? styles.estiloSeleccion: ""}`}>
                Inicio
            </Link>
            {isAdmin &&

            <Link to={"/Sellers"} className={`${styles.estiloElemento} ${selectedLink === "/Sellers" ? styles.estiloSeleccion: ""}`}>
                    Vendedores
            </Link>
            }
            {isAdmin &&
            <Link to={"/Inventory"} className={`${styles.estiloElemento} ${selectedLink === "/Inventory" ? styles.estiloSeleccion: ""}`}>
                    Inventario
            </Link>
            }
            <Link to={"/Sales"} className={`${styles.estiloElemento} ${selectedLink === "/Sales" ? styles.estiloSeleccion: ""}`}>
                    Ventas
            </Link>


            <Link to={"/Login"}>
                <button className={`${styles.estiloLogIn} ${selectedLink === "/Login" ? styles.estiloLogInSeleccion: ""}`}>
                  Ingrese aquí
                </button>
            </Link>
        </div>
      </div>
    </div>
    );
   
}

export default Barra;