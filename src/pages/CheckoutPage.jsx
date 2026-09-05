import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CheckoutPage() {
  const {
    location,
    user,
    grandTotal,
    itemTotal,
    deliveryFee,
    handlingFee,
    placeOrder,
    navigateTo,
    showToast
  } = useApp();

  const [address, setAddress] = useState(location.address || '12 Gandhi Road, Anna Nagar, Chennai');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'cash' | 'card'
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      showToast('Please provide a delivery address', 'error');
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      showToast('Please provide a valid 10-digit phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        address,
        phone,
        paymentMethod,
        note
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="page-screen" style={{ paddingBottom: 90 }}>
      <div className="page-top-bar">
        <button className="page-back-btn" onClick={() => navigateTo('cart')} aria-label="Back to cart">
          <ArrowLeft size={18} />
        </button>
        <h2 className="page-heading">Checkout & Payment</h2>
      </div>

      <form onSubmit={handleSubmit} className="checkout-section">
        {/* Delivery Address Card */}
        <div className="form-card">
          <h4 className="form-card-title">
            <MapPin size={18} color="var(--primary)" />
            <span>Delivery Address</span>
          </h4>
          <div className="form-group">
            <textarea
              className="form-textarea"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter complete building / street address"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Delivery Note (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Leave with security / Ring bell"
            />
          </div>
        </div>

        {/* Contact Phone Card */}
        <div className="form-card">
          <h4 className="form-card-title">
            <Phone size={18} color="var(--primary)" />
            <span>Contact Number</span>
          </h4>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              required
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="form-card">
          <h4 className="form-card-title">
            <CreditCard size={18} color="var(--primary)" />
            <span>Choose Payment Method</span>
          </h4>

          <div className="payment-options-grid">
            <div
              className={`payment-option-card ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <Smartphone size={22} color={paymentMethod === 'upi' ? 'var(--primary)' : 'var(--gray-500)'} />
              <span>Instant UPI</span>
            </div>

            <div
              className={`payment-option-card ${paymentMethod === 'cash' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cash')}
            >
              <Banknote size={22} color={paymentMethod === 'cash' ? 'var(--primary)' : 'var(--gray-500)'} />
              <span>Cash on Delivery</span>
            </div>

            <div
              className={`payment-option-card ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={22} color={paymentMethod === 'card' ? 'var(--primary)' : 'var(--gray-500)'} />
              <span>Card / NetBanking</span>
            </div>
          </div>
        </div>

        {/* Final Price Breakdown */}
        <div className="form-card" style={{ background: 'var(--cream)' }}>
          <div className="bill-row">
            <span>Items Subtotal</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="bill-row">
            <span>Delivery Charge</span>
            <span className={deliveryFee === 0 ? 'free-tag' : ''}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="bill-row">
            <span>Platform Fee</span>
            <span>₹{handlingFee}</span>
          </div>
          <div className="bill-row total">
            <span>Final Payable</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="btn-primary-action"
          disabled={isSubmitting}
          style={{ width: '100%', marginTop: 8 }}
        >
          <span>{isSubmitting ? 'Placing Order...' : 'Place Order Now'}</span>
          <CheckCircle2 size={20} />
        </button>
      </form>
    </div>
  );
}
