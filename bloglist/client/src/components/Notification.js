import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
    const notification = useSelector(state => state.notification);
  return (
    <>
    { notification.content && (<Alert variant={ notification.type } className="text-center m-0">
      {notification.content && <p>{notification.content}</p>}
    </Alert>)}
    </>
  );
};

export default Notification;
