import React, { useEffect } from 'react';
import { Check, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function OrderSuccessPage() {
  const { currentOrder, navigateTo } = useApp();

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // safe fallback
    }
  }, []);

  const orderId = currentOrder?.id || 'PZ' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="page-screen">
      <div className="success-screen">
        <div className="success-badge-icon">
          <Check size={48} strokeWidth={3} />
        </div>

        <h2>Order Confirmed! 🎉</h2>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', maxWidth: 300 }}>
          Your order has been received by our dark store team and is being picked with care.
        </p>

        <div className="order-ref-box">
          Order ID: #{orderId}
        </div>

        <div
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)',
            padding: 16,
            width: '100%',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Truck size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Estimated Arrival</div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.75rem' }}>Arriving in 10-12 mins</div>
            </div>
          </div>
          <span style={{ background: 'var(--success-light)', color: '#065F46', fontWeight: 900, fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
            ⚡ Express
          </span>
        </div>

        <button
          className="btn-primary-action"
          style={{ marginBottom: 12 }}
          onClick={() => navigateTo('track')}
        >
          <span>Track Live Order</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigateTo('home')}
          style={{
            width: '100%',
            padding: '14px 20px',
            background: 'transparent',
            border: '2px solid var(--primary)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <ShoppingBag size={18} />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
}
