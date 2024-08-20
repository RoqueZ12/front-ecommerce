import { useState } from "react"
import { useAuth } from "../context/useContext"
export const Register = ()=>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Para mensajes de éxito
  const {registerContext} = useAuth()

  const handleRegister = async   (e) => {
    e.preventDefault();
    // Simple validation
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      // Llamada a la función de registro proporcionada por el contexto
      await registerContext({ username, password });
      setSuccess('Registration successful!');
      setError(''); // Limpiar mensajes de error si el registro es exitoso
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess(''); // Limpiar mensajes de éxito si ocurre un error
    }   

    // Clear form fields
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
      <h2>Register</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}
