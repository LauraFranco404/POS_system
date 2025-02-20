import React from 'react';
import './inventory_element.css'


const TableComponent = () => {
    const products = [
        { id: 1, name: 'Queso', amount: 10, unitprice: 100 },
        { id: 2, name: 'Chocolate', amount: 20, unitprice: 200 },
        { id: 3, name: 'Pan', amount: 30, unitprice: 300 },
    ];

    return (
        <div>
            <h1 className="texto">Tabla de Inventario</h1>
            <table className="tablaI">
                <thead>
                    <tr>
                        <th className="celdaI tituloI">ID</th>
                        <th className="celdaI tituloI">Nombre</th>
                        <th className="celdaI tituloI">Cantidad</th>
                        <th className="celdaI tituloI">Precio por Unidad</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="celdaI textoI">{product.id}</td>
                            <td className="celdaI textoI">{product.name}</td>
                            <td className="celdaI textoI">{product.amount}</td>
                            <td className="celdaI textoI">{product.unitprice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
/*
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
    */