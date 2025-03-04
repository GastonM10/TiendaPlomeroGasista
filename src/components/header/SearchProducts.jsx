import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export const SearchProducts = () => {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
    const [products, setProducts] = useState([]); // Estado para todos los productos
    const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los resultados filtrados
    const navigate = useNavigate();

    // Obtener todos los productos al montar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productosRef = collection(db, "productos");
                const querySnapshot = await getDocs(productosRef);

                const productos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(productos);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, []);

    // Filtrar productos en memoria cuando cambia el término de búsqueda
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        const results = products.filter(product =>
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(results);
    }, [searchTerm, products]);

    // Manejar la selección de un producto
    const handleSelectProduct = (productId) => {
        navigate(`/item/${productId}`);
        setSearchTerm(""); // Borra el campo de búsqueda
        setFilteredProducts([]); // Oculta los resultados
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center position-relative">
                <input type="text" className="form-control form-control-sm w-100" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                
                {/* Resultados de búsqueda */}
                {filteredProducts.length > 0 && (
                    <div className="list-group position-absolute w-100 top-100 mt-1 border shadow rounded" style={{ zIndex: 1000 }}>
                        {filteredProducts.map((product) => (
                            <button key={product.id} className="list-group-item small list-group-item-action text-start" onClick={() => handleSelectProduct(product.id)}>
                                {/* {product.nombre} */}
                                {product.descripcion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
