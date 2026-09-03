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
                        <Link to="/flights" className="nav-link-item">Destinations</Link>
                        <Link to="/tours" className="nav-link-item">Tours</Link>
                        <Link to="/hotels" className="nav-link-item">Hotels</Link>
                        <Link to="/about" className="nav-link-item">About Us</Link>
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
                    <main className="flex-1 overflow-y-auto pr-4 pb-10 scrollbar-hide">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};