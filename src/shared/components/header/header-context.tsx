import { createContext } from "react";

interface HeaderContextType {
  isMenuOpen?: boolean;
  onMenuClick?: () => void;
}

export const HeaderContext = createContext<HeaderContextType>({});

