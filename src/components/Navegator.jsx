import '../css/navegator.css'
 import { Link } from 'react-router-dom'
 import { useAuth } from '../context/useContext'
 import '@fortawesome/fontawesome-free/css/all.min.css';


export const Navegator = () => {

  const {LogOutContext, isAuthenticated, totalQuantity, user} = useAuth()
  return (  
    <div>
    <nav className="nav">
      <div className='container-logo'>
        <h1>FIFISTORE</h1>
      </div>
      <ul>    
        {
          !isAuthenticated ? 
          <>
            <li> <i className="fas fa-sign-in-alt"></i><Link to="/login"> Login</Link></li>
            <li><i className="fas fa-user-plus"></i><Link to="/register"> Register</Link></li>
          </> :  
            <>
              <li> <i className="fas fa-home"></i><Link to = "/dashboard">Home</Link></li>
              <li> <i className="fas fa-user"></i> {user.username}</li>
              <li>
                <i className="fas fa-cart-arrow-down"></i>
                <Link to="/cart">Cart</Link>
                <div>{totalQuantity}</div> {/* Asegúrate de que se llame como función */}
              </li>
              <li onClick={() => LogOutContext()}>  <i className="fas fa-sign-out-alt"></i> Log Out</li>
            </>
            
        }
      
      </ul>   
    </nav>
    </div> )
}