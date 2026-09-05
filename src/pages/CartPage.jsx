import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const {
    cart,
    updateQty,
    removeFromCart,
    clearCart,
    itemTotal,
    deliveryFee,
    handlingFee,
    grandTotal,
    totalSavings,
    navigateTo,
    totalCartItems
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="page-screen">
        <div className="page-top-bar">
          <button className="page-back-btn" onClick={() => navigateTo('home')} aria-label="Back to home">
            <ArrowLeft size={18} />
          </button>
          <h2 className="page-heading">My Cart (0)</h2>
        </div>

        <div className="empty-state-wrap">
          <div className="empty-state-icon">
            <ShoppingBag size={42} />
          </div>
          <h3>Your cart is empty</h3>
          <p>Explore farm fresh groceries, cold beverages, snacks & smart home rentals!</p>
          <button className="btn-primary-action" style={{ maxWidth: 240 }} onClick={() => navigateTo('home')}>
            <span>Start Shopping</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-screen" style={{ paddingBottom: 90 }}>
      <div className="page-top-bar">
        <button className="page-back-btn" onClick={() => navigateTo('home')} aria-label="Back to home">
          <ArrowLeft size={18} />
        </button>
        <h2 className="page-heading">My Cart ({totalCartItems})</h2>
        <button
          onClick={clearCart}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'var(--danger)',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="cart-items-list">
        {cart.map((item) => {
          const isRental = item.type === 'rental';
          const price = isRental ? item.effectivePrice : item.price;

          return (
            <div key={`${item.type}-${item.id}`} className="cart-item-card">
              <div className="cart-item-thumb">{item.emoji}</div>

              <div className="cart-item-meta">
                <h4 className="cart-item-title">{item.name}</h4>
                <div className="cart-item-sub">
                  {isRental ? `Tenure: ${item.duration} Months Rent` : item.weight}
                </div>
                <div className="cart-item-price">
                  ₹{price * item.qty}
                  {isRental && <span style={{ fontSize: '0.7rem', color: 'var(--gray-500)' }}>/mo</span>}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="qty-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => updateQty(item.id, -1, item.type)}
                  aria-label="Decrease item quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="stepper-count">{item.qty}</span>
                <button
                  className="stepper-btn"
                  onClick={() => updateQty(item.id, 1, item.type)}
                  aria-label="Increase item quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id, item.type)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-400)',
                  cursor: 'pointer',
                  padding: 4
                }}
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bill Breakdown Summary */}
      <div className="bill-summary-card">
        {totalSavings > 0 && (
          <div className="savings-banner">
            <Tag size={15} />
            <span>You saved ₹{totalSavings} with instant discounts!</span>
          </div>
        )}

        <div className="bill-row">
          <span>Items Total</span>
          <span>₹{itemTotal}</span>
        </div>

        <div className="bill-row">
          <span>Delivery Partner Fee</span>
          <span className={deliveryFee === 0 ? 'free-tag' : ''}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>

        <div className="bill-row">
          <span>Platform & Packaging Fee</span>
          <span>₹{handlingFee}</span>
        </div>

        <div className="bill-row total">
          <span>Grand Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>

      {/* Delivery Guarantee Note */}
      <div
        style={{
          margin: '0 16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.75rem',
          color: 'var(--gray-500)',
          fontWeight: 600
        }}
      >
        <ShieldCheck size={18} color="#10B981" />
        <span>100% contactless delivery guaranteed with verified hygiene check.</span>
      </div>

      {/* Fixed Checkout Action Bar */}
      <div className="bottom-action-bar">
        <button
          className="btn-primary-action"
          onClick={() => navigateTo('checkout')}
        >
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>TOTAL TO PAY</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>₹{grandTotal}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}
