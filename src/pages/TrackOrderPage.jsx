import React from 'react';
import { ArrowLeft, Check, Clock, Phone, MapPin, Package, ShieldCheck, Bike } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TrackOrderPage() {
  const { currentOrder, navigateTo, showToast } = useApp();

  const orderId = currentOrder?.id || 'PZ482910';
  const shippingAddress = currentOrder?.shipping?.address || '12 Gandhi Road, Anna Nagar, Chennai';

  const timelineSteps = [
    {
      title: 'Order Confirmed',
      desc: 'Dark store received your order',
      time: 'Just now',
      status: 'completed',
      icon: <Check size={12} />
    },
    {
      title: 'Items Packed & Inspected',
      desc: 'Freshly packed & quality checked',
      time: '2 mins ago',
      status: 'completed',
      icon: <Package size={12} />
    },
    {
      title: 'Rider On The Way',
      desc: 'Delivery partner Ramesh is navigating to you',
      time: 'In transit',
      status: 'active',
      icon: <Bike size={12} />
    },
    {
      title: 'Doorstep Delivery',
      desc: 'Contactless handover',
      time: 'ETA 8 mins',
      status: 'pending',
      icon: <MapPin size={12} />
    }
  ];

  return (
    <div className="page-screen" style={{ paddingBottom: 40 }}>
      <div className="page-top-bar">
        <button className="page-back-btn" onClick={() => navigateTo('home')} aria-label="Back to home">
          <ArrowLeft size={18} />
        </button>
        <h2 className="page-heading">Live Order Tracking</h2>
      </div>

      {/* Status Card */}
      <div className="tracking-card">
        <div className="track-header">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 700 }}>
              ORDER #{orderId}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--gray-900)' }}>
              Arriving in ~8 mins
            </div>
          </div>
          <span className="track-eta-badge">⚡ On The Way</span>
        </div>

        {/* Timeline */}
        <div className="timeline-stepper">
          <div className="timeline-line" />
          {timelineSteps.map((step, idx) => (
            <div key={idx} className={`timeline-step ${step.status}`}>
              <div className="timeline-dot">{step.icon}</div>
              <div className="timeline-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                <span style={{ fontSize: '0.68rem', color: 'var(--gray-400)', fontWeight: 600 }}>
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Partner Card */}
      <div
        style={{
          margin: '0 16px 16px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-full)',
              background: 'var(--secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem'
            }}
          >
            🛵
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Ramesh K.</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>⭐ 4.9 • 2,400+ deliveries</div>
          </div>
        </div>

        <button
          onClick={() => showToast('Calling Delivery Partner Ramesh... 📞')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            background: 'var(--success-light)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#065F46',
            cursor: 'pointer'
          }}
          aria-label="Call delivery partner"
        >
          <Phone size={18} />
        </button>
      </div>

      {/* Shipping Address Confirmation */}
      <div
        style={{
          margin: '0 16px 20px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          padding: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <MapPin size={16} color="var(--primary)" />
          <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>Delivering to</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--gray-700)', paddingLeft: 24 }}>
          {shippingAddress}
        </p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <button className="btn-primary-action" onClick={() => navigateTo('home')}>
          <span>Return to Home</span>
          <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
    </div>
  );
}
