import React from 'react';
import { ShieldCheck, Users, Store, Bike, DollarSign, LogOut, Package, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { user, logout, navigateTo, showToast } = useApp();

  return (
    <div className="page-screen" style={{ paddingBottom: 40, background: '#f8fafc' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '24px 16px', borderRadius: '0 0 20px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '2px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, marginBottom: 6 }}>
              <ShieldCheck size={14} /> Master Admin
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>System Control Panel</h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: 4 }}>Welcome, {user?.name || 'Administrator'}</p>
          </div>
          <button
            onClick={logout}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff', padding: '8px 14px', borderRadius: 12, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#3b82f6', marginBottom: 8 }}><DollarSign size={24} /></div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>₹1,42,850</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Revenue Today</div>
          </div>

          <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#10b981', marginBottom: 8 }}><Package size={24} /></div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>324</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Orders</div>
          </div>

          <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#8b5cf6', marginBottom: 8 }}><Store size={24} /></div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>12 Stores</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Outlets</div>
          </div>

          <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#f59e0b', marginBottom: 8 }}><Bike size={24} /></div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>48 Active</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Delivery Partners</div>
          </div>
        </div>

        {/* Management Tools */}
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Admin Actions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => showToast('Managing Store Outlets... 🏪')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', padding: 16, borderRadius: 14, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Store size={20} color="#8b5cf6" />
              <span>Manage Stores & Outlets</span>
            </div>
            <TrendingUp size={18} color="#94a3b8" />
          </button>

          <button
            onClick={() => showToast('Delivery Fleet Management... 🛵')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', padding: 16, borderRadius: 14, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Bike size={20} color="#f59e0b" />
              <span>Delivery Partner Fleet</span>
            </div>
            <TrendingUp size={18} color="#94a3b8" />
          </button>

          <button
            onClick={() => showToast('Managing Users & Roles in Firestore... 👥')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', padding: 16, borderRadius: 14, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Users size={20} color="#3b82f6" />
              <span>User & Role Permissions</span>
            </div>
            <TrendingUp size={18} color="#94a3b8" />
          </button>
        </div>
      </div>
    </div>
  );
}
