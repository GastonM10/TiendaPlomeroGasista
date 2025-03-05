import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Carousel } from './Carrousel'

export const ItemListContainer = () => {
  
  let { categoryId } = useParams();
  let [ productos, setProductos ] = useState([]);
  let [ titulo, setTitulo ] = useState('Productos');

  useEffect(() => {

    const prodsRef = collection(db, "productos");
    const qCatFilter = categoryId ? query(prodsRef, where("categoria.id", "==", categoryId)) : prodsRef;

    const catsRef = collection(db, "categorias");
    let qCats = categoryId && query(catsRef, where("id", "==", categoryId));

    getDocs(qCatFilter)
      .then((res) => {
        setProductos(
          res.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
          })
        )
      })

    if (qCats) {
      getDocs(qCats)
        .then((res) => {
          setTitulo(res.docs[0].data().nombre);
        })
    } else {
      setTitulo("Todos nuestros productos");
    }

  }, [categoryId]);

  return (
    <div>

      {/* Se muestra el carrousel solo en la página principal */}
      {titulo === 'Todos nuestros productos' && <Carousel />} 
  
      <div className={`items-list-container ${titulo !== 'Todos nuestros productos' ? 'pt-5 mt-5' : ''}`}>
        <h1 className={`pt-3 mt-3 text-center fw-normal pb-2 ${titulo !== 'Todos nuestros productos' ? 'mt-4 pt-4' : ''}`}>{titulo}</h1>
        <div className="container">
          <div className="row justify-content-center">
            <ItemList productos={productos} />
          </div>
        </div>
      </div>
    </div>
  );
  
}


