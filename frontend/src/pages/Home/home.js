import "./home.css"
import Navbar from "../../components/Navbar/Navbar";
import {Link, useLocation} from "react-router-dom";

  function Home() {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const isAdmin = userData?.type === "admin";
    const isLoggedIn = userData?true:false;

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
        { isAdmin && 
        <div className="container">
          <div className="text-container">
            <span>Welcome, Admin!</span>
            <span>This is the Point Of Sale (POS) created for Processes and Software Design.</span>
            <span>Click <Link to={"/sellers"} className="login-link">here</Link> to administrate sellers. Or Click <Link to={"/inventory"} className="login-link">here</Link> to administrate inventory.</span>
          
          </div>
        </div> 
        }
        { isLoggedIn && !isAdmin &&
        <div className="container">
          <div className="text-container">
            <span>Welcome, Admin!</span>
            <span>This is the Point Of Sale (POS) created for Processes and Software Design.</span>
            <span>Click <Link to={"/sales"} className="login-link">here</Link> to administrate sales.</span>
          
          </div>
        </div> 
        }
      </div>
    )
  };
  
  export default Home;
  