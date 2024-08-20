import React,{ useState } from "react"
import '../css/login.css'
import { useAuth } from "../context/useContext"
import { useNavigate } from "react-router-dom"
export const Login= () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {LoginContext, isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    LoginContext({username, password})
  
  }
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return(
    <div>
    <form className='form' onSubmit={handleSubmit}>
      <h1>LOGIN</h1>
      <label>Name:Username </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <label>Password </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
    </form>
    </div>
  )
}