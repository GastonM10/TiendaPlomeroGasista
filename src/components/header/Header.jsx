import { NavBar } from './NavBar'
import { CartWidget } from './CartWidget'
import { Link } from 'react-router-dom'
import { SearchProducts } from './SearchProducts'

export const Header = () => {
  
  return (
    <header className='header bg-black fixed-top mb-5'>
        <div className='container'> 
          <div className='d-flex row align-items-center'>
            <div className='d-flex align-items-center mb-1 mt-2'>
              <div className='col-3'>
                <Link to="/" style={{ textDecoration: 'none' }}><img style={{width: '150px'}} src="/img/logo-nav-blanco.png"/></Link>
              </div>
              <div className='col-6'>
                <SearchProducts/>
              </div>
              <div className='col-3 text-end'>
                <CartWidget/>
              </div>
            </div>
            <div>
              <NavBar/>
            </div>
          </div>
        </div>
    </header>
  )
}
