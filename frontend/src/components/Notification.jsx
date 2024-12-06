import React from "react";

const Notifications = ({ notification }) => {
  return (
    <>
      <div className="flex items-start p-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <i className="pi pi-times"></i>
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex items-center">
            <span
              className={`px-2 py-1 text-xs font-semibold text-white rounded ${notification.color}`}
            >
              {notification.type}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {notification.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {notification.description}
          </p>
          <p className={`mt-2 text-sm font-semibold ${notification.textColor}`}>
            {notification.user}
          </p>
        </div>
        <div className="ml-auto text-gray-400 text-sm">
          <i className="fas fa-clock"></i> {notification.time}
        </div>
      </div>
    </>
  );
};

export default Notifications;
