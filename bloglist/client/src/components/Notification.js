import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector(state => state.notification);
  return (
    <>
      { notification.content !== "" && <p className={`message message-${notification.type}`}>{notification.content}</p> }
    </>
  );
};

export default Notification;
