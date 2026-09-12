import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { HomePage } from '../pages/user/HomePage';
import { ToursPage } from '../pages/user/SearchPages/ToursPage';
import { FlightsPage } from '../pages/user/SearchPages/FlightsPage';
import { HotelsPage } from '../pages/user/SearchPages/HotelsPage';
import { AboutUsPage } from '../pages/user/SearchPages/AboutUsPage';
import VerifyOtp from '../pages/auth/VerifyOtp';
import ResetPassword from '../pages/auth/ResetPasswordPage';

// Loader: Chặn người dùng ĐÃ CÓ token quay lại trang Login/Register
const requireGuest = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return redirect('/');
    }
    return null;
};

// Loader: Chặn người dùng CHƯA CÓ token vào khu vực Admin
const requireAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return redirect('/login');
    }
    return null;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'tours', element: <ToursPage /> },
            { path: 'flights', element: <FlightsPage /> },
            { path: 'hotels', element: <HotelsPage /> },
            { path: 'about', element: <AboutUsPage /> },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        loader: requireGuest,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> },
            { path: 'verify-otp', element: <VerifyOtp /> },
            { path: '/reset-password-final', element: <ResetPassword /> }
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        loader: requireAuth,
        children: [
            { index: true, element: <div>Admin Dashboard</div> },
        ],
    },
]);