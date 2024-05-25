import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div>
        <Link to="/password-reset">Reset Password</Link>
      </div>
    );
  }

export default ForgotPassword;
