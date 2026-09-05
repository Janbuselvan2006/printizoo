import React, { useState } from 'react';
import { Store, Package, CheckCircle2, Clock, AlertTriangle, LogOut, Plus, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StoreDashboard() {
  const { user, logout, showToast } = useApp();

  const [activeOrders] = useState([
    { id: 'PZ984210', items: '2x Milk, 1x Bread, 6x Eggs', time: '2 mins ago', status: 'Pending Prep' },
    { id: 'PZ984209', items: '1x Atta 5kg, 2x Oil 1L', time: '5 mins ago', status: 'Packing' }
  ]);

  return (
    <div className="page-screen" style={{ paddingBottom: 40, background: '#f8fafc' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', color: '#fff', padding: '24px 16px', borderRadius: '0 0 20px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255, 255, 255, 0.2)', padding: '2px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, marginBottom: 6 }}>
              <Store size={14} /> Store Manager Portal
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>Anna Nagar Dark Store</h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 4 }}>Manager: {user?.name || 'Store Admin'}</p>
          </div>
          <button
            onClick={logout}
            style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#fff', padding: '8px 14px', borderRadius: 12, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#f59e0b', fontSize: '1.4rem', fontWeight: 900 }}>{activeOrders.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Orders to Fulfill</div>
          </div>
          <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#10b981', fontSize: '1.4rem', fontWeight: 900 }}>142</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Completed Today</div>
          </div>
        </div>

        {/* Live Store Orders */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Fulfillment Queue</h3>
          <button onClick={() => showToast('Refreshed orders')} style={{ background: 'none', border: 'none', color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
            Refresh
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeOrders.map((order) => (
            <div key={order.id} style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#0f172a' }}>Order #{order.id}</span>
                <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800 }}>
                  {order.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 12px 0', fontWeight: 600 }}>
                {order.items}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} /> {order.time}
                </span>
                <button
                  onClick={() => showToast(`Order #${order.id} marked ready for rider!`)}
                  style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 10, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <CheckCircle2 size={14} /> Mark Packed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
