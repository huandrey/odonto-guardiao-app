// src/shared/components/header/index.tsx
import React from 'react';
import './header-style.css';
import { HeaderContext } from './header-context';

interface HeaderRootProps {
  children: React.ReactNode;
  className?: string;
  isMenuOpen?: boolean;
  onMenuClick?: () => void;
}

export const HeaderRoot = ({ children, className = '', isMenuOpen, onMenuClick }: HeaderRootProps) => {
  return (
    <HeaderContext.Provider value={{ isMenuOpen, onMenuClick }}>
      <header className={`app-header ${className}`}>
        <div className="header-content">{children}</div>
      </header>
    </HeaderContext.Provider>
  );
};




