import React, { useState } from 'react';
import { X, Phone, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login, showToast } = useApp();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('Alex Johnson');
  const [otp, setOtp] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      showToast('Please enter a valid 10-digit phone number');
      return;
    }
    setStep('otp');
    setOtp('123456'); // Pre-filled demo OTP for ease
    showToast('OTP sent! Use demo OTP: 123456 📲');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '123456') {
      showToast('Invalid OTP! Please enter 123456', 'error');
      return;
    }
    login(phone, name);
    setStep('phone');
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setStep('phone');
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-bottom-sheet">
        <div className="modal-header">
          <h3 className="modal-title">{step === 'phone' ? 'Login or Sign Up' : 'Verify Mobile OTP'}</h3>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close login modal">
            <X size={18} />
          </button>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 16 }}>
              Get unlimited 10-minute grocery deliveries & order tracking.
            </p>

            <div className="form-group">
              <label className="form-label">Full Name (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Johnson"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--gray-500)'
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  className="form-input"
                  style={{ paddingLeft: 48 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit number"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary-action" style={{ marginTop: 8 }}>
              <span>Continue with OTP</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div
              style={{
                background: 'var(--secondary-light)',
                border: '1px solid var(--secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                fontSize: '0.82rem',
                color: 'var(--dark)',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <KeyRound size={18} color="#D97706" />
              <span>Demo OTP: <strong>123456</strong> sent to +91 {phone}</span>
            </div>

            <div className="form-group">
              <label className="form-label">Enter 6-Digit OTP</label>
              <input
                type="text"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="Enter 123456"
                maxLength={6}
                style={{ textAlign: 'center', fontSize: '1.3rem', letterSpacing: '6px', fontWeight: 800 }}
                required
              />
            </div>

            <button type="submit" className="btn-primary-action">
              <span>Verify & Login</span>
              <CheckCircle2 size={18} />
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.82rem',
                marginTop: 12,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
