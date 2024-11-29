import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import FooterComp from './components/FooterComp'
import PrivateRoutes from './components/PrivateRoutes'


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/Projects' element = {<Projects/>}/>
        <Route path='/sign-in' element = {<SignIn/>}/>
        <Route path='/sign-up' element = {<SignUp/>}/>
        <Route element = {<PrivateRoutes/>}>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        </Route>
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}
