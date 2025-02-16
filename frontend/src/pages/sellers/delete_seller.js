import { Link } from "react-router-dom"
import Sellerspanel from "../../components/sellers_panel"

export default function Deleteseller(){
    return (
    <div>
        <Link to = "/sellers/">volver</Link>
        <div>
            <span>Deleteseller</span>
        </div>
        <div>
            <Sellerspanel></Sellerspanel>
            <div>
                <form>
                    <input placeholder="Numero de cedula"></input>
                    <button type = "submit">Borrar vendedor</button>
                </form>
            </div>
        </div>
    </div>
    )
}