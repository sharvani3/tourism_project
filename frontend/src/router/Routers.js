import React from 'react'
import {Routes,Route,Navigate,BrowserRouter} from 'react-router-dom'
import Home from './../pages/Home';
import About  from '../pages/About';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import SearchResultList from './../pages/SearchResultList';
import AuthProvider from '../components/auth/authcontext';
import ItineraryGenerate from '../services/ItineraryGenerate';
const Routers = () => {
  return (
   <AuthProvider>
   
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/tours' element={<Tours/>}/>
        <Route path='/tours/:id' element={<TourDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
        <Route path='/ItineraryGenerate' element={<ItineraryGenerate/>}/>
    </Routes>
    </AuthProvider>
   
  )
}

export default Routers