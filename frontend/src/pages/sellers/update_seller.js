import { Link } from "react-router-dom"
import Sellerspanel from "../../components/sellers_panel"

export default function Updateseller(){
    return (
    <div>
        <Link to = "/sellers/">volver</Link>
        <div>
            <span>Actualizar información de vendedor</span>
        </div>
        <div>
            <Sellerspanel></Sellerspanel>
            <div>
                <form>
                    <input placeholder="Numero de cedula"></input>
                    <input placeholder="Nuevos nombres"></input>
                    <input placeholder="Nuevos apellidos"></input>
                    <input placeholder="Nueva fecha de nacimiento"></input>
                    <input placeholder="Nueva contraseña"></input>
                    <input placeholder="Repetir nueva contraseña"></input>
                    <button type = "submit">Actualizar vendedor</button>
                </form>
            </div>
        </div>
    </div>
    )
}