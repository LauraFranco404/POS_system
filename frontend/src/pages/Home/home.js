import "./home.css"
import Barra from "../../components/Barra/Barra";
import {Link, useLocation} from "react-router-dom";

  function Home() {
    var isLoggedIn = false;
    var isAdmin = true; //add login as admin or as seller
    return (
      <div>
        <Barra/>
        { !isLoggedIn && 
        <div className="container">
          <div className="text-container">
            <span>¡Bienvenido!</span>
            <span>Este es el sistema de Punto de Venta de Procesos y Diseño de Software.</span>
            <span>Haz click <Link to={"/login"} className="login-link">aquí</Link> para acceder al sistema.</span>
          </div>
        </div> 
      }
      </div>
    )
  };
  
  export default Home;
  