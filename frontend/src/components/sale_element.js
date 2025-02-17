export default function Saleelement(props){
    return (
    <div>
        <span>Venta con id: {props.sale.id}</span>
        {
            /*Shows all products on this sale element*/
            props.sale.products.map((product) => (
                <div key={product.productid}>
                    <span>id del producto: {product.productid}</span>
                    <span>nombre del producto: {product.name}</span>
                    <span>cantidad adquirida: {product.amount}</span>
                    <span>precio por unidad: {product.unitprice}</span>
                </div>
            ))
        }
        <span>Total:  {props.sale.total}</span>
    </div>
    )
}