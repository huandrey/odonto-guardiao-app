import { Bell } from "lucide-react";

interface NotificationsButtonProps {
  count?: number;
  onClick?: () => void;
}

const NotificationsButton = ({ count = 0, onClick }: NotificationsButtonProps) => {
  return (
    <button className="header-button notification-button" onClick={onClick}>
      <Bell size={24} />
      {count > 0 && <span className="notification-badge">{count}</span>}
    </button>
  );
};

export default NotificationsButton;
