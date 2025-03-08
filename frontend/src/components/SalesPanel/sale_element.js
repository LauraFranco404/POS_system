import './sale_element.css';

export default function Saleelement(props) {

    // Calcula el precio total
    const totalPrice = props.sale.products.reduce((acc, product) => {
        return acc + product.amount * product.unitprice;
    }, 0);

    // Convierte la fecha recibida a un formato legible
    const saleDate = new Date(props.sale.sale_datetime);
    const formattedDate = saleDate.toLocaleDateString();
    const formattedTime = saleDate.toLocaleTimeString();

    // Maneja la eliminación de productos
    const handleRemoveProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            props.onRemoveProduct(productId);
        }
    };

    return (
        <div className='sale-element'>
            <span className='sale-title'>Sale Information:</span>
            <span>Seller document id: {props.sale.sellerid}</span>
            <span>Client document id: {props.sale.clientid}</span>
            <span>Date: {formattedDate} - Time: {formattedTime}</span> {/* Fecha y hora legibles */}
            <span className='sale-title'>Products:</span>
            <table className='sale-info'>
                <thead>
                    <tr>
                        <th className='sale-title'>Product Id</th>
                        <th className='sale-title'>Product Name</th>
                        <th className='sale-title'>Amount</th>
                        <th className='sale-title'>Unit Price</th>
                        {props.editable && <th className='sale-title'>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.sale.products.map((product) => (
                        <tr key={product.productid}>
                            <td>{product.productid}</td>
                            <td>{product.name}</td>
                            <td>{product.amount}</td>
                            <td>{product.unitprice}</td>
                            {props.editable && (
                                <td>
                                    <button
                                        className='remove-product-button'
                                        onClick={() => handleRemoveProduct(product.productid)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <span className='sale-title'>Total: ${totalPrice.toFixed(2)}</span>
        </div>
    );
}
