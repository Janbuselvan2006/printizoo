import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQty } = useApp();

  const cartItem = cart.find((item) => item.id === product.id && item.type === 'grocery');
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="product-card">
      <div className="card-top">
        <span className="card-tag">{product.tag}</span>
        <div style={{ transform: 'scale(1)', transition: 'transform 0.2s' }}>
          {product.emoji}
        </div>
        <span className="card-eta">⚡ {product.timeMin}</span>
      </div>

      <div className="card-body">
        <h4 className="product-name" title={product.name}>
          {product.name}
        </h4>
        <div className="product-weight">{product.weight}</div>

        <div className="card-footer">
          <div className="price-box">
            <div className="current-price">₹{product.price}</div>
            {product.mrp && product.mrp > product.price && (
              <span className="mrp-price">₹{product.mrp}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              className="add-btn"
              onClick={() => addToCart(product, 'grocery')}
              aria-label={`Add ${product.name} to cart`}
            >
              ADD
            </button>
          ) : (
            <div className="qty-stepper">
              <button
                className="stepper-btn"
                onClick={() => updateQty(product.id, -1, 'grocery')}
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="stepper-count">{qty}</span>
              <button
                className="stepper-btn"
                onClick={() => updateQty(product.id, 1, 'grocery')}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
