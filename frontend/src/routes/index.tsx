import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'; // Thêm dòng này
import { HomePage } from '../pages/user/HomePage';
import { ToursPage } from '../pages/user/SearchPages/ToursPage';
import { FlightsPage } from '../pages/user/SearchPages/FlightsPage';
import { HotelsPage } from '../pages/user/SearchPages/HotelsPage';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'tours', element: <ToursPage /> },       // Thêm route Tours
            { path: 'flights', element: <FlightsPage /> },   // Thêm route Flights
            { path: 'hotels', element: <HotelsPage /> },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <div>Admin Dashboard</div> },
        ],
    },
]);