import { Link } from "react-router-dom";
import Saleelement from "../../components/SalesPanel/sale_element";
import Navbar from "../../components/Navbar/Navbar";
import SalesSideBar from "../../components/SalesPanel/sales_sidebar";
import "./sales.css";
import { useState } from "react";

export default function CreateSales() {
    // Estado para manejar los productos de la venta
    const userData = JSON.parse(sessionStorage.getItem("user"));

    const [sale, setSale] = useState({
        sellerid: userData["documentid"],
        clientid: 1,
        products: [],
    });

    // Estado para el ID del producto a agregar
    const [newProductId, setNewProductId] = useState(""); // Solo se guarda el ID ingresado

    // Maneja los cambios en el input del ID del producto
    const handleInputChange = (event) => {
        setNewProductId(event.target.value);
    };

    // Maneja la eliminación de productos
    const handleRemoveProduct = (productId) => {
        const updatedProducts = sale.products.filter((product) => product.productid !== productId);
        setSale((prevSale) => ({
            ...prevSale,
            products: updatedProducts,
        }));
    };

    // Maneja el envío del formulario para agregar productos
    const handleAddProduct = async (event) => {
        event.preventDefault();

        if (newProductId) {
            try {
                // Realiza la consulta a la API para obtener los datos del producto
                const response = await fetch(`http://127.0.0.1:8000/getproductbyid/?productid=${newProductId}`);
                
                if (!response.ok) {
                    alert("Product not found!");
                    return;
                }

                const productData = await response.json();

                // Verifica si el producto ya está en la lista
                const existingProduct = sale.products.find(product => product.productid === productData.product.productid);

                if (existingProduct) {
                    // Si el producto ya está, incrementa el amount en 1
                    const updatedProducts = sale.products.map(product => 
                        product.productid === existingProduct.productid
                            ? { ...product, amount: product.amount + 1 }
                            : product
                    );
                    setSale(prevSale => ({
                        ...prevSale,
                        products: updatedProducts
                    }));
                } else {
                    // Si no está, lo agrega a la lista
                    setSale((prevSale) => ({
                        ...prevSale,
                        products: [
                            ...prevSale.products,
                            {
                                productid: productData.product.productid,
                                name: productData.product.name,
                                amount: 1, // Por defecto, agrega 1 unidad
                                unitprice: productData.product.unitprice,
                            },
                        ],
                    }));
                }

                setNewProductId(""); // Limpia el campo de ID

            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Error fetching product data!");
            }
        } else {
            alert("Please enter a Product ID!");
        }
    };

    // Maneja el envío de la venta
    const handleFinishSale = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/sellproducts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sale),
            });

            if (response.ok) {
                alert("Sale completed successfully!");
                setSale((prevSale) => ({
                    ...prevSale,
                    products: [], // Limpia los productos después de la venta
                }));
            } else {
                alert(`Sale failed: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error sending sale:", error);
            alert("Error sending sale!");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="sales-container">
                <SalesSideBar className="bar-skip"></SalesSideBar>
                <div className="bar-skip fitright">
                    <div className="sales-content">
                        <h2 className="sales-title">Add Product to Sale</h2>
                        <form className="product-form" onSubmit={handleAddProduct}>
                            <input
                                type="number"
                                name="productid"
                                placeholder="Product ID"
                                value={newProductId}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">Add Product</button>
                        </form>
                        <Saleelement editable={true} sale={sale} onRemoveProduct={handleRemoveProduct} />
                        <button className="create-sale-button" onClick={handleFinishSale}>Finish sale</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
