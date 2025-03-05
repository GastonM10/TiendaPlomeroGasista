import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { EmptyCart } from './EmptyCart';

const Carrito = () => {
    const { calcCant, carrito, calcTot, deleteProduct, emptyCart } = useContext(CartContext);
    // const navigate = useNavigate();

    return (
        <div className="container mt-5 pt-5 custom-height vh-100">
            {carrito.length > 0 ? (
                <div className="row">
                    <div className="col-12 col-lg-8 mt-4 pt-lg-3">
                        {carrito.map((prod) => (
                            <div key={prod.id} className="d-flex justify-content-center">
                                <div className="card border-0 rounded mb-3 mb-lg-0 m-1 bg-white w-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div id="product-detail" className="col-12 col-lg-8 d-flex flex-row align-items-center">
                                                <div id="producto-imagen">
                                                    <img src={prod.imagen} alt={prod.nombre} className="img-fluid rounded custom-width-100" />
                                                </div>
                                                <div id="producto-nombre-descrip" className="ms-3">
                                                    <h5>{prod.nombre}</h5>
                                                    <p className="mb-0 small">{prod.descripcion}</p>
                                                    <p className="small mb-0">Unidad $ {prod.precio.toLocaleString('es-AR')}</p>
                                                    <span className="text-primary fw-bold cursor-pointer" onClick={() => deleteProduct(prod)} style={{ cursor: "pointer" }}>Eliminar</span>
                                                </div>
                                            </div>

                                            <div id="product-total" className="col-12 col-lg-4 d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="fw-normal mb-0">Cant. {prod.cantidad}</p>
                                                </div>
                                                <div>
                                                    <h5 className="mb-0">$ {(prod.precio * prod.cantidad).toLocaleString('es-AR')}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-12 col-lg-4 mt-4 pt-lg-3">
                        <div className="position-sticky bg-white p-3 m-1 rounded" style={{ top: '20px' }}>
                            <div className="border-bottom pb-2">
                                <p className="fw-bold m-2">Resumen de compra</p>
                            </div>
                            <div className="d-flex justify-content-between m-2">
                                <p>Productos ({calcCant()})</p>
                                <p>$ {calcTot().toLocaleString('es-AR')}</p>
                            </div>
                            <div className="d-flex justify-content-between m-2">
                                <p className="fw-bold">Total</p>
                                <p className="fw-bold">$ {calcTot().toLocaleString('es-AR')}</p>
                            </div>
                            <button className="btn btn-danger m-1 fw-bold" onClick={emptyCart}>Vaciar carrito</button>
                            <Link to="/finalizar-compra">
                                <button className="btn btn-success m-1 fw-bold">Continuar compra</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyCart/>
                )
            }
        </div>
    );
};

export default Carrito;
