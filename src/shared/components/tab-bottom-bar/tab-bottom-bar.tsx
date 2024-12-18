import React from "react";
import { Home, Info, Share2 } from "lucide-react"
import './tab-bottom-bar-style.css'
import { useLocation, useNavigate } from "react-router-dom";

interface TabItem {
  id: string;
  route?: string;
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export const TabBottomBar = ({ onShareClick }: { onShareClick: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState('home');

  const tabs: TabItem[] = [
    {
      id: 'about',
      route: '/sobre',
      icon: <Info size={24} />,
      label: 'Sobre',
      onClick: () => navigate('/sobre')
    },
    {
      id: 'home',
      route: '/home',
      icon: <Home size={24} />,
      label: 'Início',
      onClick: () => navigate('/home')
    },
    {
      id: 'share',
      icon: <Share2 size={24} />,
      label: 'Compartilhar',
      onClick: onShareClick,
    }
  ];

  return (
    <nav className="tab-bar">
      <div className="tab-bar-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${location.pathname === (tab?.route ?? activeTab === tab.id) ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id)
              tab.onClick()
            }}
          >
            <div className="tab-content">
              {tab.icon}
              <span className="tab-label">{tab.label}</span>
            </div>
            {activeTab === tab.id && <div className="active-indicator" />}
          </button>
        ))}
      </div>
      <div className="tab-bar-background" />
    </nav>
  )
}
