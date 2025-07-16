import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Contant from './pages/Contant'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserInfo from './pages/UserInfo'
import SelectServices from './pages/SelectServices'
import RequestService from './pages/RequestService'
import RequestHistory from './pages/RequestHistory'

function App() {
  return (
    <AuthProvider>
      <div className='mx-2 sm:mx-'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contant />} />
          <Route path="/my-profile" element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-info" element={
            // <ProtectedRoute>
              <UserInfo />
            // </ProtectedRoute>
          } />
          <Route path="/select-services" element={
            // <ProtectedRoute>
              <SelectServices />
            // </ProtectedRoute>
          } />
          <Route path="/request-service/:serviceId" element={
            // <ProtectedRoute>
              <RequestService />
            // </ProtectedRoute>
          } />
          <Route path="/request-history" element={
            // <ProtectedRoute>
              <RequestHistory />
            // </ProtectedRoute>
          } />
        </Routes>
        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default App