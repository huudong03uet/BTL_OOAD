import get_notification from '@/services/notification';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

interface NotificationElementInterface {
    id: number;
    header: string;
    message: string;
    image: string;
    read: boolean;
    date: Date;
}

interface NotificationProps {
    onMarkAllAsRead: () => void;
    onDeleteAll: () => void;
    onNotificationSettings: () => void;
}



const NotificationElement = ({ notificationElement }: { notificationElement: NotificationElementInterface }) => {
    return (
        <div className='border-top border-bottom p-2'>
            {/* <div>{notificationElement.message}</div>
             */}
            <div className='row'>
                <div className='col-3 d-flex align-items-center justify-content-center'>
                    <img src={notificationElement.image} alt='notification' style={{ width: '75px', height: '75px', borderRadius: '50%' }} />

                </div>
                {/* <div className='col-7'>
                    <div>
                        <div className='fw-bold'>{notificationElement.header}</div>
                        <div>{notificationElement.message}</div>
                    </div>
                    
                    <div>
                        <small>{notificationElement.date.toDateString()}</small>
                    </div>
                </div> */}
                <div className='col-8' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                        <div className='fw-bold'>{notificationElement.header}</div>
                        <div style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            <small>
                                {notificationElement.message}


                            </small>
                        </div>
                    </div>

                    <div>
                        <small>
                            <small className='text-muted'>{notificationElement.date.toDateString()}</small>

                        </small>
                    </div>
                </div>

                {/* setting button */}
                {/* <FontAwesomeIcon icon="fa-regular fa-ellipsis" /> */}
                <div className='col-1 d-flex align-items-center justify-content-center px-0' >
                    <i className="fa fa-ellipsis" style={{ fontSize: "1em", cursor: "pointer" }}></i>
                </div>
            </div>
        </div>


    );
}

const Notifications: React.FC<NotificationProps> = ({ onMarkAllAsRead, onDeleteAll, onNotificationSettings }) => {
    const [notifications, setNotifications] = useState<NotificationElementInterface[]>([
        {
            id: 1,
            header: 'Notification Header',
            message: 'a d c s d d d d s s s s  s a a a a a a a a a a a a a a s ds s ad sa d ad sa dsa d qa rư e dq wd sa d ad á d a',
            image: 'https://via.placeholder.com/200',
            read: false,
            date: new Date()
        },
        {
            id: 2,
            header: 'Notification Header',
            message: 'Notification Message',
            image: 'https://via.placeholder.com/200',
            read: false,
            date: new Date()
        },
        {
            id: 3,
            header: 'Notification Header',
            message: 'Notification Message',
            image: 'https://via.placeholder.com/200',
            read: false,
            date: new Date()
        },
        {
            id: 4,
            header: 'Notification Header',
            message: 'Notification Message',
            image: 'https://via.placeholder.com/200',
            read: false,
            date: new Date()
        },


    ]);
    const [showSettingsButtons, setShowSettingsButtons] = useState(false);

    useEffect(() => {
        // const fetchNotifications = async () => {
        //     try {
        //         const res = await get_notification();
        //         setNotifications(res);
        //     } catch (error) {
        //         console.error('Error fetching notifications:', error);
        //     }
        // };

        // fetchNotifications();
    }, [notifications]);


    const toggleSettingsButtons = () => {
        setShowSettingsButtons(prevState => !prevState);
    };

    return (

        // <Modal>
        //     <Modal.Header >
        //         <Modal.Title style={{ width: '100%' }}>
        //             <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
        //                 <div style={{ display: "flex", alignItems: "center", width: '50%' }}>
        //                     <span>Notifications</span>
        //                 </div>
        //                 <div style={{ display: "flex", alignItems: "center", width: '50%', position: "relative", justifyContent: 'flex-end' }}>
        //                     <div style={{ position: "relative" }}>
        //                         <i className="fa fa-cog" style={{ fontSize: "1em", cursor: "pointer" }} onClick={toggleSettingsButtons}></i>
        //                         {showSettingsButtons && (
        //                             <div style={{ width: 170, position: "absolute", top: "100%", right: 0, marginRight: 10, padding: 10, justifyContent: 'start', display: "flex", flexDirection: "column", background: "#e7eaec", color: "blue", zIndex: 1 }}>
        //                                 <a style={{ fontSize: 17 }} onClick={onMarkAllAsRead}>Mark all as read</a>
        //                                 <a style={{ fontSize: 17 }} onClick={onDeleteAll}>Delete all</a>
        //                                 <a style={{ fontSize: 17 }} onClick={onNotificationSettings}>Notification Settings</a>
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         {notifications && notifications.length > 0 ? (
        //             notifications.map(notification => (
        //                 <div key={notification.id}>{notification.message}</div>
        //             ))
        //         ) : (
        //             <div>
        //                 <p>You do not have any notifications.</p>
        //                 <p>You can manage your desktop notification settings from your account.</p>
        //             </div>
        //         )}
        //     </Modal.Body>
        // </Modal>

        <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', width: '450px' }}>
            <div style={{ width: '100%' }}>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", width: '50%' }}>
                        <span>Notifications</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", width: '50%', position: "relative", justifyContent: 'flex-end' }}>
                        <div style={{ position: "relative" }}>
                            <i className="fa fa-cog" 
                            style={{ fontSize: "1em", cursor: "pointer" }} onClick={toggleSettingsButtons}></i>
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
            </div>
            <div style={{ marginTop: '20px' }}>
                {notifications && notifications.length > 0 ? (
                    notifications.map(notification => (
                        <NotificationElement notificationElement={notification} />
                    ))
                ) : (
                    <div>
                        <p>You do not have any notifications.</p>
                        <p>You can manage your desktop notification settinddddddddddddddddddddddđgs from your account.</p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Notifications;