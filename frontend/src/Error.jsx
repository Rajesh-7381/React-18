import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-image">
        <img src="/asset/image/404.jpeg" alt="Error 404" />
      </div>
      <div className="error-message">
        <p>Oops! Page not found.</p>
        <Link to="/">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default Error;


