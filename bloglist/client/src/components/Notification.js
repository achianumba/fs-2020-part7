import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
    const notification = useSelector(state => state.notification);console.log(notification.type);
    
  return (
    <Alert variant={ notification.type } className="text-center">
      { notification.content !== "" && <p>{notification.content}</p> }
    </Alert>
  );
};

export default Notification;
