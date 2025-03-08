import { useState } from "react";
import Saleelement from "../../components/SalesPanel/sale_element";
import Navbar from "../../components/Navbar/Navbar";
import SalesSideBar from "../../components/SalesPanel/sales_sidebar";
import Sellerspanel from "../../components/SellersPanel/sellers_panel";
import "./sales.css";

export default function SearchSales() {
    const [sellerId, setSellerId] = useState("");          // State for input value
    const [sales, setSales] = useState([]);                // State for sales data
    const [loading, setLoading] = useState(false);          // State for loading status
    const [error, setError] = useState("");                 // State for error messages

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();                                // Prevent default form submission
        if (!sellerId) {
            setError("Please enter a valid Seller ID.");    // Show error if no ID is entered
            return;
        }
        setLoading(true);                                  // Show loading indicator
        setError("");                                      // Clear previous error

        // Fetch sales data from API
        fetch(`http://127.0.0.1:8000/getsalesbysellerid/?sellerid=${sellerId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.sales) {
                    setSales(data.sales);                  // Update sales data
                } else {
                    setError(data.error || "No sales found for this seller.");
                    setSales([]);                          // Clear sales if none found
                }
            })
            .catch((err) => setError("Failed to fetch sales data."))
            .finally(() => setLoading(false));              // Hide loading indicator
    };

    return (
        <div>
            <Navbar />
            <div className="sales-container">
                <SalesSideBar className="bar-skip" />
                <div className="bar-skip fitright">
                    <div className="sales-content">
                        <h2 className="sales-title">Search Sales By Seller ID</h2>
                        {/* Form to input Seller ID */}
                        <form onSubmit={handleSubmit} className="seller-form">
                            <input
                                type="number"
                                placeholder="Enter Seller ID"
                                value={sellerId}
                                onChange={(e) => setSellerId(e.target.value)}
                                className="seller-input"
                            />
                            <button type="submit" className="search-button">
                                Search Sales
                            </button>
                        </form>

                        {/* Show loading status */}
                        {loading && <p>Loading sales...</p>}

                        {/* Show error message if any */}
                        {error && <p className="error-message">{error}</p>}

                        {/* Render sales data */}
                        {sales.length > 0 && sales.map((sale) => (
                            <Saleelement key={sale._id} sale={sale} />
                        ))}

                        {/* Message if no sales found */}
                        {!loading && sales.length === 0 && !error && (
                            <p>No sales to display. Try searching with a different Seller ID.</p>
                        )}
                    </div>
                </div>
                <div className="sellers-panel">
                    <Sellerspanel></Sellerspanel>
                </div>
            </div>
        </div>
    );
}
