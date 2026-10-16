import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck, ChevronRight } from 'lucide-react';
import { products, getProduct, money, productImage } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [photo, setPhoto] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setPhoto(0);
  }, [id]);

  if (!product) {
    return (
      <div className="container no-results page-not-found">
        <h1>Product not found.</h1>
        <p>This product is not part of the current collection.</p>
        <Link className="btn btn-primary" to="/shop">
          Back to shop <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);

  const saved = wishlist.includes(id);

  return (
    <>
      <div className="container breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      <div className="container product-detail-grid">
        <div className="details-gallery">
          <div className="gallery-main" style={{ '--item-accent': product.accent }}>
            <img key={`${id}-${photo}`} src={productImage(product, !!photo)} alt={`${product.name} ${photo === 0 ? 'primary' : 'alternate'} product photo`} />
            <span className="mini-tag detail-tag">{product.tag}</span>
            <span className="gallery-index">VIEW 0{photo + 1} / 02</span>
          </div>

          <div className="gallery-thumbs">
            {[0, 1].map((n) => (
              <button
                key={n}
                aria-label={`View image ${n + 1} of ${product.name}`}
                aria-pressed={photo === n}
                onClick={() => setPhoto(n)}
                className={photo === n ? 'active' : ''}
              >
                <img src={productImage(product, !!n)} alt="" />
              </button>
            ))}
          </div>

          <p className="gallery-disclaimer">Clean product presentation with multiple gallery views.</p>
        </div>

        <div className="product-detail-copy">
          <span className="eyebrow">
            <span className="pulse-dot" /> {product.category.toUpperCase()} / NEXORA COLLECTION
          </span>
          <h1>{product.name}</h1>
          <p className="detail-teaser">{product.teaser}</p>

          <div className="detail-price">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && <s>{money(product.oldPrice)}</s>}
            <span>AVAILABLE NOW</span>
          </div>

          <div className="detail-rule" />
          <p className="detail-desc">{product.description}</p>
          <div className="stock-line"><span className="stock-indicator" /> In stock · {product.stock} units</div>

          <div className="purchase-row">
            <div className="quantity-box" aria-label="Select quantity">
              <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={18} />
              </button>
              <output aria-live="polite">{quantity}</output>
              <button aria-label="Increase quantity" disabled={quantity >= product.stock} onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
                <Plus size={18} />
              </button>
            </div>

            <button className="btn btn-primary detail-add" onClick={() => addToCart(product.id, quantity)}>
              <ShoppingBag size={19} /> Add to bag <ArrowRight size={18} />
            </button>

            <button
              aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={saved}
              className={`favorite-large ${saved ? 'is-saved' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={21} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="benefits">
            <div>
              <Truck size={20} />
              <span>Free shipping over PKR 30,000</span>
            </div>
            <div>
              <ShieldCheck size={20} />
              <span>Simple, smooth and secure browsing experience</span>
            </div>
          </div>

          <div className="spec-area">
            <div className="spec-title">
              <h3>Product specifications</h3>
              <span>DETAILS</span>
            </div>
            {product.specs.map(([k, v]) => (
              <div className="spec-row" key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section container related-section">
        <div className="section-top">
          <div>
            <div className="section-eyebrow">
              <span className="line-mini" /> KEEP EXPLORING
            </div>
            <h2>
              Pair it with <em>something exceptional.</em>
            </h2>
          </div>
          <Link className="text-link" to="/shop">
            Back to all products <ArrowRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {related.map((p, i) => (
            <ProductCard product={p} key={p.id} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
