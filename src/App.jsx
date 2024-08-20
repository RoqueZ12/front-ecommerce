
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './components/Login'
import { Dashboard } from './pages/Dashboard'
import { Carrito } from './components/carrito'
import { PrivateRoute } from './context/RouteProtected'
import { AuthProvider } from './context/useContext'
import { Navegator } from './components/Navegator'
import { Register } from './components/Register'
function App() {
  

  return (
    <BrowserRouter>
     <AuthProvider>
    {
      <div>
        <Navegator/>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route element={<PrivateRoute />}>
           <Route path='/dashboard' element={<Dashboard/>}></Route>
           <Route path='/cart' element={<Carrito/>}></Route>
          </Route>
        </Routes>
      </div>
    }
     </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App 
