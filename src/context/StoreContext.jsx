import React,{createContext,useContext,useEffect,useMemo,useRef,useState} from 'react';
import {products} from '../data/products';
import {validateCart,cartSubtotal,cartCount,shippingCost,clampQuantity,addCartItem} from '../utils/shop';
const Context=createContext(null);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
export function StoreProvider({children}){
 const [cart,setCart]=useState(()=>validateCart(read('nexora_cart_v1',[]),products));
 const cartRef=useRef(cart);
 const [wishlist,setWishlist]=useState(()=>{const ids=read('nexora_wishlist_v1',[]);return Array.isArray(ids)?ids.filter(x=>products.some(p=>p.id===x)):[];});
 const [theme,setTheme]=useState(()=>{
   try{const saved=localStorage.getItem('nexora_theme_v1');if(['light','dark'].includes(saved))return saved;}catch{}
   return typeof window!=='undefined'&&window.matchMedia?.('(prefers-color-scheme: light)').matches?'light':'dark';
 });
 const [drawer,setDrawer]=useState(false); const [toast,setToast]=useState('');const toastTimer=useRef(null);
 useEffect(()=>{try{localStorage.setItem('nexora_cart_v1',JSON.stringify(cart));}catch{}},[cart]);
 useEffect(()=>{try{localStorage.setItem('nexora_wishlist_v1',JSON.stringify(wishlist));}catch{}},[wishlist]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#080c13':'#f4f8fb');try{localStorage.setItem('nexora_theme_v1',theme);}catch{}},[theme]);
 useEffect(()=>()=>clearTimeout(toastTimer.current),[]);
 function notify(message){setToast(message);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),3200);}
 function commitCart(next){cartRef.current=next;setCart(next);}
 function addToCart(id,qty=1){
  const product=products.find(p=>p.id===id);if(!product)return;
  const result=addCartItem(cartRef.current,product,qty);
  if(!result.added){notify('Maximum demo stock reached');return;}
  commitCart(result.cart);
  const requested=clampQuantity(qty,product.stock);
  notify(result.added<requested?`Only ${result.added} unit${result.added===1?'':'s'} added (stock limit)`:`${product.name} added to cart`);
 }
 function setQuantity(id,qty){
  const p=products.find(p=>p.id===id);if(!p)return;
  commitCart(cartRef.current.map(x=>x.id===id?{...x,qty:clampQuantity(qty,p.stock)}:x));
 }
 function removeFromCart(id){commitCart(cartRef.current.filter(x=>x.id!==id));notify('Item removed from cart');}
 function toggleWishlist(id){if(!products.some(p=>p.id===id))return;
  const exists=wishlist.includes(id);
  setWishlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  notify(exists?'Removed from wishlist':'Saved to wishlist');
 }
 const subtotal=useMemo(()=>cartSubtotal(cart,products),[cart]);const shipping=shippingCost(subtotal);
 const value={cart,wishlist,theme,setTheme,drawer,setDrawer,toast,notify,addToCart,setQuantity,removeFromCart,toggleWishlist,clearCart:()=>commitCart([]),subtotal,shipping,total:subtotal+shipping,count:cartCount(cart)};
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useStore(){const v=useContext(Context);if(!v)throw new Error('Missing StoreProvider');return v;}
