import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TABS } from './utils/constants';
import OverviewTab from './tabs/OverviewTab';
import ReliabilityTab from './tabs/ReliabilityTab';
import FaresTab from './tabs/FaresTab';
import MethodologyTab from './tabs/MethodologyTab';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [faresData, setFaresData] = useState(null);
  const [reliabilityData, setReliabilityData] = useState(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    fetch(`${base}data/fares.json`).then((r) => r.json()).then(setFaresData);
    fetch(`${base}data/reliability.json`).then((r) => r.json()).then(setReliabilityData);
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    window.scrollTo(0, 0);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab faresData={faresData} reliabilityData={reliabilityData} />;
      case 'reliability': return <ReliabilityTab data={reliabilityData} />;
      case 'fares': return <FaresTab data={faresData} />;
      case 'methodology': return <MethodologyTab />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="title">Transit Showdown</h1>
          <p className="subtitle">NYC &middot; London &middot; Paris &middot; Tokyo &middot; Seoul</p>
        </div>
      </header>

      <nav className="tab-nav">
        <div className="tab-nav-inner">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div className="tab-indicator" layoutId="tab-indicator" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="main" key={activeTab}>
        {renderTab()}
      </main>
    </div>
  );
}
