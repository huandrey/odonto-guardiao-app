import { useContext } from "react";
import { HeaderContext } from "../header-context";

const MenuButton = () => {
  const { isMenuOpen, onMenuClick } = useContext(HeaderContext);
  
  return (
    <button
      className={`header-button menu-button ${isMenuOpen ? 'open' : ''}`}
      onClick={onMenuClick}
    >
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );
};

export default MenuButton;
