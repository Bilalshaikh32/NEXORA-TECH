import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Headphones,
  Keyboard,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Watch,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { products, productImage, money } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

const tiles = [
  { name: 'Audio', icon: Headphones, num: '01', text: 'SIGNATURE SOUND & EVERYDAY LISTENING' },
  { name: 'Speakers', icon: Zap, num: '02', text: 'ROOM-FILLING CLARITY & DEPTH' },
  { name: 'Wearables', icon: Watch, num: '03', text: 'SMART ESSENTIALS FOR DAILY LIFE' },
  { name: 'Gaming & Desk', icon: Keyboard, num: '04', text: 'CLEAN SETUP PIECES THAT PERFORM' },
  { name: 'Accessories', icon: Package, num: '05', text: 'PREMIUM ADD-ONS THAT COMPLETE IT' },
];

export default function Home() {
  const { addToCart } = useStore();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid container">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-kicker"
            >
              <span className="pulse-dot" /> PREMIUM ELECTRONICS CURATED FOR MODERN LIVING
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65 }}
            >
              CLEAN TECH.
              <br />
              <span>SHARP DETAILS.</span>
              <br />
              <em>BETTER EVERYDAY.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
            >
              Explore a refined collection of headphones, wearables, desk gear and accessories presented with a premium,
              modern shopping experience.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              <Link to="/shop" className="btn btn-primary">
                Shop the collection <ArrowUpRight size={19} />
              </Link>
              <Link to="/about" className="btn btn-text">
                Learn more <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              className="hero-chip-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <span>Fast browsing</span>
              <span>Smart filters</span>
              <span>Wishlist</span>
              <span>Elegant checkout flow</span>
            </motion.div>

            <div className="hero-stats">
              <span>
                10 <small>PREMIUM PRODUCTS</small>
              </span>
              <i />
              <span>
                05 <small>CURATED CATEGORIES</small>
              </span>
              <i />
              <span>
                01 <small>CLEAN EXPERIENCE</small>
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <span className="hero-visual-top">[ FEATURED / AUDIO / 001 ]</span>

            <motion.div
              className="hero-float-card hero-float-left"
              initial={{ opacity: 0, x: -24, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
            >
              <Sparkles size={16} />
              <div>
                <strong>Clean product visuals</strong>
                <span>Studio-style presentation</span>
              </div>
            </motion.div>

            <motion.img
              src="/images/hero-headphones.webp"
              alt="Pulse X1 Wireless headphones product photo"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: reduceMotion ? 0 : [0, -10, 0] }}
              transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : 0.12, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            />

            <motion.div
              className="hero-float-card hero-float-right"
              initial={{ opacity: 0, x: 24, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.58, duration: 0.55 }}
            >
              <div className="hero-rating">✦</div>
              <div>
                <strong>Featured selection</strong>
                <span>Elegant comfort and sound</span>
              </div>
            </motion.div>

            <div className="hero-visual-caption">
              <div>
                <span className="eyebrow">FEATURED / AUDIO COLLECTION</span>
                <strong>Pulse X1 Wireless</strong>
                <span>{money(products[0].price)}</span>
              </div>
              <button onClick={() => addToCart(products[0].id)} aria-label="Add Pulse X1 to cart">
                <ArrowUpRight size={22} />
              </button>
            </div>

            <div className="hero-side-text">DESIGNED FOR FOCUS • TUNED FOR DAILY LIFE</div>
          </div>
        </div>

        <div className="hero-bottom container">
          <div className="scroll-cue">
            <ArrowDown size={15} /> SCROLL TO DISCOVER
          </div>
          <span>MODERN TECH WITH A CLEANER, MORE PREMIUM FEEL.</span>
        </div>
      </section>

      <section className="feature-strip" aria-label="Store features">
        <div className="container feature-strip-inner">
          <div>
            <Truck size={24} />
            <span>
              <strong>SIMULATED SHIPPING</strong>
              <small>Free demo shipping over PKR 30,000</small>
            </span>
          </div>
          <div>
            <ShieldCheck size={24} />
            <span>
              <strong>EFFORTLESS DEMO CHECKOUT</strong>
              <small>Try the flow. No payments or real orders.</small>
            </span>
          </div>
          <div>
            <Zap size={24} />
            <span>
              <strong>PREMIUM TECH PICKS</strong>
              <small>Audio, wearables, desk gear and everyday essentials</small>
            </span>
          </div>
        </div>
      </section>

      <section className="section container category-section">
        <div className="section-top">
          <div>
            <div className="section-eyebrow">
              <span className="line-mini" /> SHOP BY CATEGORY
            </div>
            <h2>
              Find your next <span className="gradient-word">favorite.</span>
            </h2>
          </div>
          <Link to="/shop" className="text-link">
            Shop all products <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="category-grid">
          {tiles.map((c) => (
            <Link to={`/shop?category=${encodeURIComponent(c.name)}`} className="category-tile" key={c.name}>
              <div className="tile-head">
                <span>{c.num} / 05</span>
                <ArrowUpRight size={21} />
              </div>
              <c.icon className="tile-icon" strokeWidth={1.2} />
              <div>
                <strong>{c.name}</strong>
                <span>{c.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container featured-section">
        <div className="section-top">
          <div>
            <div className="section-eyebrow">
              <span className="line-mini" /> FEATURED PICKS
            </div>
            <h2>
              Designed to be <span className="gradient-word">noticed.</span>
            </h2>
            <p>Clean visuals, standout essentials and a more elevated online shopping feel.</p>
          </div>
          <Link to="/shop" className="text-link">
            Explore all 10 <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="product-grid home-featured">
          {[products[0], products[4], products[6], products[3]].map((p, i) => (
            <ProductCard product={p} index={i} key={p.id} />
          ))}
        </div>
      </section>

      <section className="container campaign-wrap">
        <div className="campaign">
          <div className="campaign-content">
            <span className="eyebrow">SPOTLIGHT / AUDIO ESSENTIALS</span>
            <h2>
              SOUND
              <br />
              WITH
              <br />
              <em>CLARITY.</em>
            </h2>
            <p>Immerse yourself in cleaner sound, modern comfort and a product experience that feels polished from start to finish.</p>
            <Link className="btn btn-white" to="/shop?category=Audio">
              Discover audio <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="campaign-product">
            <img src={productImage(products[1])} alt="Studio Pro ANC headphones product photo" loading="lazy" />
            <span>STUDIO PRO / 002</span>
          </div>
        </div>
      </section>

      <section className="section container editorial-section">
        <div className="editorial-head">
          <div className="section-eyebrow">
            <span className="line-mini" /> NEXORA VISION
          </div>
          <h2>
            MODERN TECH,
            <br />
            CALM INTERFACES,
            <br />
            <span>BETTER CHOICES.</span>
          </h2>
        </div>
        <div className="editorial-right">
          <p>
            Great shopping experiences should feel effortless. That means clean layouts, beautiful product presentation and interactions that feel smooth on every screen.
          </p>
          <Link to="/about" className="text-link">
            Discover our story <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="newsletter container">
        <div>
          <span className="eyebrow">READY TO EXPLORE?</span>
          <h2>
            Browse with confidence.
            <br />
            <span>The cleanest pieces are waiting.</span>
          </h2>
        </div>
        <Link to="/shop" className="btn btn-primary">
          Shop the collection <ArrowUpRight size={19} />
        </Link>
      </section>
    </>
  );
}
