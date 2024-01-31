// NotificationContext.js
import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [fetchNotifications, setFetchNotifications] = useState(false);

    const updateNotifications = (newNotifications) => {
        setNotifications(newNotifications);
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, updateNotifications, fetchNotifications, setFetchNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => useContext(NotificationContext);