import React,{useState} from 'react';
import {ArrowRight,CheckCircle2,Mail,MapPin,MessageCircle,Send} from 'lucide-react';
import {PageIntro,Field} from '../components/Layout';
import {validateContact} from '../utils/validation';
const defaults={name:'',email:'',subject:'',message:''};
export default function Contact(){const [values,setValues]=useState(defaults);const [errors,setErrors]=useState({});const [sent,setSent]=useState(false);
 function change(field, value) {
  setValues(current => ({...current, [field]: value}));
  setErrors(current => {
    if (!current[field]) return current;
    const next = {...current}; delete next[field]; return next;
  });
 }
 function submit(e){
  e.preventDefault();
  const v=validateContact(values);
  setErrors(v);
  if(Object.keys(v).length===0){setSent(true);setValues(defaults);return;}
  const firstField=Object.keys(v)[0];
  requestAnimationFrame(()=>document.getElementById(`contact-${firstField}`)?.focus());
 }
 return <><PageIntro eyebrow="LET'S TALK / CONTACT" title={<>Start a <em>conversation.</em></>} sub="Questions, ideas or just curious? Leave a demo message and explore our frontend contact experience."/><section className="container contact-layout"><div className="contact-side"><span className="eyebrow">CONNECT WITH NEXORA</span><h2>Good questions<br/>start great ideas.</h2><p>This is a demonstration storefront, not a real business. Contact submissions are simulated locally and are not emailed or stored.</p><div className="contact-info"><div><Mail size={22}/><span><strong>GENERAL INQUIRIES</strong><small>Demo only · No monitored inbox</small></span></div><div><MapPin size={22}/><span><strong>OUR STUDIO</strong><small>Fictional digital-first brand</small></span></div><div><MessageCircle size={22}/><span><strong>RESPONSE TIME</strong><small>No actual messages are delivered</small></span></div></div><div className="contact-side-marker">N / 010101</div></div><div className="form-card">{sent?<div className="form-success"><CheckCircle2 size={43}/><h2>Message simulated.</h2><p>Your demo form passed validation. No message was sent or stored — this is a frontend-only project.</p><button className="btn btn-primary" onClick={()=>setSent(false)}>Send another demo message <ArrowRight size={17}/></button></div>:<form noValidate onSubmit={submit}><div className="form-head"><span className="eyebrow">GET IN TOUCH</span><h2>Drop us a line.</h2><p>All fields required. Demo form only.</p></div><div className="form-two"><Field id="contact-name" label="Your name" autoComplete="name" placeholder="Alex Morgan" value={values.name} onChange={e=>change('name',e.target.value)} error={errors.name}/><Field id="contact-email" label="Email address" type="email" autoComplete="email" placeholder="alex@example.com" value={values.email} onChange={e=>change('email',e.target.value)} error={errors.email}/></div><Field id="contact-subject" label="Subject" placeholder="What's on your mind?" value={values.subject} onChange={e=>change('subject',e.target.value)} error={errors.subject}/><div className="field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" rows={5} placeholder="Write your message here..." value={values.message} aria-invalid={!!errors.message} aria-describedby={errors.message?'contact-message-error':undefined} onChange={e=>change('message',e.target.value)}/>{errors.message&&<small id="contact-message-error" className="input-error">{errors.message}</small>}</div><button type="submit" className="btn btn-primary full-width">Simulate sending message <Send size={17}/></button><p className="form-footnote">Demo experience. No personal data is transmitted.</p></form>}</div></section></>}
