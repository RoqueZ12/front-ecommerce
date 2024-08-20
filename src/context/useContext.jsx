import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/helper'
const AuthContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1300';

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate()
  const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  const LoginContext = async (user) => {
    try {
      const resp = await axios.post(`${URL}/auth/login`, user);
      setUser(resp.data.user); // Asegúrate de que la respuesta tiene una propiedad 'user'
      setIsAuthenticated(true);
      // localStorage.setItem('user', JSON.stringify(resp.data.user))
      console.log("INICIO SESIÓN : ", resp.data);

      // Navegar o realizar alguna acción después del login
     
    } catch (error) {
      console.error("Error en el login: ", error.response?.data || error.message);
    }
  };
  const LogOutContext = async() => {
    try{
      await axios.post(`${URL}/auth/logout`, {withCredentials: true});
      setUser(null)
      setIsAuthenticated(false)
      navigate('/login')
    }catch(error){  
      console.error("Error en el logout: ", error.response?.data || error.message);
    }
  }
  const registerContext = async (user) => {
    try {
      const resp = await axios.post(`${URL}/user`, user);
      setUser(resp.data.user); // Asegúrate de que la respuesta tiene una propiedad 'user'
      navigate('/login')
    }catch (error) {
      console.error("Error en el registro: ", error.response?.data || error.message);
    }
  }
  const addToCart = async (productId, quantity) => {
    try {
      const resp = await axios.post(`${URL}/cart/add`, { productId, quantity }, { withCredentials: true });
      console.log("Full response data:", resp.data);

      if (resp.data && resp.data.cart) {
        setCart(resp.data.cart);
        setTotalQuantity(calculateTotalQuantity(resp.data.cart.products));
        console.log("Carrito actualizado: ", resp.data.cart);
      } else {
        console.warn("No cart data found in response.");
      }
    } catch (error) {
      console.error("Error al agregar al carrito: ", error.response?.data || error.message);
    }
  };  
  //useCallback asegura que getCart no se redefina en cada renderizado, lo que evita efectos secundarios innecesarios y optimiza el rendimiento de tu aplicación.
  const getCart = useCallback( async () => {
    try {
      
      const resp = await axios.get(`${URL}/cart/view/`, { withCredentials: true });
      setCart(resp.data.cart);
      setTotalQuantity(calculateTotalQuantity(resp.data.cart.products));
    } catch (e) {
      console.error("Error al obtener el carrito: ", e);
    }
  },[]);

  const deleteProductFromCart = useCallback( async (productId) => {
    try {
      const response = await axios.delete(`${URL}/cart/delete/${productId}`, { withCredentials: true });
      console.log('Product removed from cart:', response.data);
      // Actualizar el estado del carrito en el frontend si es necesario
      await getCart();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  },[getCart]);

  const avoidToCart = useCallback( async () => {
    try {
      const response = await axios.delete(`${URL}/empty`, { withCredentials: true });
      console.log('Cart emptied:', response.data);
      // Actualizar el estado del carrito en el frontend si es necesario
      await getCart();
    } catch (error) {
      console.error('Error removing cart:', error);
    }
  },[getCart]);
  
  useEffect(() => {
    const checkLogin = async () => { 
      try {
        const res = await axios.get(`${URL}/protected`, { withCredentials: true });

        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(res.data.user);
          await getCart(); // Obtén el carrito si el usuario está autenticado
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        
      }
    };
  
    checkLogin();
  }, [getCart]);

  return(
    <AuthContext.Provider value={{user,cart,addToCart,getCart,LoginContext,deleteProductFromCart, LogOutContext, registerContext,avoidToCart,isAuthenticated, totalQuantity}}>
      {children}</AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  
  return useContext(AuthContext)

}