import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { money, productImage } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, delay: Math.min(index, 8) * 0.035 }}
    >
      <div className="product-media" style={{ '--item-accent': product.accent }}>
        <Link className="product-media-link" to={`/product/${product.id}`} aria-label={`View ${product.name} details`}>
          <img src={productImage(product)} alt={`${product.name} product photo`} loading="lazy" />
        </Link>
        <span className="mini-tag">{product.tag}</span>
        <button
          type="button"
          className={`favorite-button ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={`${saved ? 'Remove' : 'Add'} ${product.name} ${saved ? 'from' : 'to'} wishlist`}
          aria-pressed={saved}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button type="button" className="add-floating" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to cart`}>
          <Plus size={20} />
        </button>
      </div>

      <div className="product-copy">
        <div className="product-kicker">
          {product.category} <span className="dot-mini" /> In stock
        </div>
        <Link to={`/product/${product.id}`} className="product-heading">
          {product.name} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <p>{product.teaser}</p>
        <div className="product-bottom">
          <span className="product-price">{money(product.price)}</span>
          {product.oldPrice && <s>{money(product.oldPrice)}</s>}
        </div>
      </div>
    </motion.article>
  );
}
