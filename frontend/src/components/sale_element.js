export default function Saleelement(props){
    return (
    <div>
        <span>Venta con id: {props.sale.id}</span>
        {
            /*Shows all products on this sale element*/
            props.sale.products.map((product) => (
                <div>
                    <div>id del producto: {product.productid}</div>
                    <div>nombre del producto: {product.name}</div>
                    <div>cantidad adquirida: {product.amount}</div>
                    <div>precio por unidad: {product.unitprice}</div>
                </div>
            ))
        }
        <span>Total:  {props.sale.total}</span>
    </div>
    )
}