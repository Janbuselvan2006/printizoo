import React, { useState } from 'react';
import { X, Navigation, Home, Briefcase, MapPin, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LocationModal() {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    location,
    setLocation,
    showToast
  } = useApp();

  const [customAddress, setCustomAddress] = useState(location.address);
  const [activeTag, setActiveTag] = useState(location.tag || 'Home');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(3);
          const lon = position.coords.longitude.toFixed(3);
          const detectedAddr = `Sector 18, Near Central Park (${lat}, ${lon})`;
          setLocation({
            address: detectedAddr,
            area: 'Chennai Central',
            tag: 'Current GPS',
            eta: '8 Mins'
          });
          setIsDetecting(false);
          setIsLocationModalOpen(false);
          showToast('GPS Location Detected & Updated! 📍');
        },
        () => {
          // Fallback simulation
          setTimeout(() => {
            const mockAddr = 'Plot 45, Nungambakkam High Rd, Chennai';
            setLocation({
              address: mockAddr,
              area: 'Nungambakkam',
              tag: 'Current GPS',
              eta: '10 Mins'
            });
            setIsDetecting(false);
            setIsLocationModalOpen(false);
            showToast('Location updated to Nungambakkam 📍');
          }, 600);
        },
        { timeout: 3000 }
      );
    } else {
      setIsDetecting(false);
      showToast('Geolocation not supported on device', 'error');
    }
  };

  const handleSaveManual = (e) => {
    e.preventDefault();
    if (!customAddress.trim()) {
      showToast('Please enter an address');
      return;
    }
    setLocation({
      address: customAddress.trim(),
      area: 'Chennai',
      tag: activeTag,
      eta: '10 Mins'
    });
    setIsLocationModalOpen(false);
    showToast('Delivery address saved! ✅');
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsLocationModalOpen(false);
      }}
    >
      <div className="modal-bottom-sheet">
        <div className="modal-header">
          <h3 className="modal-title">Select Delivery Location</h3>
          <button
            className="modal-close-btn"
            onClick={() => setIsLocationModalOpen(false)}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <button
          className="btn-primary-action"
          style={{ marginBottom: 16, background: 'var(--dark)' }}
          onClick={handleDetectLocation}
          disabled={isDetecting}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Navigation size={18} color="#F5C518" />
            {isDetecting ? 'Detecting GPS...' : 'Use Current Location'}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#F5C518' }}>Fast GPS</span>
        </button>

        <div style={{ textAlign: 'center', margin: '12px 0', color: 'var(--gray-500)', fontSize: '0.8rem', fontWeight: 700 }}>
          — OR ENTER MANUALLY —
        </div>

        <form onSubmit={handleSaveManual}>
          <div className="form-group">
            <label className="form-label">Delivery Address / Flat / Landmark</label>
            <input
              type="text"
              className="form-input"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="e.g. Flat 302, Green Meadows, Anna Nagar"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Save As</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { tag: 'Home', icon: <Home size={14} /> },
                { tag: 'Work', icon: <Briefcase size={14} /> },
                { tag: 'Other', icon: <MapPin size={14} /> }
              ].map(({ tag, icon }) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid',
                    borderColor: activeTag === tag ? 'var(--primary)' : 'var(--gray-200)',
                    background: activeTag === tag ? 'var(--primary-light)' : 'var(--white)',
                    color: activeTag === tag ? 'var(--primary-dark)' : 'var(--gray-700)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    cursor: 'pointer'
                  }}
                >
                  {icon} {tag}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary-action" style={{ marginTop: 12 }}>
            <span>Save Location</span>
            <Check size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
