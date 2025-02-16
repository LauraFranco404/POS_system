import { Link } from "react-router-dom";


export default function Home(){
    var isAdmin = true; //add login as admin or as seller
    return (
    <div>
        <div>
            <span>Home</span>
        </div>
        {isAdmin && 
        <div>        
            <div>
                <span>Gestión de Vendedores</span>
            </div>
            <Link to= "/sellers">Gestión de vendedores</Link>
        </div>
        }
        
        { isAdmin && 
        <div>
            <div>
                <span>Gestión de Inventario</span>
            </div>
            <Link to="/inventory">Gestión de inventario</Link>
        </div>
        }

        <div>
            <div>
                <span>Gestión de Ventas</span>
            </div>
            <Link to="/sales">Gestión de ventas</Link>
        </div>
    </div>
    )
}