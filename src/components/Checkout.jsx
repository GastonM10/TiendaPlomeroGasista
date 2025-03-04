import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useForm } from 'react-hook-form';
import { collection, addDoc, Timestamp, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../firebase/config";

export const Checkout = () => {

    const { carrito, calcCant, calcTot, emptyCartCheckout } = useContext(CartContext);
    const { register, handleSubmit } = useForm();
    let [docId, setDocId] = useState("");

    const comprar = async (data) => {

        const result = await Swal.fire({
            title: "Está seguro que desea realizar la compra?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#76DA3E",
            confirmButtonText: "Sí, estoy seguro",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            const pedido = {
                cliente: data,
                productos: carrito,
                total: calcTot(),
                fecha: Timestamp.now()
            };

            const pedidosRef = collection(db, "pedidos");

            try {
                // Crear la orden de compra en Firebase
                const docRef = await addDoc(pedidosRef, pedido);
                setDocId(docRef.id);

                // Crear batch para actualizar stocks
                const batch = writeBatch(db);

                for (const prod of carrito) {
                    const productoRef = doc(db, "productos", prod.id);
                    const productoSnap = await getDoc(productoRef);

                    if (productoSnap.exists()) {
                        const stockActual = productoSnap.data().stock;
                        const nuevoStock = stockActual - prod.cantidad;

                        if (nuevoStock >= 0) {
                            batch.update(productoRef, { stock: nuevoStock });
                        } else {
                            throw new Error(`Stock insuficiente para ${prod.descripcion}`);
                        }
                    }
                }

                await batch.commit();
                emptyCartCheckout();

            } catch (error) {
                console.error("Error en la compra:", error);
                Swal.fire("Error", "No se pudo completar la compra. Inténtelo de nuevo.", "error");
            }
        }
    };

    if (docId) {
        return (
            <div className="d-flex justify-content-center vh-100 mt-4">
                <div className="col-10 mt-5">
                    <div className="d-flex row position-sticky bg-white rounded justify-content-center p-4 mt-5">
                        <h1>Su compra ha sido realizada con éxito ✅</h1>
                        <p>Para realizar el seguimiento de su pedido, utilice el siguiente código identificador:</p>
                        <p className='fs-3'>{docId}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='container mt-5 pt-5 d-flex justify-content-center custom-height'>
            { calcCant() > 0 ? (
                <form onSubmit={handleSubmit(comprar)} className='pt-4 justify-content-center'>
                    <h1>Complete sus datos para finalizar la compra</h1>

                    <div className="form-group m-1">
                        <label htmlFor="fullname">Nombre y Apellido</label>
                        <input type="text" className="form-control" placeholder="Nombre y apellido" {...register("name")} required />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="dni-cuit">DNI / CUIT</label>
                        <input type="number" className="form-control" placeholder="DNI o CUIT (sin puntos ni guiones)" {...register("dni-cuit")} required />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="E-mail" {...register("email")} required />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="phone">Teléfono</label>
                        <input type="phone" className="form-control" placeholder="Teléfono" {...register("phone")} required />
                    </div>
                    <div className="form-group mt-3 ms-1">
                        <button type="submit" className="btn btn-success">Comprar</button>
                    </div>

                </form>
            ) : <div className='d-flex justify-content-start'>
                    <h2>El carrito se encuentra vacío</h2>
                </div>
            }
        </div>
    )
}
