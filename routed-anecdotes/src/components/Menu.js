import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='/create_new' style={padding}>create new</Link>
        <Link to='/about' style={padding}>about</Link>
      </div>
    )
  }