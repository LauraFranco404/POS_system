export default function Inventoryelement(props){
    return (
    <div>
        <span>Id del producto: {props.product.id}</span>
        <span>Nombre: {props.product.name}</span>
        <span>Cantidad: {props.product.amount}</span>
        <span>Precio por unidad: {props.product.unitprice}</span>
    </div>
    )
}