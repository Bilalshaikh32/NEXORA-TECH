import React,{useEffect,useRef,useState} from 'react';
import {Link,NavLink,useLocation,useNavigate} from 'react-router-dom';
import {ArrowRight,ArrowUp,Check,ChevronRight,Heart,Instagram,Mail,Menu,Minus,Moon,Plus,ShoppingBag,Sun,Trash2,X,Search} from 'lucide-react';
import {AnimatePresence,motion} from 'framer-motion';
import {useStore} from '../context/StoreContext';
import {getProduct,money,productImage} from '../data/products';
const navLinks=[['Home','/'],['Shop','/shop'],['About','/about'],['Contact','/contact']];
const dpad=()=>document.querySelector('#main-content');

export function SiteHeader(){
 const {count,setDrawer,theme,setTheme,wishlist}=useStore();const [mobile,setMobile]=useState(false);const loc=useLocation();const firstLink=useRef(null);const menuTrigger=useRef(null);
 useEffect(()=>{setMobile(false);},[loc.pathname,loc.search]);
 useEffect(()=>{if(!mobile)return;
  firstLink.current?.focus();const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  const onKey=e=>{
   if(e.key==='Escape'){setMobile(false);menuTrigger.current?.focus();}
   if(e.key==='Tab'){const menu=document.querySelector('.mobile-nav');const controls=Array.from(menu?.querySelectorAll('a[href],button:not([disabled])')||[]);if(!controls.length)return;const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  };
  document.addEventListener('keydown',onKey);
  return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=previousOverflow;};
 },[mobile]);
 return <><div className="announcement"><span className="pulse-dot"/> A NEW ERA OF EVERYDAY TECH <span className="announcement-sep">/</span> FREE DEMO SHIPPING OVER PKR 30,000 <ArrowRight size={13}/></div>
 <header className="site-header"><div className="container header-inner">
  <Link to="/" className="wordmark" aria-label="Nexora Tech home"><span className="brand-icon">N<span>✦</span></span><span className="wordmark-letters">NEXORA<span>TECH</span></span></Link>
  <nav className="desktop-nav" aria-label="Main navigation">{navLinks.map(([label,path])=><NavLink key={path} end={path==='/'} to={path} className={({isActive})=>`nav-link ${isActive?'active':''}`}>{label}</NavLink>)}</nav>
  <div className="header-actions">
   <Link className="icon-button header-search" to="/shop" aria-label="Search products"><Search size={20}/></Link>
   <Link className="icon-button wishlist-link" to="/shop?wishlist=1" aria-label={`Wishlist ${wishlist.length} products`}><Heart size={20}/>{wishlist.length>0&&<span className="small-count">{wishlist.length}</span>}</Link>
   <button className="icon-button" aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} onClick={()=>setTheme(x=>x==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
   <button className="cart-trigger" aria-label={`Open cart with ${count} items`} onClick={()=>setDrawer(true)}><ShoppingBag size={19}/><span className="cart-count">{count}</span></button>
   <button ref={menuTrigger} className="mobile-menu-trigger icon-button" aria-label="Open mobile navigation" aria-expanded={mobile} onClick={()=>setMobile(true)}><Menu size={23}/></button>
  </div>
 </div></header>
 <AnimatePresence>{mobile&&<><motion.div className="mobile-overlay" onClick={()=>setMobile(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.nav className="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',duration:.27}}><div className="mobile-nav-top"><span className="eyebrow">NAVIGATION / NEXORA</span><button className="icon-button" onClick={()=>{setMobile(false);menuTrigger.current?.focus();}} aria-label="Close mobile navigation"><X size={24}/></button></div>{navLinks.map(([label,path],i)=><NavLink ref={i===0?firstLink:null} to={path} key={path} className="mobile-link" onClick={()=>setMobile(false)}>{label}<ArrowUp size={16}/></NavLink>)}<div className="mobile-nav-foot">PREMIUM TECH. CLEAN EXPERIENCE.</div></motion.nav></>}</AnimatePresence>
 </>;
}

export function SiteFooter(){return <footer className="footer"><div className="container"><div className="footer-top"><div><Link to="/" className="footer-brand">NEXORA<span>TECH</span></Link><p>Beyond ordinary.<br/>Built for tomorrow.</p></div><div className="footer-links"><div><span className="eyebrow">EXPLORE</span><Link to="/shop">All products</Link><Link to="/shop?category=Audio">Audio collection</Link><Link to="/shop?category=Wearables">Wearables</Link><Link to="/shop?category=Accessories">Accessories</Link></div><div><span className="eyebrow">INFORMATION</span><Link to="/about">Our story</Link><Link to="/contact">Get in touch</Link><Link to="/cart">Your cart</Link><Link to="/shop?wishlist=1">Saved items</Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NEXORA TECH. Premium electronics storefront.</span><span>CLEAN DESIGN · MODERN EXPERIENCE</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="backtop" aria-label="Back to top"><ArrowUp size={17}/></button></div></div></footer>}

export function CartDrawer(){
 const {drawer,setDrawer,cart,setQuantity,removeFromCart,subtotal,shipping,total,count}=useStore();const closeRef=useRef(null);const navigate=useNavigate();const previousFocus=useRef(null);
 useEffect(()=>{if(!drawer)return;previousFocus.current=document.activeElement;document.body.style.overflow='hidden';const timer=setTimeout(()=>closeRef.current?.focus(),30);const onKey=e=>{if(e.key==='Escape')setDrawer(false);if(e.key==='Tab'){const dialog=document.querySelector('.drawer-panel');const focusables=Array.from(dialog?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')||[]);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};document.addEventListener('keydown',onKey);return()=>{clearTimeout(timer);document.removeEventListener('keydown',onKey);document.body.style.overflow='';previousFocus.current?.focus?.();};},[drawer,setDrawer]);
 return <AnimatePresence>{drawer&&<div className="drawer-root"><motion.div className="drawer-backdrop" onClick={()=>setDrawer(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside role="dialog" aria-modal="true" aria-label="Shopping cart" className="drawer-panel" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',ease:[.18,.8,.25,1],duration:.3}}><div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Shopping bag <span>({count})</span></h2></div><button ref={closeRef} className="icon-button" aria-label="Close cart" onClick={()=>setDrawer(false)}><X size={23}/></button></div>
  <div className="drawer-scroll">{cart.length===0?<EmptyCart onExplore={()=>{setDrawer(false);navigate('/shop');}}/>:cart.map(item=>{const p=getProduct(item.id);if(!p)return null;return <div className="mini-cart-row" key={p.id}><img src={productImage(p)} alt={`${p.name} product photo`}/><div className="mini-cart-info"><span className="eyebrow">{p.category}</span><Link to={`/product/${p.id}`} onClick={()=>setDrawer(false)}>{p.name}</Link><strong>{money(item.qty*p.price)}</strong><div className="mini-qty"><button aria-label={`Decrease ${p.name} quantity`} disabled={item.qty===1} onClick={()=>setQuantity(p.id,item.qty-1)}><Minus size={13}/></button><span>{item.qty}</span><button aria-label={`Increase ${p.name} quantity`} disabled={item.qty>=p.stock} onClick={()=>setQuantity(p.id,item.qty+1)}><Plus size={13}/></button></div></div><button onClick={()=>removeFromCart(p.id)} className="remove-compact" aria-label={`Remove ${p.name}`}><Trash2 size={17}/></button></div>})}</div>
  {cart.length>0&&<div className="drawer-bottom"><div className="order-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="order-line"><span>Estimated shipping</span><strong>{shipping===0?'FREE':money(shipping)}</strong></div><div className="order-line total-line"><span>Total</span><strong>{money(total)}</strong></div><button className="btn btn-primary full-width" onClick={()=>{setDrawer(false);navigate('/checkout');}}>Demo Checkout <ArrowRight size={17}/></button><Link to="/cart" className="text-link centered" onClick={()=>setDrawer(false)}>View full cart <ArrowRight size={16}/></Link></div>}
 </motion.aside></div>}</AnimatePresence>;
}
export function EmptyCart({onExplore}){return <div className="empty-cart"><div className="empty-icon"><ShoppingBag size={35}/></div><h3>Your bag is waiting.</h3><p>Looks like you haven't discovered your next favorite gadget yet.</p><button className="btn btn-outline" onClick={onExplore}>Explore products <ArrowRight size={17}/></button></div>}
export function Toast(){const {toast}=useStore();return <AnimatePresence>{toast&&<motion.div role="status" aria-live="polite" className="toast" key={toast} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}}><span className="toast-check"><Check size={16}/></span>{toast}</motion.div>}</AnimatePresence>}
export function ScrollManager(){const location=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[location.pathname]);return null;}
export function PageIntro({eyebrow,title,sub}){return <div className="page-intro container"><div className="section-eyebrow"><span className="line-mini"/>{eyebrow}</div><h1>{title}</h1>{sub&&<p>{sub}</p>}</div>}
export function Field({label,id,error,...props}){return <div className="field"><label htmlFor={id}>{label}</label><input id={id} aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} {...props}/>{error&&<small id={`${id}-error`} className="input-error">{error}</small>}</div>}
