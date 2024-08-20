import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useContext";

export const PrivateRoute =()=>{
  const {user} = useAuth();
  
  if(!user) return <Navigate to ='/Login'/>
  return(
    <>
      <Outlet/>
    </>
  )
}