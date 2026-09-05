import React from 'react';
import { Sparkles, Clock, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PromoBanner() {
  const { currentTab } = useApp();

  if (currentTab === 'rental') {
    return (
      <div className="banner-carousel">
        <div className="hero-banner rental-hero">
          <div className="banner-chip">
            <Sparkles size={11} /> 0% DEPOSIT PROMO
          </div>
          <h3>Furnish Your Dream Home</h3>
          <p>Premium Sofas, Workstations & Appliances from ₹299/month</p>
          <div className="banner-perks">
            <span className="perk-tag">🛋️ Free Relocation</span>
            <span className="perk-tag">🔧 Free Maintenance</span>
            <span className="perk-tag">🔄 Upgrade Anytime</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="banner-carousel">
      <div className="hero-banner">
        <div className="banner-chip">
          <Sparkles size={11} /> FLASH SALE • UP TO 40% OFF
        </div>
        <h3>Farm Fresh & Daily Staples</h3>
        <p>Hand-picked fruits, veggies & cold treats delivered in 10 mins</p>
        <div className="banner-perks">
          <span className="perk-tag"><Clock size={11} /> 10 Min Delivery</span>
          <span className="perk-tag"><Truck size={11} /> Free on ₹199+</span>
          <span className="perk-tag"><ShieldCheck size={11} /> 100% Quality Check</span>
        </div>
      </div>
    </div>
  );
}
