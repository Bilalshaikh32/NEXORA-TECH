import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContact,validateCheckout} from '../src/utils/validation.js';

test('contact rejects incomplete form and accepts valid mock data',()=>{
 assert.ok(Object.keys(validateContact({name:'',email:'wrong',subject:'',message:'hi'})).length===4);
 assert.deepEqual(validateContact({name:'Demo Customer',email:'demo@example.com',subject:'Product inquiry',message:'Hello, this is a sample message.'}),{});
});
test('checkout validates shipping input and blocks empty cart',()=>{
 const demo={firstName:'Demo',lastName:'Customer',email:'demo@example.com',phone:'03001234567',address:'12 Sample Street',city:'Karachi',province:'Sindh',postal:'74200'};
 assert.deepEqual(validateCheckout(demo,true),{});
 assert.equal(validateCheckout(demo,false).cart,'Your cart is empty.');
 assert.ok(validateCheckout({...demo,email:'bad',phone:'1'},true).email);
});
