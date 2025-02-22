import "./home.css"
import Navbar from "../../components/Navbar/Navbar";
import {Link, useLocation} from "react-router-dom";

  function Home() {
    var isLoggedIn = false;
    var isAdmin = true; //add login as admin or as seller
    return (
      <div>
        <Navbar/>
        { !isLoggedIn && 
        <div className="container">
          <div className="text-container">
            <span>Welcome!</span>
            <span>This is the Point Of Sale (POS) created for Processes and Software Design.</span>
            <span>Click <Link to={"/login"} className="login-link">here</Link> to log in the system.</span>
          </div>
        </div> 
      }
      </div>
    )
  };
  
  export default Home;
  