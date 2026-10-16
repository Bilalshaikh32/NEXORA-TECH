import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,Compass} from 'lucide-react';
export default function NotFound(){return <div className="container not-found"><span className="giant-number">404</span><div className="section-eyebrow">YOU'VE REACHED UNCHARTED TERRITORY</div><h1>Wrong turn. <em>Right direction.</em></h1><p>That page doesn't exist. Let's get you back to the good tech.</p><Link className="btn btn-primary" to="/">Return home <ArrowRight size={18}/></Link></div>}
