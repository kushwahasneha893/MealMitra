import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Meals from './pages/Meals'
import Details from './pages/Details'
import Kitchen from './pages/Kitchen'
import Delivery from './pages/Delivery'
import Orders from "./pages/Orders"
import Payment from "./pages/Payment"
import FeedbackModal from './pages/FeedbackModal'
import CustomerProfile from './pages/CustomerProfile'
import HomemakerProfile from './pages/HomemakerProfile'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/meals' element={<Meals />} />
        <Route path="/details/:id" element={<Details />} />

        <Route path='/kitchen' element={<Kitchen />} />
        <Route path='/delivery' element={<Delivery />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/feedback/:orderId" element={<FeedbackModal />} />

        {/* ⭐ FIXED ROUTE */}
        <Route path="/payment/:orderId" element={<Payment />} />

         <Route path='/customerProfile' element={<CustomerProfile />} /> 
         <Route path='/homemakerProfile' element={<HomemakerProfile />} />
      </Routes>
    </>
  )
}

export default App
