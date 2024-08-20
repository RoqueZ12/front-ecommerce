import '../css/body.css';
import camisa from '../assets/camisa-negra-clasica-hombre.png';
import { useState, useEffect } from 'react';
import axios  from 'axios';
import { useAuth } from '../context/useContext';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1300';

const images = [
  'https://tse3.mm.bing.net/th?id=OIP.KZaH6MSvWHWdosy4J_PX0AHaEM&pid=Api&P=0&h=180',
  'https://thumbs.dreamstime.com/b/productos-de-ropa-en-el-estante-una-tienda-178098925.jpg',
  'https://thumbs.dreamstime.com/b/productos-de-ropa-en-el-estante-una-tienda-poznan-pol-mayo-220613930.jpg'
];

export const Body = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]); // Estado para productos
  const { addToCart } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cambiar la imagen cada 2 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);
  useEffect(() => {
    // Solicitar productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL}/products`,{withCredentials: true}); 
        setProducts(response.data); // Asigna los productos al estado
      } catch (error) {
        console.error('Error al solicitar productos:', error);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const handleCart = (productId) => {
    addToCart(productId, 1); // Default quantity of 1, adjust if needed
  };

  return (
    <div className="body-container">
      <div className="box-container">
        <main className="main">
          <div className="boxmain-izq">
            <h3>CAMISAS PARA HOMBRES</h3>
            <p>Lo mejor de la moda que encontrarás en nuestra tienda</p>
            <p>HASTA UN <strong>50%</strong> DE DESCUENTO</p>
          </div>
          <div className="boxmain-der">
            <img src={camisa} alt="Una camisa" />
          </div>
        </main>
        <section>
          <div className="carousel">
            <button className="carousel-control prev" onClick={goToPrevious}>‹</button>
            <div className="carousel-inner">
              <div className="carousel-items" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                  <div className="carousel-item" key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-control next" onClick={goToNext}>›</button>
          </div>
        </section>
        <section>
          <div className="product-section">
            <h2>PRODUCTOS</h2> <hr />
            <div className='product-container'>
              {products.map((product) => (
                <div className='product' key={product._id}>
                  <p>Nombre: {product.name}</p>
                  <img src={product.images[0]}></img>
                  <span>${product.price}</span>
                  <span>{"Stock: " + product.stock}</span>
                  <p>Descripción: {product.description}</p>
                  <button onClick={() => handleCart(product._id)}>Agregar al carrito</button>
                </div>
              ))}
            </div>
          </div>  
        </section> 
                
      </div>
    </div>
  );
};
