import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Compass, User, LogIn } from 'lucide-react';
import './UserLayout.css';

export const UserLayout: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="user-layout-bg">
            <div className="hero-bg-overlay"></div>

            <div className="glass-container">
                <header className="navbar">
                    <Link to="/" className="nav-logo">
                        <Compass className="w-7 h-7 text-emerald-400 animate-spin-slow" />
                        <span>NATURA<span className="text-emerald-400">TRAVEL</span></span>
                    </Link>

                    <nav className="nav-links">
                        <span onClick={() => navigate('/search')} className="nav-link-item">Search</span>
                        <span className="nav-link-item">Tours</span>
                        <span className="nav-link-item">Experiences</span>
                        <span className="nav-link-item">About Us</span>
                    </nav>

                    <div className="auth-nav-buttons">
                        <button onClick={() => navigate('/login')} className="btn-nav-login flex items-center gap-2">
                            <LogIn className="w-4 h-4" /> Log in
                        </button>
                        <button onClick={() => navigate('/register')} className="btn-nav-register flex items-center gap-2">
                            <User className="w-4 h-4" /> Register
                        </button>
                    </div>
                </header>

                <div className="content-wrapper">
                    {/* Nội dung động (Khu vực cuộn được) */}
                    <main className="flex-1 overflow-y-auto pr-4 pb-10 scrollbar-hide">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};