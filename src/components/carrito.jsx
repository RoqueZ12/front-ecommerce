import { useEffect, useState} from 'react';
import { useAuth } from '../context/useContext'; // Adjust the path as needed
import '../css/carrito.css'; // Ensure the CSS path is correct

export const Carrito = () => {
  const { getCart,cart, deleteProductFromCart,addToCart, avoidToCart} = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
     
      getCart(); // Obtener el carrito solo si el usuario está autenticado
   
  }, [ getCart]);

  useEffect(() => {
    // Calcular el total cuando el carrito se actualice
    if (cart && cart.products) {
      const totalAmount = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setTotal(totalAmount);
    }
  }, [cart]);

 // Verifica si hay productos en el carrito
 if (!cart || !cart.products || cart.products.length === 0) {
  return <p>No hay productos en el carrito.</p>;
}
  const handleDelete = async (productId) => {
    try {
      await deleteProductFromCart(productId);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  }
  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, 1); // Aumenta la cantidad en 1
      await getCart(); // Actualiza el carrito después de la adición
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
        // Solo disminuir la cantidad si es mayor a 1
        const product = cart.products.find(item => item.product._id === productId);
        if (product && product.quantity > 1) {
            await addToCart(productId, -1); // Disminuye la cantidad en 1
            await getCart(); // Actualiza el carrito después de la disminución
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
};
  const handlePay = async () => {
    try{
      alert("Gracias por su compra")
      await avoidToCart();
      
    }catch(error){
      console.error('Error removing product from cart:', error);
    }
  }
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((item, index) => (
            <tr key={`${item.product._id}-${index}`}>
              <td>{index + 1}</td>
              <td>{item.product.name}</td>
              <td>${item.product.price}</td>
              <td>
                {/* aumentar la cantidad */}
                <button className="btn-add" onClick={() => handleAdd(item.product._id)}>+</button>
                {/* mostrar la cantidad */}
                {item.quantity}
                {/* disminuir la cantidad */}
                <button className="btn-remove" onClick={() => handleRemove(item.product._id)}>-</button>
              </td>
              <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(item.product._id)}>Eliminar</button>
              </td>
            </tr>            
          ))}
           <tr>
             <td colSpan="4">Total</td>
              {/* sumar los totales */}
             <td>${total.toFixed(2)}</td>
             <td><button className="btn-pagar" onClick={() => handlePay()}>Pagar</button></td>
           </tr>
        </tbody>
         {/* mostrar el total */}
       
        </table>
       
        
    </div>
  );
};
