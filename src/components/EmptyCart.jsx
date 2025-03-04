import React from "react";

export const EmptyCart = () => { 
    return (
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
    );
};