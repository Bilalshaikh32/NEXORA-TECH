import React from 'react';
import {Routes,Route} from 'react-router-dom';
import {SiteHeader,SiteFooter,CartDrawer,Toast,ScrollManager} from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
export default function App(){return <><a className="skip-link" href="#main-content">Skip to main content</a><ScrollManager/><SiteHeader/><main id="main-content" tabIndex="-1"><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/product/:id" element={<ProductDetails/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="*" element={<NotFound/>}/></Routes></main><SiteFooter/><CartDrawer/><Toast/></>}
