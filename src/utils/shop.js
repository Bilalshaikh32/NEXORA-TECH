export const SHIPPING_THRESHOLD = 30000;
export const SHIPPING_FEE = 890;
export function clampQuantity(q, stock) {
  const num=Number(q);
  return Math.max(1,Math.min(stock,Number.isFinite(num)?Math.floor(num):1));
}
// Pure cart update, keeping quantities within the product's demo stock.
// Returns the number of units actually added so the UI can show accurate feedback.
export function addCartItem(cart, product, quantity=1) {
  if (!product || !Number.isInteger(product.stock) || product.stock < 1) return {cart, added:0};
  const requested=clampQuantity(quantity,product.stock);
  const existing=cart.find(item=>item.id===product.id);
  const current=existing?.qty ?? 0;
  const added=Math.min(requested,Math.max(0,product.stock-current));
  if (!added) return {cart,added:0};
  if (!existing) return {cart:[...cart,{id:product.id,qty:added}],added};
  return {cart:cart.map(item=>item.id===product.id?{...item,qty:current+added}:item),added};
}

export function cartSubtotal(cart, products) {
  return cart.reduce((total,item) => {
    const found=products.find(p=>p.id===item.id);
    return found ? total+found.price*clampQuantity(item.qty, found.stock) : total;
  },0);
}
export function cartCount(cart) {return cart.reduce((n,x)=>n+x.qty,0);}
export function shippingCost(subtotal) {return subtotal===0||subtotal>=SHIPPING_THRESHOLD?0:SHIPPING_FEE;}
export function validateCart(raw, products) {
  if(!Array.isArray(raw)) return [];
  const seen=new Set();
  return raw.flatMap(x=>{
    if(!x || typeof x.id!=='string' || seen.has(x.id)) return [];
    const p=products.find(p=>p.id===x.id);
    if(!p) return [];
    seen.add(p.id); return [{id:p.id,qty:clampQuantity(x.qty,p.stock)}];
  });
}
export function filterProducts(items,{search='',category='All',maxPrice=Infinity,sort='featured'}={}) {
  const q=search.trim().toLowerCase();
  const result=items.filter(p=>(category==='All'||p.category===category)&&p.price<=maxPrice&&(!q||`${p.name} ${p.category} ${p.teaser}`.toLowerCase().includes(q)));
  if(sort==='price-low') result.sort((a,b)=>a.price-b.price);
  if(sort==='price-high') result.sort((a,b)=>b.price-a.price);
  if(sort==='name') result.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort==='rating') result.sort((a,b)=>b.score-a.score);
  return result;
}
