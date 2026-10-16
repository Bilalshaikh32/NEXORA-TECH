import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Layers, MoveUpRight, Zap } from 'lucide-react';
import { PageIntro } from '../components/Layout';
import { products, productImage } from '../data/products';

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="OUR STORY / NEXORA TECH"
        title={<>A cleaner way <em>to shop for tech.</em></>}
        sub="NEXORA TECH is built around premium presentation, modern usability and a refined digital shopping experience."
      />

      <section className="container about-lead">
        <div className="about-image">
          <img src={productImage(products[4])} alt="Orbit Smartwatch product photo" />
          <span>DETAILS MAKE THE DIFFERENCE / 2026</span>
        </div>

        <div className="about-story">
          <div className="section-eyebrow">
            <span className="line-mini" /> WHO WE ARE
          </div>
          <h2>
            Thoughtful by design.
            <br />
            <span>Curated with intention.</span>
          </h2>
          <p>
            NEXORA TECH is a concept store that presents fictional electronics through a cleaner and more elevated lens. From audio gear to desk accessories, every product is showcased to feel premium, simple and easy to explore.
          </p>
          <p>
            The experience focuses on clear navigation, refined styling, intuitive browsing and a polished path from discovery to checkout.
          </p>

          <div className="about-stats">
            <div>
              <strong>10</strong>
              <small>PRODUCTS</small>
            </div>
            <div>
              <strong>05</strong>
              <small>CATEGORIES</small>
            </div>
            <div>
              <strong>100%</strong>
              <small>RESPONSIVE EXPERIENCE</small>
            </div>
          </div>

          <Link to="/shop" className="btn btn-primary">
            Explore products <MoveUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="section container values-section">
        <div className="section-top">
          <div>
            <div className="section-eyebrow">
              <span className="line-mini" /> OUR PHILOSOPHY
            </div>
            <h2>
              Design that <em>feels better.</em>
            </h2>
          </div>
        </div>

        <div className="value-grid">
          <article>
            <Lightbulb size={28} />
            <span className="eyebrow">01 / CLARITY</span>
            <h3>Keep it intuitive.</h3>
            <p>Users should find products, information and actions without friction or confusion.</p>
          </article>

          <article>
            <Layers size={28} />
            <span className="eyebrow">02 / CRAFT</span>
            <h3>Make every detail matter.</h3>
            <p>Typography, spacing, animation and imagery should all work together to feel refined.</p>
          </article>

          <article>
            <Zap size={28} />
            <span className="eyebrow">03 / EXPERIENCE</span>
            <h3>Stay modern.</h3>
            <p>A premium store should feel beautiful, responsive and smooth across every screen size.</p>
          </article>
        </div>
      </section>

      <section className="container about-cta">
        <span className="eyebrow">THE COLLECTION IS READY</span>
        <h2>
          Your next favorite product
          <br />
          starts here.
        </h2>
        <Link to="/shop" className="btn btn-white">
          Shop the collection <MoveUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
