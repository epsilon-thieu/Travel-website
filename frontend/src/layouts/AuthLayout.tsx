import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../src/pages/auth/AuthForm.css';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
    return (
        <div className="auth-dark-bg">
            <div className="auth-bg-decor"></div>
            <div className="auth-card-glass">
                <Outlet />
            </div>
        </div>
    );
};