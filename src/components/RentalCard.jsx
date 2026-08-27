import React, { useState } from 'react';
import { ShieldCheck, Check, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RentalCard({ product }) {
  const { cart, addToCart, updateQty } = useApp();
  const [duration, setDuration] = useState(3);

  // Tenure Discount logic
  let discountRate = 0;
  if (duration === 3) discountRate = 0.05;
  if (duration === 6) discountRate = 0.10;
  if (duration === 12) discountRate = 0.15;

  const effectiveMonthlyPrice = Math.round(product.monthlyPrice * (1 - discountRate));

  const cartItem = cart.find((item) => item.id === product.id && item.type === 'rental');
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="rental-card">
      <div className="rental-card-main">
        <div className="rental-thumb">{product.emoji}</div>
        <div className="rental-details">
          <span className="card-tag" style={{ position: 'static', alignSelf: 'flex-start', marginBottom: 4 }}>
            {product.tag}
          </span>
          <h4 className="rental-title">{product.name}</h4>
          <ul className="rental-features">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx}>
                <Check size={12} color="#10B981" /> {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rental-card-bottom">
        <div className="duration-select-box">
          <span className="duration-label">Tenure:</span>
          <select
            className="duration-select"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            aria-label="Rental tenure duration"
          >
            <option value={1}>1 Mo (Base)</option>
            <option value={3}>3 Mos (-5%)</option>
            <option value={6}>6 Mos (-10%)</option>
            <option value={12}>12 Mos (-15%)</option>
          </select>
        </div>

        <div className="rental-price-cta">
          <div className="monthly-price">
            ₹{effectiveMonthlyPrice}
            <span>/mo</span>
          </div>

          {qty === 0 ? (
            <button
              className="add-btn"
              style={{ background: '#FEF3C7', color: '#B45309', borderColor: '#D97706' }}
              onClick={() => addToCart(product, 'rental', duration)}
            >
              RENT NOW
            </button>
          ) : (
            <div className="qty-stepper" style={{ background: '#D97706' }}>
              <button
                className="stepper-btn"
                onClick={() => updateQty(product.id, -1, 'rental')}
              >
                <Minus size={13} />
              </button>
              <span className="stepper-count">{qty}</span>
              <button
                className="stepper-btn"
                onClick={() => updateQty(product.id, 1, 'rental')}
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
