import { BellOff, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';
import './notification-dropdown-style.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'warning' | 'info' | 'success';
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDropdown = ({ isOpen, onClose }: NotificationsDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nova Denúncia',
      message: 'Uma nova denúncia foi registrada em sua região.',
      time: '5 min atrás',
      read: false,
      type: 'warning'
    },
    {
      id: '2',
      title: 'Atualização de Status',
      message: 'A denúncia #1234 foi atualizada para "Em Análise".',
      time: '1 hora atrás',
      read: false,
      type: 'info'
    },
    {
      id: '3',
      title: 'Caso Resolvido',
      message: 'O caso #5678 foi encerrado com sucesso.',
      time: '2 horas atrás',
      read: true,
      type: 'success'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <>
      {isOpen && (
        <div className="notifications-overlay" onClick={onClose} />
      )}
      <div className={`notifications-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="notifications-header">
          <h3>Notificações</h3>
          <button className="action-button" onClick={markAllAsRead}>
            <Check size={16} />
            <span>Marcar todas como lidas</span>
          </button>
        </div>

        <div className="notifications-content">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : ''}`}
              >
                <div className={`notification-dot ${notification.type}`} />
                <div className="notification-content">
                  <div className="notification-title">
                    {notification.title}
                  </div>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">
                    {notification.time}
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={() => removeNotification(notification.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="no-notifications">
              <BellOff size={32} />
              <p>Nenhuma notificação</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
