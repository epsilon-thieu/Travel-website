import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../src/pages/auth/AuthForm.css';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
    return (
        <div className="auth-dark-bg">
            <Outlet />
        </div>
    );
};