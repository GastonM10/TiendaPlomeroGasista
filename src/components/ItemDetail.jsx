import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ItemCount } from './ItemCount';

export const ItemDetail = ({ producto }) => {
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
        if (cantidad <= producto.stock) {
            addToCart(producto, cantidad);

            Toastify({
                text: `Se agregó al carrito ✔️\n▶️ ${producto.nombre} x ${cantidad}`,
                destination: "/carrito",
                style: {
                    background: "linear-gradient(to right, #57FF10, #6EFF30)",
                    color: "#313131"
                },
                offset: {
                    y: 50,
                }
            }).showToast();
        }
    };

    return (
        <div className='container pt-5 w-50 custom-height'>
            <div className="card mt-5 text-bg-secondary">
                <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center p-1">
                        <a href={producto.imagen}><img src={producto.imagen} className="img-fluid rounded" alt={producto.nombre} /></a>
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                        <div className="card-body">
                            <h5 className="card-title fs-2 fw-normal">{producto.nombre}</h5>
                            <p className="card-text fs-4 fw-normal">{producto.descripcion}</p>
                            <p className="card-text fs-2 fw-normal">$ {producto.precio.toLocaleString('es-AR')}</p>
                            <p className="card-text fs-5 fw-normal">Stock disponible: {producto.stock}</p>
                            <ItemCount
                                cantidad={cantidad}
                                handleSumar={handleSumar}
                                handleRestar={handleRestar}
                                handleAgregar={handleAgregar}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
