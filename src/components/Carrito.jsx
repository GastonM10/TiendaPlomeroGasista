import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
    const { calcCant, carrito, calcTot, deleteProduct, emptyCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="container mt-5 pt-5 custom-height vh-100">
            {carrito.length > 0 ? (
                <div className="row">
                    {/* Listado de productos en el carrito */}
                    <div className="col-12 col-lg-8 mt-4">
                        {carrito.map((prod) => (
                            <div key={prod.id} className="d-flex justify-content-center">
                                <div className="card border-0 rounded mb-3 mb-lg-0 m-1 bg-white w-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">
                                                <div>
                                                    <img src={prod.imagen} alt={prod.nombre} className="img-fluid rounded custom-width-100" />
                                                </div>
                                                <div className="ms-3 custom-width-350">
                                                    <h5>{prod.nombre}</h5>
                                                    <p className="mb-0 small">{prod.descripcion}</p>
                                                    <p className="small mb-0">Unidad $ {prod.precio.toLocaleString('es-AR')}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="custom-width-80">
                                                    <p className="fw-normal mb-0">Cant. {prod.cantidad}</p>
                                                </div>
                                                <div className="custom-width-120">
                                                    <h5 className="mb-0">$ {(prod.precio * prod.cantidad).toLocaleString('es-AR')}</h5>
                                                </div>
                                                <button className="btn btn-light" onClick={() => deleteProduct(prod)}>🗑️</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resumen del carrito fijo */}
                    <div className="col-12 col-lg-4 mt-4">
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

                <div className="d-flex row vh-100">
                    <div className="col-12 col-lg-8 mt-4">
                        <div className="pt-5 pb-5 d-flex row position-sticky bg-white p-3 m-1 rounded justify-content-center" style={{ top: '20px' }}>
                            <img style={{ width: '100px' }} src="../img/empty-cart.png" alt="Carrito vacío" />
                            <p className="fs-5 text-center pt-2">Agregá productos para armar tu carrito</p>
                            <button className="btn btn-purchase m-1 col-4 fw-bold text-white" onClick={() => navigate('/')}>Continuar comprando</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 mt-4 pb-5">
                        <div className="position-sticky bg-white text-secondary p-3 m-1 rounded" style={{ top: '20px' }}>
                            <div className="border-bottom pb-2">
                                <p className="fw-bold m-2">Resumen de compra</p>
                            </div>
                            <div className="d-flex justify-content-between m-2">
                                <p>Aquí verás los importes de tu compra una vez que agregues productos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
