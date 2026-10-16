const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||'').trim());
export function validateContact(values){const v={};
 if(String(values.name||'').trim().length<2)v.name='Please enter at least 2 characters.';
 if(!validEmail(values.email))v.email='Enter a valid email address.';
 if(!String(values.subject||'').trim())v.subject='A subject is required.';
 if(String(values.message||'').trim().length<10)v.message='Please write at least 10 characters.';
 return v;
}
export function validateCheckout(form,hasItems){const err={};
 for(const key of ['firstName','lastName','address','city','province'])if(String(form[key]||'').trim().length<2)err[key]='Please enter at least 2 characters.';
 if(!validEmail(form.email))err.email='Please enter a valid email.';
 if(!/^\+?[0-9\-\s()]{9,18}$/.test(String(form.phone||'').trim()))err.phone='Enter a valid phone number.';
 if(!/^[A-Za-z0-9 -]{4,10}$/.test(String(form.postal||'').trim()))err.postal='Enter a valid postal code.';
 if(!hasItems)err.cart='Your cart is empty.';
 return err;
}
