import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef(
  ({ children, showLabel, hideLabel }, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible); //callback for toggling visibility

    const hideWhenVisible = { display: visible ? "none" : "" }; // display css rule
    const showWhenVisible = { display: visible ? "" : "none" }; //display css rule

    useImperativeHandle(ref, () => ({ toggleVisibility }));

    return (
      <div className="togglable">
        <div style={hideWhenVisible} className="togglable-inner">
          <button onClick={toggleVisibility} className="togglable-show">
            {showLabel}
          </button>
        </div>

        <div style={showWhenVisible} className="togglable-inner">
          {children}
          <button onClick={toggleVisibility} className="togglable-hide">
            {hideLabel}
          </button>
        </div>
      </div>
    );
  }
);

Togglable.displayName = "Togglable";

export default Togglable;
