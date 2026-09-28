import React, { Component } from 'react';
import Items from './Components/Items/Items';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddItems from './Components/AddItems/AddItems';
import Footer from './Components/Footer/Footer';
import About from './Components/About/About';
import ContactUs from './Components/ContactUs/ContactUs';
import { BsWhatsapp } from "react-icons/bs";
import ScrollToTop from './Components/ScrollToTop'; 
import './App.css'; 

class App extends Component {
    
  render() {

    const whatsappLink = "https://wa.me/961xxxxxxxx"; 
    
    return (
      <BrowserRouter>
       {}
       <ScrollToTop />

       <div>
       <Nav />
       
       {}
       <div className="whatsapp-fixed-button">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <BsWhatsapp className="sright-icon" />
        </a>
      </div>

          <Routes>
            <Route path='/' element={<Items />} />
            <Route path='/Login' element={<Login />} />
            <Route path="/AddItems" element={<AddItems />} />
            <Route path="/Login" element={<Login />} /> 
            <Route path="/Cart" element={<Cart />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
      </div>
      
      <Footer />
      </BrowserRouter>

    )
  }
}

export default App;