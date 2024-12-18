import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button className="header-button back-button" onClick={onClick}>
      <span className="back-icon"><ChevronLeft /></span>
    </button>
  );
};

export default BackButton;
