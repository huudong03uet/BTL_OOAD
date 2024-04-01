import get_notification from '@/services/notification';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Notification {
    id: number;
    message: string;
}

interface ModalNotificationProps {
    show: boolean;
    onHide: () => void;
    onMarkAllAsRead: () => void;
    onDeleteAll: () => void;
    onNotificationSettings: () => void;
}

const ModalNotification: React.FC<ModalNotificationProps> = ({ show, onHide, onMarkAllAsRead, onDeleteAll, onNotificationSettings }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showSettingsButtons, setShowSettingsButtons] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await get_notification();
                setNotifications(res);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [notifications]);


    const toggleSettingsButtons = () => {
        setShowSettingsButtons(prevState => !prevState);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header >
                <Modal.Title style={{width: '100%'}}>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", width: '50%' }}>
                            <span>Notifications</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", width: '50%', position: "relative", justifyContent: 'flex-end' }}>
                            <div style={{ position: "relative" }}>
                                <i className="fa fa-cog" style={{ fontSize: "1em", cursor: "pointer" }} onClick={toggleSettingsButtons}></i>
                                {showSettingsButtons && (
                                    <div style={{ width: 170, position: "absolute", top: "100%", right: 0, marginRight: 10, padding: 10, justifyContent: 'start', display: "flex", flexDirection: "column", background: "#e7eaec", color: "blue", zIndex: 1 }}>
                                        <a style={{ fontSize: 17 }} onClick={onMarkAllAsRead}>Mark all as read</a>
                                        <a style={{ fontSize: 17 }} onClick={onDeleteAll}>Delete all</a>
                                        <a style={{ fontSize: 17 }} onClick={onNotificationSettings}>Notification Settings</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div key={notification.id}>{notification.message}</div>
                    ))
                ) : (
                    <div>
                        <p>You do not have any notifications.</p>
                        <p>You can manage your desktop notification settings from your account.</p>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ModalNotification;