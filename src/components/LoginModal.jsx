import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, Store, Bike, ArrowRight, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginModal() {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    firebaseLogin,
    firebaseSignUp,
    loginWithRole,
    showToast
  } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'demo'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user'); // 'admin' | 'store' | 'delivery' | 'user'
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);

    if (mode === 'login') {
      await firebaseLogin(email, password);
    } else {
      if (!name) {
        showToast('Please enter your full name', 'error');
        setLoading(false);
        return;
      }
      await firebaseSignUp(email, password, name, role);
    }

    setLoading(false);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-bottom-sheet" style={{ maxWidth: 440, padding: 24 }}>
        <div className="modal-header" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={20} color="var(--primary)" />
            <h3 className="modal-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>
              {mode === 'login' ? 'PrintiZoo Firebase Login' : mode === 'signup' ? 'Create New Account' : 'Quick Demo Role Login'}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close login modal">
            <X size={18} />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', background: 'var(--gray-100)', padding: 4, borderRadius: 12, marginBottom: 20 }}>
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: 8,
              background: mode === 'login' ? 'var(--white)' : 'transparent',
              fontWeight: 800,
              fontSize: '0.8rem',
              color: mode === 'login' ? 'var(--dark)' : 'var(--gray-500)',
              cursor: 'pointer',
              boxShadow: mode === 'login' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: 8,
              background: mode === 'signup' ? 'var(--white)' : 'transparent',
              fontWeight: 800,
              fontSize: '0.8rem',
              color: mode === 'signup' ? 'var(--dark)' : 'var(--gray-500)',
              cursor: 'pointer',
              boxShadow: mode === 'signup' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Register
          </button>
          <button
            onClick={() => setMode('demo')}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: 8,
              background: mode === 'demo' ? 'var(--secondary)' : 'transparent',
              fontWeight: 800,
              fontSize: '0.8rem',
              color: 'var(--dark)',
              cursor: 'pointer',
              boxShadow: mode === 'demo' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            ⚡ Demo Roles
          </button>
        </div>

        {mode === 'demo' ? (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 16 }}>
              Test each of the 4 role dashboards directly with 1 click:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => loginWithRole('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid #fee2e2',
                  background: '#fef2f2',
                  color: '#991b1b',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <ShieldCheck size={20} color="#dc2626" />
                <div>
                  <div>Master Admin</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: 500 }}>Full system control & revenue stats</div>
                </div>
              </button>

              <button
                onClick={() => loginWithRole('store')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid #f3e8ff',
                  background: '#faf5ff',
                  color: '#6b21a8',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Store size={20} color="#9333ea" />
                <div>
                  <div>Store Manager</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: 500 }}>Fulfill incoming dark store orders</div>
                </div>
              </button>

              <button
                onClick={() => loginWithRole('delivery')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid #dcfce7',
                  background: '#f0fdf4',
                  color: '#166534',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Bike size={20} color="#16a34a" />
                <div>
                  <div>Delivery Partner</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: 500 }}>10-min grocery delivery duty view</div>
                </div>
              </button>

              <button
                onClick={() => loginWithRole('user', 'Alex Shopper')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid #e0f2fe',
                  background: '#f0f9ff',
                  color: '#075985',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <User size={20} color="#0284c7" />
                <div>
                  <div>Normal Customer User</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: 500 }}>Standard grocery & rental shopper view</div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: 38 }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="form-label">Assign Role</label>
                  <select
                    className="form-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ fontWeight: 700 }}
                  >
                    <option value="user">Normal User / Customer</option>
                    <option value="delivery">Delivery Boy / Partner</option>
                    <option value="store">Store Manager</option>
                    <option value="admin">Master Admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group" style={{ marginBottom: 12 }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: 38 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: 38 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary-action" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? (
                <span>Connecting to Firebase...</span>
              ) : mode === 'login' ? (
                <>
                  <span>Sign In with Firebase</span>
                  <LogIn size={18} />
                </>
              ) : (
                <>
                  <span>Create {role.toUpperCase()} Account</span>
                  <UserPlus size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
