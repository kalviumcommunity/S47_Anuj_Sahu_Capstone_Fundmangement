import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './DiffrentUI parts/LandingPage.jsx/Nav'
import Main from './DiffrentUI parts/LandingPage.jsx/Main'
import Footer from './DiffrentUI parts/LandingPage.jsx/Footer'

function Home() {
    return (
        <div>
            <Nav/>
            <Main/>
            <Footer/>

        </div>
    )
}
export default Home