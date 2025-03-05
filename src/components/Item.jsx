import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ItemCount } from './ItemCount';

export const Item = ( { producto } ) => {

    const { addToCart } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(1);

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1);
    };

    const handleSumar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const handleAgregar = () => {
        addToCart(producto, cantidad);

        Toastify({
            text: "Se agregó al carrito ✔️\n▶️ " + producto.nombre + " x " + cantidad,
            destination: "/carrito",
            style: {
                background: "linear-gradient(to right, #57FF10, #6EFF30)",
                color: "#313131"
            },
            offset: {
                y: 50,
            }
        }).showToast();
    };
  
    return (
        <div className="col-6 col-sm-4 col-lg-3 mb-3 item-style">
            <div className="producto">
                <div className="card border-0 ">
                    <Link to={`/item/${producto.id}`}>
                        <img src={producto.imagen} className="rounded-top w-100" />
                    </Link>
                    <div className="card-body">
                        <Link to={`/item/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="">{producto.descripcion}</div>
                            <div className="fw-bold fs-3">$ {producto.precio.toLocaleString('es-AR')}</div>
                        </Link>
                        {producto.stock > 0 ? (
                            <>
                                <div className="small">Disponible: {producto.stock} u.</div>
                                <ItemCount
                                    cantidad={cantidad}
                                    handleSumar={handleSumar}
                                    handleRestar={handleRestar}
                                    handleAgregar={handleAgregar}
                                />
                            </>
                        ) : (
                            <div className="d-flex justify-content-start align-items-center card-description-nostock text-secondary fw-bold">No hay stock</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
  )
}