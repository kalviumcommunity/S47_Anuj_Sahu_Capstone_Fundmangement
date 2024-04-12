import './App.css'
import {Routes,Route} from "react-router-dom"
import {BrowserRouter} from "react-router-dom"
import Home from "./Components/Home"
import Profile from './Components/Profile'
import Login from './Components/Login'
import SignUpPage from './Components/SignUpPage'
import Expertappointment from './Components/Expertappointment'
import Payment from './Components/Payment'




function App() {

  return (
    <>
    
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>

        {/* <Route path='/login' element={<Loginpage/>}/> */}
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/login' element={<Loginuser/>}></Route> */}
        <Route path='/appointment' element={<Expertappointment/>}/>
        <Route path = '/payment' element={<Payment/>}/>
      </Routes>
      
    </>
  )
}

export default App
