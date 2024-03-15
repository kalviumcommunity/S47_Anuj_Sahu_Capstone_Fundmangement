// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Home from "./Components/Home"
import Profile from './Components/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route path = "/profile" element = {<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
