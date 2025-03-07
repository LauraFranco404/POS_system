import './inventory_element.css'

export default function Inventoryelement(props){
    return (
    <div className="element-container">
        <button className='remove-button'>X</button>
        <div>
            <span>{props.product.name}</span>
            <span>Id del producto: {props.product.productid}</span>
            <span>Cantidad: {props.product.amount}</span>
            <span>Precio por unidad: {props.product.unitprice}</span>
        </div>
        <div className="increase-decrease-buttons">
            <button>+</button>
            <button>-</button>
        </div>
    </div>
    )
}

//