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

// 1. Tạo loader chặn người dùng đã đăng nhập vào trang Auth
const requireGuest = () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Đã có token thì đẩy thẳng về trang chủ (hoặc dashboard)
        return redirect('/');
    }
    return null; // Cho phép tiếp tục render
};

// 2. (Tuỳ chọn) Tạo loader chặn người dùng chưa đăng nhập vào trang Admin/Bảo mật
const requireAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Chưa có token thì bắt quay lại trang login
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
        loader: requireGuest, // Thêm loader vào Layout cha của Auth
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        loader: requireAuth, // Bảo vệ toàn bộ các trang Admin
        children: [
            { index: true, element: <div>Admin Dashboard</div> },
        ],
    },
]);