import test from 'node:test';
import assert from 'node:assert/strict';
import {products} from '../src/data/products.js';
import {validateCart,cartCount,cartSubtotal,clampQuantity,shippingCost,filterProducts,addCartItem} from '../src/utils/shop.js';

test('catalog has ten distinct products and five categories',()=>{
 assert.equal(products.length,10);assert.equal(new Set(products.map(p=>p.id)).size,10);
 assert.equal(new Set(products.map(p=>p.category)).size,5);
 for(const p of products){assert.ok(p.price>0);assert.ok(p.stock>0);assert.ok(p.specs.length>=3);}
});
test('correct cart quantities, amount and shipping',()=>{
 const cart=[{id:'pulse-x1',qty:2},{id:'echo-mini',qty:1}];
 assert.equal(cartCount(cart),3);assert.equal(cartSubtotal(cart,products),18990*2+8990);
 assert.equal(shippingCost(cartSubtotal(cart,products)),0);
 assert.equal(shippingCost(15000),890);assert.equal(shippingCost(0),0);
});
test('malformed saved carts sanitized, never duplicated and stock capped',()=>{
 const broken=[{id:'pulse-x1',qty:1000},{id:'pulse-x1',qty:2},{id:'fake',qty:3},{id:'echo-mini',qty:-4},null];
 assert.deepEqual(validateCart(broken,products),[{id:'pulse-x1',qty:15},{id:'echo-mini',qty:1}]);
 assert.deepEqual(validateCart('bad',products),[]);
 assert.equal(clampQuantity(NaN,10),1);
});
test('combined search, category, price and sorting',()=>{
 const filtered=filterProducts(products,{search:'wireless',category:'Audio',maxPrice:20000,sort:'price-high'});
 assert.deepEqual(filtered.map(p=>p.id),['pulse-x1']);
 const desc=filterProducts(products,{sort:'price-high'});
 assert.equal(desc[0].id,'studio-pro');
 const category=filterProducts(products,{category:'Wearables',sort:'price-low'});
 assert.deepEqual(category.map(p=>p.id),['fitband-air','orbit-watch']);
});

test('search supports empty results',()=>{
 assert.deepEqual(filterProducts(products,{search:'unlikely_product_123'}),[]);
});

test('add-to-cart merges products, caps available stock, and reports actual additions',()=>{
 const product=products[0];
 const first=addCartItem([],product,2);
 assert.deepEqual(first,{cart:[{id:product.id,qty:2}],added:2});
 const next=addCartItem(first.cart,product,20);
 assert.equal(next.added,product.stock-2);
 assert.equal(next.cart.length,1);
 assert.equal(next.cart[0].qty,product.stock);
 const full=addCartItem(next.cart,product,1);
 assert.equal(full.added,0);
 assert.deepEqual(full.cart,next.cart);
 const second=addCartItem(next.cart,products[2],3);
 assert.equal(second.cart.length,2);
 assert.equal(cartCount(second.cart),product.stock+3);
 assert.equal(cartSubtotal(second.cart,products),product.stock*product.price+3*products[2].price);
 assert.equal(addCartItem(second.cart,null,1).added,0);
});
