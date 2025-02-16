import { Link } from "react-router-dom"

export default function Registerseller(){
    return (
    <div>
        <Link to = "/sellers/">volver</Link>
        <div>
            <span>Registrar vendedor</span>
        </div>
        <div>
            <form>
                <input placeholder="Nombres del vendedor"></input>
                <input placeholder="Apellidos del vendedor"></input>
                <input placeholder="Numero de cedula"></input>
                <input placeholder="fecha de nacimiento"></input>
                <input placeholder="contraseña"></input>
                <input placeholder="repetir contraseña"></input>
                <button type = "submit">Registrar vendedor</button>
            </form>
        </div>
    </div>
    )
}