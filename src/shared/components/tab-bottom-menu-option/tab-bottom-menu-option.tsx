import { ReactNode } from 'react';
import './tab-bottom-menu-option.css';

interface MenuOptionProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const TabBottomMenuOption = ({ title, icon, onClick }: MenuOptionProps) => {
  return (
    <li className="menu-option" onClick={onClick}>
      <div className="menu-option-icon">
        {icon}
      </div>
      <span className="menu-option-title">{title}</span>
    </li>
  );
};
