import { Body } from "../components/Body"
import { Footer } from "../components/Footer"
import '../css/dashboard.css'
export const Dashboard = () =>{
  return(
    <div className="dashboard">
    {
      <div>
        <Body/>
        <Footer/> 
      </div>
    }
    </div>
  )
}