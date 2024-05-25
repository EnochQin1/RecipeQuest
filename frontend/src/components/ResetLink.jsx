import React from 'react';
import { Link } from 'react-router-dom';

function ResetLink() {
    return (
        <div>
        <Link to="/new-password">Reset Password</Link>
      </div>
    );
  }

export default ResetLink;
