import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const NavBar = () => {

  let [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const catsRef = collection(db, "categorias");
    getDocs(catsRef)
      .then((res) => {
        setCategories(res.docs.map((doc) => {
          return { ...doc.data() }
        }));
      })
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <ul className="navbar-nav">
          {categories.map((category) => (
            <li className="nav-item" key={category.id}>
              <NavLink to={`/category/${category.id}`} className="nav-link nav-text-custom">
                {category.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
