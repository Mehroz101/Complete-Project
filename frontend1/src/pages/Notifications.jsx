import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { notifications } from "../FakeData/CustomerService";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";

const Notifications = () => {
  const [notificationData, setNotificationData] = useState(notifications);
  const [selectedNotificationType, setSelectedNotificationType] =
    useState(null);

  const filters = [
    { name: "All", code: null, color: "bg-gray-500" },
    { name: "New User", code: "Joined New User", color: "bg-green-500" },
    { name: "Space", code: "Space", color: "bg-orange-500" },
    { name: "Review", code: "Review", color: "bg-purple-500" },
    { name: "Reservation Request", code: "Reservation", color: "bg-blue-500" },
  ];

  const notificationTypeTemplate = (option) => {
    if (option) {
      return <Tag className={option.color} value={option.name} />;
    }
    return <span>Select Notification Type</span>;
  };

  const notificationTypeItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <Tag className={option.color} value={option.name} />
      </div>
    );
  };

  const filterNotifications = (type) => {
    if (type) {
      return notifications.filter((notification) => notification.type === type);
    }
    return notifications; // Return all notifications if no type is selected
  };

  useEffect(() => {
    setNotificationData(filterNotifications(selectedNotificationType));
  }, [selectedNotificationType]);

  return (
    <>
      <div className="notification_page">
        <div className="notification_filter flex align-items-center justify-content-between">
          <h1>Notifications</h1>
          <Dropdown
            value={selectedNotificationType}
            onChange={(e) =>
              setSelectedNotificationType(e.value ? e.value.code : null)
            }
            options={filters}
            optionLabel="name"
            placeholder="Select Notification Type"
            filter
            valueTemplate={notificationTypeTemplate}
            itemTemplate={notificationTypeItemTemplate}
            className="w-full md:w-14rem"
          />
        </div>
        <div className="max-w-2xl mx-auto mt-8">
          {notificationData.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
