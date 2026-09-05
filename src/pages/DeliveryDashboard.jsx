import React, { useState } from 'react';
import { Bike, MapPin, Navigation, CheckCircle2, PhoneCall, ShieldAlert, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DeliveryDashboard() {
  const { user, logout, showToast } = useApp();
  const [isOnline, setIsOnline] = useState(true);

  const [assignedDelivery] = useState({
    orderId: 'PZ984209',
    customerName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 302, Green Acres Apt, Anna Nagar, Chennai',
    itemsCount: 3,
    totalAmount: 485,
    distance: '1.2 km',
    estimatedTime: '8 mins'
  });

  return (
    <div className="page-screen" style={{ paddingBottom: 40, background: '#f8fafc' }}>
      {/* Header Banner */}
      <div style={{ background: isOnline ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#475569', color: '#fff', padding: '24px 16px', borderRadius: '0 0 20px 20px', marginBottom: 20, transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255, 255, 255, 0.2)', padding: '2px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, marginBottom: 6 }}>
              <Bike size={14} /> Delivery Partner
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>{user?.name || 'Rider Partner'}</h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 4 }}>
              Status: <strong>{isOnline ? '🟢 Online & Ready' : '🔴 Offline'}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            <button
              onClick={logout}
              style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#fff', padding: '6px 12px', borderRadius: 10, fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <LogOut size={12} /> Logout
            </button>
            <button
              onClick={() => {
                setIsOnline(!isOnline);
                showToast(isOnline ? 'Went offline' : 'Now online for deliveries ⚡');
              }}
              style={{ background: '#fff', color: isOnline ? '#047857' : '#475569', border: 'none', padding: '6px 14px', borderRadius: 20, fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              Toggle {isOnline ? 'Offline' : 'Online'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Earnings Card */}
        <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Today's Earnings</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#047857' }}>₹840.00</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Deliveries Done</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>14</div>
          </div>
        </div>

        {/* Active Trip / Order */}
        {assignedDelivery ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Active Delivery Duty</h3>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800 }}>
                Estimated {assignedDelivery.estimatedTime}
              </span>
            </div>

            <div style={{ background: '#fff', borderRadius: 18, border: '2px solid #10b981', padding: 18, boxShadow: '0 4px 12px rgba(16,185,129,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 900, fontSize: '1rem', color: '#0f172a' }}>Order #{assignedDelivery.orderId}</span>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#64748b' }}>{assignedDelivery.distance} away</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, background: '#f8fafc', padding: 12, borderRadius: 12 }}>
                <MapPin size={20} color="#ef4444" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{assignedDelivery.customerName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 2 }}>{assignedDelivery.address}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                <button
                  onClick={() => showToast(`Calling ${assignedDelivery.customerName}... 📞`)}
                  style={{ background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: 12, fontWeight: 700, fontSize: '0.8rem', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <PhoneCall size={16} color="#0284c7" /> Call Customer
                </button>
                <button
                  onClick={() => showToast('Opening Maps Navigation... 🗺️')}
                  style={{ background: '#0284c7', border: 'none', padding: '10px', borderRadius: 12, fontWeight: 700, fontSize: '0.8rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <Navigation size={16} /> Open GPS Map
                </button>
              </div>

              <button
                onClick={() => showToast('Order delivered successfully! 🎉')}
                style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '14px', borderRadius: 14, fontWeight: 900, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}
              >
                <CheckCircle2 size={18} /> Complete & Mark Delivered
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', padding: 24, borderRadius: 16, textAlign: 'center', color: '#64748b' }}>
            <Bike size={36} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
            <p style={{ fontWeight: 700, margin: 0 }}>No active trip assigned right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
