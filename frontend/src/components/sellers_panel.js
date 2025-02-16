export default function Sellerspanel(){
    //get available sellers with a query
    var sellers = [
        {documentid: 1234567891, name: "nombre1", lastname: "apellido1", datebirth: "10/10/2010"},
        {documentid: 1234567892, name: "nombre2", lastname: "apellido2", datebirth: "11/10/2010"}
    ]

    return (
    <div>
        <span>Vendedores actuales</span>
        <div>
            {
                sellers.map((seller) => (
                    <div>
                        <span>Número de cedula: {seller.documentid}</span>
                        <span>Nombres: {seller.name}</span>
                        <span>Apellidos: {seller.lastname}</span>
                        <span>Fecha de nacimiento: {seller.datebirth}</span>
                    </div>
                ))
            }
        </div>
    </div>
    )
}