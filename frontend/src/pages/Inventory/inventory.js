import "./inventory.css"
import Navbar from "../../components/Navbar/Navbar"
import Inventoryelement from "../../components/inventory_element"
import { useState } from "react"

export default function Storeinventory() {

    const [isMenuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

    var elements = [
        { productid: 1, name: "queso", amount: 10, unitprice: 1 },
        { productid: 2, name: "chocolate", amount: 20, unitprice: 4 },
        { productid: 3, name: "chocolate", amount: 20, unitprice: 4 },
        { productid: 4, name: "chocolate", amount: 20, unitprice: 4 }
    ];

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible); // Alterna la visibilidad del menú
    };

    return (
        <div>
            <Navbar />
            <div className="subnavbar">
                <div>
                    <span className="inventory-title">Inventory Management</span>
                </div>
                <div>
                    <button className={isMenuVisible? "create-product-button-pressed":"create-product-button"} onClick={toggleMenu}>
                        Create Product
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="elements-container">
                    {elements.map((product) => (
                        <Inventoryelement key={product.productid} product={product} />
                    ))}
                    {elements.map((product) => (
                        <Inventoryelement key={product.productid} product={product} />
                    ))}
                    {elements.map((product) => (
                        <Inventoryelement key={product.productid} product={product} />
                    ))}
                    {elements.map((product) => (
                        <Inventoryelement key={product.productid} product={product} />
                    ))}
                </div>
                {isMenuVisible && (
                    <div className="create-product-menu">
                        <span className="create-product-title">Create product</span>
                        <div className="separator-line"></div>
                        <form>
                            <input placeholder="Product id"></input>
                            <input placeholder="Product Name"></input>
                            <input placeholder="Product Amount"></input>
                            <input placeholder="Unit price"></input>
                            <button className="create-product-button">Create Product</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
