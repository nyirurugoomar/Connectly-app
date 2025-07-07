import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Contant from './pages/Contant'
import Footer from './components/Footer'

function App() {
  return (
    <div className='mx-2 sm:mx-'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contant />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App