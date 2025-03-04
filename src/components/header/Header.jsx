import { NavBar } from './NavBar'
import { CartWidget } from './CartWidget'
import { Link } from 'react-router-dom'
import { SearchProducts } from './SearchProducts'
import { useState } from "react";

export const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  // Función para cerrar el menú al hacer clic en una opción
  const closeMenu = () => setMenuOpen(false);
  
  return (
    <header className="header bg-black fixed-top mb-5">
      <div className="container">
        {/* Línea superior */}
        <div className="d-flex align-items-center justify-content-between py-2">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img style={{ width: "150px" }} src="../img/logo-nav-blanco.png" alt="Logo" />
          </Link>

          {/* Barra de búsqueda (visible en +992px) */}
          <div className="d-none d-lg-block flex-grow-1 px-3">
            <SearchProducts />
          </div>

          {/* Carrito */}
          <div className="d-none d-lg-block">
            <CartWidget />
          </div>

          {/* Icono Menú (Solo en móviles) */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list text-white fs-2"></i>
          </button>
        </div>

        {/* Barra de búsqueda (visible en -992px) */}
        <div className="d-lg-none mt-2 d-flex row align-items-center">
          <div className='col-10'>
            <SearchProducts />
          </div>
          <div className='col-2 text-end'>
            <CartWidget />
          </div>
        </div>

        {/* Menú de navegación (Siempre visible en PC, desplegable en móviles) */}
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
            <NavBar closeMenu={closeMenu} />
          </div>
        </nav>
      </div>
    </header>
  )
}
