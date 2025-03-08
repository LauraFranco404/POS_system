import './sales_sidebar.css'
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

export default function SalesSideBar(props){
    const location = useLocation().pathname;
    return (
        <div className={props.className}>
            <div className="sales-sidebar ">
                <h2>Sales Panel</h2>
                <Link to = "/sales" className={"tab "+(location === "/sales" ? "selected-tab" : "no-selected-tab")}>Previous Sales</Link>
                <Link to = "/sales/createsales" className={"tab "+(location === "/sales/createsales" ? "selected-tab" : "no-selected-tab")}>Create Sales</Link>
                <Link to = "/sales/searchsales" className={"tab "+(location === "/sales/searchsales" ? "selected-tab" : "no-selected-tab")}>Search Sales</Link>
            </div>
        </div>
    )
}